using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.Dtos;
using PortfolioApi.Models;

namespace PortfolioApi.Services;

// Applicatielogica voor blogposts.
// Hier praten we met de database en zetten we entiteiten om naar DTO's.
public class BlogpostService
{
    private readonly PortfolioDbContext _db;

    public BlogpostService(PortfolioDbContext db)
    {
        _db = db;
    }

    public async Task<List<BlogpostDto>> GetAllAsync()
    {
        var blogposts = await _db.Blogposts.OrderByDescending(b => b.Publicatiedatum).ToListAsync();
        return blogposts.Select(ToDto).ToList();
    }

    public async Task<BlogpostDto?> GetByIdAsync(int id)
    {
        var blogpost = await _db.Blogposts.FindAsync(id);
        return blogpost == null ? null : ToDto(blogpost);
    }

    public async Task<BlogpostDto> CreateAsync(BlogpostCreateDto dto)
    {
        var blogpost = new Blogpost
        {
            Titel = dto.Titel,
            Inhoud = dto.Inhoud,
            Publicatiedatum = dto.Publicatiedatum
        };

        _db.Blogposts.Add(blogpost);
        await _db.SaveChangesAsync();

        return ToDto(blogpost);
    }

    // Geeft false terug als de blogpost niet bestaat.
    public async Task<bool> UpdateAsync(int id, BlogpostUpdateDto dto)
    {
        var blogpost = await _db.Blogposts.FindAsync(id);
        if (blogpost == null) return false;

        blogpost.Titel = dto.Titel;
        blogpost.Inhoud = dto.Inhoud;
        blogpost.Publicatiedatum = dto.Publicatiedatum;

        await _db.SaveChangesAsync();
        return true;
    }

    // Geeft false terug als de blogpost niet bestaat.
    public async Task<bool> DeleteAsync(int id)
    {
        var blogpost = await _db.Blogposts.FindAsync(id);
        if (blogpost == null) return false;

        _db.Blogposts.Remove(blogpost);
        await _db.SaveChangesAsync();
        return true;
    }

    // Omzetting van entiteit naar DTO: op één plek.
    private static BlogpostDto ToDto(Blogpost blogpost)
    {
        return new BlogpostDto
        {
            Id = blogpost.Id,
            Titel = blogpost.Titel,
            Inhoud = blogpost.Inhoud,
            Publicatiedatum = blogpost.Publicatiedatum
        };
    }
}
