using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : DbContext
    {
        // base(options) class is coming from DbContext. The (options) here will passed
        // onto the DbContext class
        // (DbContextOptions options) connection strings to pass
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        // Properties with type of DbSet and specify it with <>, using our
        // entity <Product>
        // DbSet is actually our table in the database with columns representing the
        // properties in the Product Entity
        public DbSet<Product> Products { get; set; }
    }
}