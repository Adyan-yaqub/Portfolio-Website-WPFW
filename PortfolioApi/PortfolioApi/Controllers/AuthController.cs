using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PortfolioApi.DTOs;
using PortfolioApi.Models;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public AuthController(
        UserManager<User> userManager,
        SignInManager<User> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    // POST: api/Auth/register
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto registerDto)
    {
        var user = new User
        {
            UserName = registerDto.Email,
            Email = registerDto.Email
        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded)
            return BadRequest(result.Errors);


        // Voeg de gebruiker toe aan de "Gast" rol
        var roleResult = await _userManager.AddToRoleAsync(user, "Gast");

        if (!roleResult.Succeeded)
        {
            await _userManager.DeleteAsync(user);
            return BadRequest(roleResult.Errors);
        }

        return Ok("Registratie succesvol.");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var result = await _signInManager.PasswordSignInAsync(
            dto.Email,
            dto.Password,
            isPersistent: false,
            lockoutOnFailure: false
        );

        if (!result.Succeeded)
            return Unauthorized("E-mailadres of wachtwoord is onjuist.");

        return Ok(new
        {
            message = "Login succesvol.",
            cookieIssued = Response.Headers.ContainsKey("Set-Cookie")
        });
    }

    // POST: api/Auth/logout
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();

        return Ok("Uitgelogd.");
    }


    [HttpGet("check")]
    public IActionResult CheckLogin()
    {
        if (User.Identity?.IsAuthenticated == true)
            return Ok("Je bent ingelogd!");

        return Unauthorized("Je bent niet ingelogd.");
    }
}