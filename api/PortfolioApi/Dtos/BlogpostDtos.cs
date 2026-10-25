using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.Dtos;

// Uitvoer: wat de API terugstuurt bij GET.
public class BlogpostDto
{
    public int Id { get; set; }
    public string Titel { get; set; } = "";
    public string Inhoud { get; set; } = "";
    public DateTime Publicatiedatum { get; set; }
}

// Invoer voor POST: geen Id, die maakt de database zelf.
public class BlogpostCreateDto
{
    [Required] public string Titel { get; set; } = "";
    [Required] public string Inhoud { get; set; } = "";
    public DateTime Publicatiedatum { get; set; }
}

// Invoer voor PUT: het Id staat in de URL.
public class BlogpostUpdateDto
{
    [Required] public string Titel { get; set; } = "";
    [Required] public string Inhoud { get; set; } = "";
    public DateTime Publicatiedatum { get; set; }
}
