using System.Text;
using MadhaPhysiotherapy.Api.Data;
using MadhaPhysiotherapy.Api.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MadhaPhysiotherapy.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Controllers and API documentation
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

// SQL Server database
var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException(
        "DefaultConnection is missing from configuration.");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// JWT configuration
var jwtKey = builder.Configuration["Jwt:Key"]
    ?? throw new InvalidOperationException("JWT key is missing.");

var jwtIssuer = builder.Configuration["Jwt:Issuer"]
    ?? throw new InvalidOperationException("JWT issuer is missing.");

var jwtAudience = builder.Configuration["Jwt:Audience"]
    ?? throw new InvalidOperationException("JWT audience is missing.");

byte[] signingKey;

try
{
    signingKey = Convert.FromBase64String(jwtKey);
}
catch (FormatException)
{
    throw new InvalidOperationException(
        "Jwt:Key must be a valid Base64-encoded key.");
}

if (signingKey.Length < 32)
{
    throw new InvalidOperationException(
        "Jwt:Key must contain at least 32 bytes of key material.");
}

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = jwtIssuer,

                ValidateAudience = true,
                ValidAudience = jwtAudience,

                ValidateIssuerSigningKey = true,
                IssuerSigningKey =
                    new SymmetricSecurityKey(signingKey),

                ValidateLifetime = true,
                ClockSkew = TimeSpan.FromSeconds(30)
            };
    });

builder.Services.AddAuthorization();


// Admission enquiry email service
builder.Services.AddScoped<
    MadhaPhysiotherapy.Api.Services.IEnquiryEmailService,
    MadhaPhysiotherapy.Api.Services.SmtpEnquiryEmailService>();


// Frontend CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Initialize the first administrator only in Development.
if (args.Contains("--create-admin"))
{
    if (!app.Environment.IsDevelopment())
    {
        Console.WriteLine(
            "Admin initialization is only allowed in Development.");
        return;
    }

    using var scope = app.Services.CreateScope();

    var db = scope.ServiceProvider
        .GetRequiredService<ApplicationDbContext>();

    // Ensure the database and existing migrations are ready first.
    await db.Database.CanConnectAsync();

    var hasher = new PasswordHasher<AdminUser>();

    Console.Write("Admin name: ");
    var name = Console.ReadLine()?.Trim();

    Console.Write("Admin email: ");
    var email = Console.ReadLine()?.Trim();

    Console.Write("Admin password (minimum 12 characters): ");
    var password = ReadHiddenPassword();

    if (string.IsNullOrWhiteSpace(name) ||
        string.IsNullOrWhiteSpace(email) ||
        !System.Net.Mail.MailAddress.TryCreate(email, out _) ||
        string.IsNullOrWhiteSpace(password) ||
        password.Length < 12)
    {
        Console.WriteLine(
            "Invalid input. Check the name, email, and password length.");
        return;
    }

    email = email.ToLowerInvariant();

    if (await db.AdminUsers.AnyAsync(x => x.Email == email))
    {
        Console.WriteLine(
            "An admin with this email already exists.");
        return;
    }

    var admin = new AdminUser
    {
        Name = name,
        Email = email,
        CreatedAt = DateTime.UtcNow
    };

    admin.PasswordHash = hasher.HashPassword(admin, password);

    db.AdminUsers.Add(admin);
    await db.SaveChangesAsync();

    Console.WriteLine($"Administrator created: {admin.Email}");
    return;
}

// HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Keep HTTPS redirection disabled if your local Vite proxy
// targets http://localhost:5196.
app.UseCors("FrontendPolicy");

// Serve files stored in wwwroot, including uploaded images.
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

static string ReadHiddenPassword()
{
    var password = new StringBuilder();

    while (true)
    {
        var key = Console.ReadKey(intercept: true);

        if (key.Key == ConsoleKey.Enter)
        {
            Console.WriteLine();
            break;
        }

        if (key.Key == ConsoleKey.Backspace)
        {
            if (password.Length > 0)
                password.Length--;

            continue;
        }

        if (!char.IsControl(key.KeyChar))
            password.Append(key.KeyChar);
    }

    return password.ToString();
}