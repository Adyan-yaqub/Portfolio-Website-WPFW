using Microsoft.AspNetCore.Identity;
using PortfolioApi.Models;

namespace PortfolioApi.Data;

public static class RoleSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();

        var roleManager = scope.ServiceProvider
            .GetRequiredService<RoleManager<IdentityRole>>();

        var userManager = scope.ServiceProvider
            .GetRequiredService<UserManager<User>>();

        var configuration = scope.ServiceProvider
            .GetRequiredService<IConfiguration>();

        string[] roles = { "Gast", "Editor", "Admin" };

        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }

        await CreateTestUser(userManager, configuration,
            "Editor", "TestUsers:EditorEmail", "TestUsers:EditorPassword");

        await CreateTestUser(userManager, configuration,
            "Admin", "TestUsers:AdminEmail", "TestUsers:AdminPassword");
    }

    private static async Task CreateTestUser(
        UserManager<User> userManager,
        IConfiguration configuration,
        string role,
        string emailKey,
        string passwordKey)
    {
        var email = configuration[emailKey];
        var password = configuration[passwordKey];

        if (string.IsNullOrWhiteSpace(email) ||
            string.IsNullOrWhiteSpace(password))
            return;

        var user = await userManager.FindByEmailAsync(email);

        if (user == null)
        {
            user = new User
            {
                UserName = email,
                Email = email
            };

            var result = await userManager.CreateAsync(user, password);

            if (!result.Succeeded)
                throw new Exception(string.Join(", ",
                    result.Errors.Select(e => e.Description)));
        }

        if (!await userManager.IsInRoleAsync(user, role))
        {
            var result = await userManager.AddToRoleAsync(user, role);

            if (!result.Succeeded)
                throw new Exception(string.Join(", ",
                    result.Errors.Select(e => e.Description)));
        }
    }
}