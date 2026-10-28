namespace MadhaPhysiotherapy.Api.Services;

public interface IEnquiryEmailService
{
    Task SendCollegeEnquiryAsync(
        string name,
        string email,
        string phone,
        string course,
        string message);

    Task SendStudentAcknowledgementAsync(
        string name,
        string email,
        string course);
}