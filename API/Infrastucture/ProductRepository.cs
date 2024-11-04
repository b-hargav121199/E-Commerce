using Core.Entities;
using Core.Interfaces;
using Infrastucture.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastucture
{
    public class ProductRepository(StoreContext storeContext) : IProductRepository
    {
        private readonly StoreContext _storeContext= storeContext;

        

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _storeContext.Products
                .Include(b=>b.ProductBrand).Include(b=>b.ProductType)
                .FirstOrDefaultAsync(b=>b.Id==id);
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync()
        {
            return await _storeContext.Products
                .Include(b=>b.ProductBrand)
                .Include(b=>b.ProductType)
                .ToListAsync();
        }

        public async Task<ProductBrand> GetProductBrandByIdAsync(int id)
        {
           return await _storeContext.ProductBrands.FindAsync(id);
        }

        public async Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync()
        {
            return await _storeContext.ProductBrands.ToListAsync();
        }
        public async Task<ProductType> GetProductTypeByIdAsync(int id)
        {
            return await _storeContext.ProductTypes.FindAsync(id);
        }

        public async Task<IReadOnlyList<ProductType>> GetProductTypesAsync()
        {
           return await _storeContext.ProductTypes.ToListAsync(); 
        }
    }
}
