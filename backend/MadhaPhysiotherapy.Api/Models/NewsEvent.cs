namespace MadhaPhysiotherapy.Api.Models;

public class NewsEvent
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;
    public string Excerpt { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string Type { get; set; } = "News";

    public DateTime EventDate { get; set; }

    public string? ImageUrl { get; set; }
    public string? Location { get; set; }

    public bool IsPublished { get; set; } = true;
    public bool IsFeatured { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}