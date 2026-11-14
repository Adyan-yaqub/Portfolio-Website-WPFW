using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioApi.DTOs;
using PortfolioApi.Services;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]

[Authorize]
public class BlogpostController : ControllerBase
{
    private readonly BlogpostService _service;

    public BlogpostController(BlogpostService service)
    {
        _service = service;
    }

    // GET: alle blogposts ophalen
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<List<BlogpostDto>>> GetAll()
    {
        var blogposts = await _service.GetAllAsync();
        return Ok(blogposts);
    }

    // GET: één blogpost ophalen via ID
    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<ActionResult<BlogpostDto>> GetById(int id)
    {
        var blogpost = await _service.GetByIdAsync(id);

        if (blogpost == null)
            return NotFound();

        return Ok(blogpost);
    }

    // POST: een nieuwe blogpost toevoegen
    [Authorize(Policy = "CanEditPortfolio")]
    [HttpPost]
    public async Task<ActionResult<BlogpostDto>> Create(BlogpostCreateDto dto)
    {
        var blogpost = await _service.CreateAsync(dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = blogpost.Id },
            blogpost
        );
    }

    // PUT: een bestaande blogpost aanpassen
    [Authorize(Policy = "CanEditPortfolio")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, BlogpostUpdateDto dto)
    {
        var updated = await _service.UpdateAsync(id, dto);

        if (!updated)
            return NotFound();

        return NoContent();
    }

    // DELETE: een blogpost verwijderen
    [Authorize(Policy = "CanEditPortfolio")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }
}