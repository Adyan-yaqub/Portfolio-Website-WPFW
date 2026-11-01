namespace PortfolioApi.DTOs;

public class BlogpostDto
{
    public int Id { get; set; }
    public string Titel { get; set; } = "";
    public string Inhoud { get; set; } = "";
    public DateTime Publicatiedatum { get; set; }
}