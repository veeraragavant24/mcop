using System.ComponentModel.DataAnnotations;

namespace MadhaPhysiotherapy.Api.Models;

public class AdmissionEnquiryRequest
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(254)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [StringLength(30)]
    public string Phone { get; set; } = string.Empty;

    [Required]
    [StringLength(150)]
    public string Course { get; set; } = string.Empty;

    [StringLength(2000)]
    public string? Message { get; set; }
}