namespace PortfolioApi.DTOs;

public class BlogpostCreateDto
{
    public string Titel { get; set; } = "";
    public string Inhoud { get; set; } = "";
    public DateTime Publicatiedatum { get; set; }
}