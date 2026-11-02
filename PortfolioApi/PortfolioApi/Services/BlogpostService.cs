using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.DTOs;
using PortfolioApi.Models;

namespace PortfolioApi.Services;

public class BlogpostService
{
    private readonly PortfolioDbContext _context;

    public BlogpostService(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<List<BlogpostDto>> GetAllAsync()
    {
        return await _context.Blogposts
            .Select(b => new BlogpostDto
            {
                Id = b.Id,
                Titel = b.Titel,
                Inhoud = b.Inhoud,
                Publicatiedatum = b.Publicatiedatum
            })
            .ToListAsync();
    }

    public async Task<BlogpostDto?> GetByIdAsync(int id)
    {
        var blogpost = await _context.Blogposts.FindAsync(id);

        if (blogpost == null)
            return null;

        return new BlogpostDto
        {
            Id = blogpost.Id,
            Titel = blogpost.Titel,
            Inhoud = blogpost.Inhoud,
            Publicatiedatum = blogpost.Publicatiedatum
        };
    }

    public async Task<BlogpostDto> CreateAsync(BlogpostCreateDto dto)
    {
        var blogpost = new Blogpost
        {
            Titel = dto.Titel,
            Inhoud = dto.Inhoud,
            Publicatiedatum = dto.Publicatiedatum
        };

        _context.Blogposts.Add(blogpost);
        await _context.SaveChangesAsync();

        return new BlogpostDto
        {
            Id = blogpost.Id,
            Titel = blogpost.Titel,
            Inhoud = blogpost.Inhoud,
            Publicatiedatum = blogpost.Publicatiedatum
        };
    }

    public async Task<bool> UpdateAsync(int id, BlogpostUpdateDto dto)
    {
        var blogpost = await _context.Blogposts.FindAsync(id);

        if (blogpost == null)
            return false;

        blogpost.Titel = dto.Titel;
        blogpost.Inhoud = dto.Inhoud;
        blogpost.Publicatiedatum = dto.Publicatiedatum;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var blogpost = await _context.Blogposts.FindAsync(id);

        if (blogpost == null)
            return false;

        _context.Blogposts.Remove(blogpost);
        await _context.SaveChangesAsync();

        return true;
    }
}