using Microsoft.AspNetCore.Mvc;
using PortfolioApi.DTOs;
using PortfolioApi.Services;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectController : ControllerBase
{
    private readonly ProjectService _service;

    public ProjectController(ProjectService service)
    {
        _service = service;
    }

    // GET: alle projecten ophalen
    [HttpGet]
    public async Task<ActionResult<List<ProjectDto>>> GetAll()
    {
        var projects = await _service.GetAllAsync();
        return Ok(projects);
    }

    // GET: één project ophalen via ID
    [HttpGet("{id}")]
    public async Task<ActionResult<ProjectDto>> GetById(int id)
    {
        var project = await _service.GetByIdAsync(id);

        if (project == null)
            return NotFound();

        return Ok(project);
    }

    // POST: een nieuw project toevoegen
    [HttpPost]
    public async Task<ActionResult<ProjectDto>> Create(ProjectCreateDto dto)
    {
        var project = await _service.CreateAsync(dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = project.Id },
            project
        );
    }

    // PUT: een bestaand project aanpassen
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, ProjectUpdateDto dto)
    {
        var updated = await _service.UpdateAsync(id, dto);

        if (!updated)
            return NotFound();

        return NoContent();
    }

    // DELETE: een project verwijderen
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }
}