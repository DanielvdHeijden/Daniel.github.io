using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.Dtos;

// Uitvoer: wat de API terugstuurt bij GET.
public class ProjectDto
{
    public int Id { get; set; }
    public string Titel { get; set; } = "";
    public string Beschrijving { get; set; } = "";
    public string Categorie { get; set; } = "";
    public string? GitHubUrl { get; set; }
    public DateTime Datum { get; set; }
}

// Invoer voor POST: geen Id, die maakt de database zelf.
public class ProjectCreateDto
{
    [Required] public string Titel { get; set; } = "";
    [Required] public string Beschrijving { get; set; } = "";
    [Required] public string Categorie { get; set; } = "";
    public string? GitHubUrl { get; set; }
    public DateTime Datum { get; set; }
}

// Invoer voor PUT: het Id staat in de URL.
public class ProjectUpdateDto
{
    [Required] public string Titel { get; set; } = "";
    [Required] public string Beschrijving { get; set; } = "";
    [Required] public string Categorie { get; set; } = "";
    public string? GitHubUrl { get; set; }
    public DateTime Datum { get; set; }
}
