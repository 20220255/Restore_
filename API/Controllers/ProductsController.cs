using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    // http://localhost:5243/api/Products where Products came from ProductsComtroller
    // but without the Controller word.
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {
            _context = context;
            
        }

        [HttpGet]
        public async  Task<ActionResult<List<Product>>> GetProducts() {
            return await _context.Products.ToListAsync();
        }

        // http://localhost:5243/api/Products/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id) {
            return await _context.Products.FindAsync(id);
        }
    }
}