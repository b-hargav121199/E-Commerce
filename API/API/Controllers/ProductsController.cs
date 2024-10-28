
using Core.Entities;
using Infrastucture.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController (StoreContext context) : ControllerBase
    {
        private readonly  StoreContext _Context= context;

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var Products= await _Context.Products.ToListAsync();
            return Ok(Products);
        }
        [HttpGet("{id}")]
        public  async Task<ActionResult<Product>> GetProduct(int id)
        {
            var Product = await _Context.Products.FindAsync(id);
            return Ok(Product);
        }
    }
}
