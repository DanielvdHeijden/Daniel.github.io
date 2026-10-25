using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Dtos;
using PortfolioApi.Services;

namespace PortfolioApi.Controllers;

// HTTP-laag voor blogposts: ontvangt het request en kiest het juiste HTTP-resultaat.
// De echte logica zit in BlogpostService.
[ApiController]
[Route("api/blogposts")]
public class BlogpostsController : ControllerBase
{
    private readonly BlogpostService _service;

    public BlogpostsController(BlogpostService service)
    {
        _service = service;
    }

    // GET /api/blogposts
    [HttpGet]
    public async Task<ActionResult<List<BlogpostDto>>> GetAll()
    {
        return Ok(await _service.GetAllAsync());
    }

    // GET /api/blogposts/5
    [HttpGet("{id}")]
    public async Task<ActionResult<BlogpostDto>> GetById(int id)
    {
        var blogpost = await _service.GetByIdAsync(id);
        if (blogpost == null) return NotFound();

        return Ok(blogpost);
    }

    // POST /api/blogposts
    [HttpPost]
    public async Task<ActionResult<BlogpostDto>> Create(BlogpostCreateDto dto)
    {
        var blogpost = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = blogpost.Id }, blogpost);
    }

    // PUT /api/blogposts/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, BlogpostUpdateDto dto)
    {
        var updated = await _service.UpdateAsync(id, dto);
        if (!updated) return NotFound();

        return NoContent();
    }

    // DELETE /api/blogposts/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);
        if (!deleted) return NotFound();

        return NoContent();
    }
}
