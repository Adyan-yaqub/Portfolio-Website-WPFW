namespace PortfolioApi.DTOs;

public class BlogpostUpdateDto
{
    public string Titel { get; set; } = "";
    public string Inhoud { get; set; } = "";
    public DateTime Publicatiedatum { get; set; }
}