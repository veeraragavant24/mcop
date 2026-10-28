using System.Net;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace MadhaPhysiotherapy.Api.Services;

public class SmtpEnquiryEmailService : IEnquiryEmailService
{
    private readonly IConfiguration _configuration;

    public SmtpEnquiryEmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    private async Task SendEmailAsync(
        string to,
        string subject,
        string htmlBody,
        string? replyTo = null)
    {
        var host = _configuration["Smtp:Host"]
            ?? throw new InvalidOperationException("SMTP host is missing.");

        var port = int.Parse(
            _configuration["Smtp:Port"] ?? "587");

        var username = _configuration["Smtp:Username"]
            ?? throw new InvalidOperationException("SMTP username is missing.");

        var password = _configuration["Smtp:Password"]
            ?? throw new InvalidOperationException("SMTP password is missing.");

        var fromEmail = _configuration["Smtp:FromEmail"]
            ?? throw new InvalidOperationException("SMTP sender email is missing.");

        var fromName = _configuration["Smtp:FromName"]
            ?? "Madha College of Physiotherapy";

        var email = new MimeMessage();

        email.From.Add(new MailboxAddress(fromName, fromEmail));
        email.To.Add(MailboxAddress.Parse(to));
        email.Subject = subject;

        if (!string.IsNullOrWhiteSpace(replyTo))
        {
            email.ReplyTo.Add(MailboxAddress.Parse(replyTo));
        }

        var body = new BodyBuilder
        {
            HtmlBody = htmlBody
        };

        email.Body = body.ToMessageBody();

        using var smtp = new SmtpClient();

        await smtp.ConnectAsync(
            host,
            port,
            SecureSocketOptions.StartTls);

        await smtp.AuthenticateAsync(username, password);
        await smtp.SendAsync(email);
        await smtp.DisconnectAsync(true);
    }

    public async Task SendCollegeEnquiryAsync(
        string name,
        string email,
        string phone,
        string course,
        string message)
    {
        var collegeEmail = _configuration["Smtp:CollegeEmail"]
            ?? throw new InvalidOperationException("College email is missing.");

        var safeName = WebUtility.HtmlEncode(name);
        var safeEmail = WebUtility.HtmlEncode(email);
        var safePhone = WebUtility.HtmlEncode(phone);
        var safeCourse = WebUtility.HtmlEncode(course);
        var safeMessage = WebUtility.HtmlEncode(message)
            .Replace("\r\n", "<br>")
            .Replace("\n", "<br>");

        var html = $"""
            <h2>New Admission Enquiry</h2>
            <p><strong>Name:</strong> {safeName}</p>
            <p><strong>Email:</strong> {safeEmail}</p>
            <p><strong>Phone:</strong> {safePhone}</p>
            <p><strong>Course:</strong> {safeCourse}</p>
            <p><strong>Message:</strong> {safeMessage}</p>
            """;

        await SendEmailAsync(
            collegeEmail,
            $"New Admission Enquiry - {course}",
            html,
            email);
    }

    public async Task SendStudentAcknowledgementAsync(
        string name,
        string email,
        string course)
    {
        var safeName = WebUtility.HtmlEncode(name);
        var safeCourse = WebUtility.HtmlEncode(course);

        var html = $"""
            <h2>Thank You for Your Enquiry!</h2>
            <p>Dear {safeName},</p>
            <p>Thank you for your interest in Madha College of Physiotherapy.</p>
            <p>We have received your admission enquiry for
            <strong>{safeCourse}</strong>.</p>
            <p>Our admissions team will contact you with further information.</p>
            <p>Regards,<br>
            Madha College of Physiotherapy</p>
            """;

        await SendEmailAsync(
            email,
            "Admission Enquiry Received - Madha College of Physiotherapy",
            html);
    }
}