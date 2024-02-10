using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    // [ApiController]
    // [Route("api/[controller]")]
    // but without the Controller word.
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {
            _context = context;

        }
        // http://localhost:5243/api/Products where Products came from ProductsController
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // http://localhost:5243/api/Products/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            // return await _context.Products.FindAsync(id);
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            } else
            {
                return product;
            }
        }
    }
}