using MadhaPhysiotherapy.Api.Data;
using MadhaPhysiotherapy.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MadhaPhysiotherapy.Api.Controllers;

[ApiController]
[Route("api/news-events")]
public class NewsEventsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IWebHostEnvironment _environment;

    private const long MaxImageSize = 20 * 1024 * 1024;

    public NewsEventsController(
        ApplicationDbContext context,
        IWebHostEnvironment environment)
    {
        _context = context;
        _environment = environment;
    }

    // GET: /api/news-events
    [HttpGet]
    public async Task<ActionResult<IEnumerable<NewsEventDto>>> GetAll()
    {
        var items = await _context.NewsEvents
            .AsNoTracking()
            .OrderByDescending(x => x.EventDate)
            .Select(x => new NewsEventDto
            {
                Id = x.Id.ToString(),
                Title = x.Title,
                Excerpt = x.Excerpt,
                Content = x.Content,
                Date = x.EventDate,
                Type = x.Type,
                ImageUrl = x.ImageUrl,
                Location = x.Location,
                IsPublished = x.IsPublished,
                IsFeatured = x.IsFeatured
            })
            .ToListAsync();

        return Ok(items);
    }

    // POST: /api/news-events
    [HttpPost]
    public async Task<ActionResult<NewsEventDto>> Create(
        [FromBody] CreateNewsEventDto request)
    {
        var item = new NewsEvent
        {
            Title = request.Title.Trim(),
            Excerpt = request.Excerpt.Trim(),
            Content = request.Content.Trim(),
            Type = NormalizeType(request.Type),
            EventDate = request.Date,
            ImageUrl = request.ImageUrl,
            Location = request.Location,
            IsPublished = request.IsPublished,
            IsFeatured = request.IsFeatured,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.NewsEvents.Add(item);
        await _context.SaveChangesAsync();

        return Ok(ToDto(item));
    }

    // PUT: /api/news-events/{id}
    [HttpPut("{id:int}")]
    public async Task<ActionResult<NewsEventDto>> Update(
        int id,
        [FromBody] CreateNewsEventDto request)
    {
        var item = await _context.NewsEvents.FindAsync(id);

        if (item == null)
        {
            return NotFound(new
            {
                message = "News or event not found."
            });
        }

        item.Title = request.Title.Trim();
        item.Excerpt = request.Excerpt.Trim();
        item.Content = request.Content.Trim();
        item.Type = NormalizeType(request.Type);
        item.EventDate = request.Date;
        item.ImageUrl = request.ImageUrl;
        item.Location = request.Location;
        item.IsPublished = request.IsPublished;
        item.IsFeatured = request.IsFeatured;
        item.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(ToDto(item));
    }

    // DELETE: /api/news-events/{id}
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _context.NewsEvents.FindAsync(id);

        if (item == null)
        {
            return NotFound(new
            {
                message = "News or event not found."
            });
        }

        _context.NewsEvents.Remove(item);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // POST: /api/news-events/upload-image
    [HttpPost("upload-image")]
[Consumes("multipart/form-data")]
[RequestSizeLimit(MaxImageSize)]
public async Task<IActionResult> UploadImage(
    [FromForm] UploadImageRequest request)
{
    var file = request.File;

    if (file == null || file.Length == 0)
    {
        return BadRequest(new
        {
            message = "Please select an image."
        });
    }

    // Keep the rest of your existing UploadImage method here.

        if (file.Length > MaxImageSize)
        {
            return BadRequest(new
            {
                message = "The image must be 20 MB or smaller."
            });
        }

        var extension = Path.GetExtension(file.FileName)
            .ToLowerInvariant();

        var allowedExtensions = new[]
        {
            ".jpg", ".jpeg", ".png", ".webp"
        };

        if (!allowedExtensions.Contains(extension))
        {
            return BadRequest(new
            {
                message = "Only JPG, JPEG, PNG, and WEBP images are allowed."
            });
        }

        var allowedContentTypes = new[]
        {
            "image/jpeg", "image/png", "image/webp"
        };

        if (!allowedContentTypes.Contains(file.ContentType.ToLowerInvariant()))
        {
            return BadRequest(new
            {
                message = "The uploaded file must be an image."
            });
        }

        var webRoot = _environment.WebRootPath;

        if (string.IsNullOrWhiteSpace(webRoot))
        {
            webRoot = Path.Combine(_environment.ContentRootPath, "wwwroot");
        }

        var uploadDirectory = Path.Combine(
            webRoot, "uploads", "news-events");

        Directory.CreateDirectory(uploadDirectory);

        var fileName = $"{Guid.NewGuid():N}{extension}";
        var filePath = Path.Combine(uploadDirectory, fileName);

        try
        {
            await using var stream = new FileStream(
                filePath,
                FileMode.CreateNew,
                FileAccess.Write,
                FileShare.None);

            await file.CopyToAsync(stream);
        }
        catch (IOException)
        {
            return StatusCode(500, new
            {
                message = "The image could not be saved on the server."
            });
        }

        // Served through this API, so Vite can proxy the image request too.
        var imageUrl = $"/api/news-events/images/{fileName}";

        return Ok(new { imageUrl });
    }

    // GET: /api/news-events/images/{fileName}
    [HttpGet("images/{fileName}")]
    public IActionResult GetImage(string fileName)
    {
        // Accept only a simple generated filename, not a directory path.
        if (string.IsNullOrWhiteSpace(fileName) ||
            fileName != Path.GetFileName(fileName))
        {
            return BadRequest();
        }

        var webRoot = _environment.WebRootPath;

        if (string.IsNullOrWhiteSpace(webRoot))
        {
            webRoot = Path.Combine(_environment.ContentRootPath, "wwwroot");
        }

        var filePath = Path.Combine(
            webRoot, "uploads", "news-events", fileName);

        if (!System.IO.File.Exists(filePath))
        {
            return NotFound();
        }

        var contentType = Path.GetExtension(fileName).ToLowerInvariant()
            switch
            {
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".webp" => "image/webp",
                _ => "application/octet-stream"
            };

        return PhysicalFile(filePath, contentType);
    }

    private static string NormalizeType(string? type)
    {
        return string.Equals(type, "Event", StringComparison.OrdinalIgnoreCase)
            ? "Event"
            : "News";
    }

    private static NewsEventDto ToDto(NewsEvent item)
    {
        return new NewsEventDto
        {
            Id = item.Id.ToString(),
            Title = item.Title,
            Excerpt = item.Excerpt,
            Content = item.Content,
            Date = item.EventDate,
            Type = item.Type,
            ImageUrl = item.ImageUrl,
            Location = item.Location,
            IsPublished = item.IsPublished,
            IsFeatured = item.IsFeatured
        };
    }
}

public class CreateNewsEventDto
{
    public string Title { get; set; } = string.Empty;
    public string Excerpt { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Type { get; set; } = "News";
    public string? ImageUrl { get; set; }
    public string? Location { get; set; }
    public bool IsPublished { get; set; } = true;
    public bool IsFeatured { get; set; } = false;
}

public class NewsEventDto : CreateNewsEventDto
{
    public string Id { get; set; } = string.Empty;
}
public class UploadImageRequest
{
    public IFormFile? File { get; set; }
}