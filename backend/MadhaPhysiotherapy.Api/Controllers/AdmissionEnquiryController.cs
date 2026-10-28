using MadhaPhysiotherapy.Api.Models;
using MadhaPhysiotherapy.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace MadhaPhysiotherapy.Api.Controllers;

[ApiController]
[Route("api/admission-enquiry")]
public class AdmissionEnquiryController : ControllerBase
{
private readonly IEnquiryEmailService _emailService;
private readonly ILogger<AdmissionEnquiryController> _logger;

public AdmissionEnquiryController(
    IEnquiryEmailService emailService,
    ILogger<AdmissionEnquiryController> logger)
{
    _emailService = emailService;
    _logger = logger;
}

[HttpPost]
[ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
[ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
[ProducesResponseType(typeof(object), StatusCodes.Status502BadGateway)]
public async Task<IActionResult> SubmitEnquiry(
    [FromBody] AdmissionEnquiryRequest request,
    CancellationToken cancellationToken)
{
    // Validate the request before attempting to send email.
    if (!ModelState.IsValid)
    {
        return ValidationProblem(ModelState);
    }

    var name = request.Name.Trim();
    var email = request.Email.Trim();
    var phone = request.Phone.Trim();
    var course = request.Course.Trim();
    var message = request.Message?.Trim() ?? string.Empty;

    // Basic email format validation.
    if (!System.Net.Mail.MailAddress.TryCreate(email, out _))
    {
        return BadRequest(new
        {
            success = false,
            message = "Please provide a valid email address."
        });
    }

    // Send the enquiry notification to the college first.
    try
    {
        await _emailService.SendCollegeEnquiryAsync(
            name,
            email,
            phone,
            course,
            message);
    }
    catch (OperationCanceledException)
        when (cancellationToken.IsCancellationRequested)
    {
        throw;
    }
    catch (Exception ex)
    {
        _logger.LogError(
            ex,
            "Failed to send admission enquiry notification to the college.");

        return StatusCode(
            StatusCodes.Status502BadGateway,
            new
            {
                success = false,
                message = "We could not submit your enquiry right now. Please try again later."
            });
    }

    // Send an acknowledgement to the student.
    var acknowledgementSent = false;

    try
    {
        await _emailService.SendStudentAcknowledgementAsync(
            name,
            email,
            course);

        acknowledgementSent = true;
    }
    catch (OperationCanceledException)
        when (cancellationToken.IsCancellationRequested)
    {
        throw;
    }
    catch (Exception ex)
    {
        _logger.LogError(
            ex,
            "College received an enquiry, but the student acknowledgement email failed.");
    }

    // No database insert or SQL Server operation occurs here.
    return Ok(new
    {
        success = true,
        acknowledgementSent,
        message = acknowledgementSent
            ? "Your admission enquiry has been submitted successfully. A confirmation email has been sent."
            : "Your enquiry has been received by the college, but we could not send the acknowledgement email."
    });
}

}