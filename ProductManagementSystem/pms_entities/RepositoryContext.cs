using Microsoft.EntityFrameworkCore;
using ProductManagementSystem.Entities.Configurations;
using ProductManagementSystem.Entities.Models;

namespace ProductManagementSystem.Entities
{
    public class RepositoryContext: DbContext
    {
        public RepositoryContext(DbContextOptions options): base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ProductConfiguration());
        }
    }
}