using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>().HasData(
            new Product 
            { 
                Id = 1, 
                Name = "Laptop", 
                Description = "High-performance laptop", 
                Price = 1299.99m, 
                Stock = 15,
                CreatedAt = DateTime.UtcNow
            },
            new Product 
            { 
                Id = 2, 
                Name = "Mouse", 
                Description = "Wireless mouse", 
                Price = 29.99m, 
                Stock = 50,
                CreatedAt = DateTime.UtcNow
            },
            new Product 
            { 
                Id = 3, 
                Name = "Keyboard", 
                Description = "Mechanical keyboard", 
                Price = 89.99m, 
                Stock = 30,
                CreatedAt = DateTime.UtcNow
            }
        );
    }
}
