using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.Models;
using PortfolioApi.Services;

var builder = WebApplication.CreateBuilder(args);


// Databaseverbinding
builder.Services.AddDbContext<PortfolioDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

// Identity met eigen User-model en rollen
builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
})
.AddEntityFrameworkStores<PortfolioDbContext>()
.AddDefaultTokenProviders();    

// Autorisatiebeleid
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("CanEditPortfolio", policy => policy.RequireRole("Editor", "Admin")
    );

// Controllers
builder.Services.AddControllers();

// Dependency Injection voor services
builder.Services.AddScoped<ProjectService>();
builder.Services.AddScoped<BlogpostService>();

// Swagger
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
await RoleSeeder.SeedAsync(app.Services);

app.Run();
