namespace PortfolioApi.Models;

// Entiteit: zo wordt een project opgeslagen in de database.
public class Project
{
    public int Id { get; set; }
    public string Titel { get; set; } = "";
    public string Beschrijving { get; set; } = "";
    public string Categorie { get; set; } = "";
    public string? GitHubUrl { get; set; }
    public DateTime Datum { get; set; }
}
