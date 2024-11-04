using Core.Entities;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastucture.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context,ILoggerFactory  loggerFactory) 
        {
			try
			{
                if (!context.ProductBrands.Any())
                {
                    var BrandsData = File.ReadAllText("../Infrastucture/Data/SeedData/brands.json");
                    var Brands = JsonSerializer.Deserialize<List<ProductBrand>>(BrandsData);
                    foreach (var brand in Brands)
                    {
                        context.ProductBrands.Add(brand);
                    }
                    await context.SaveChangesAsync();
                }
                if (!context.ProductTypes.Any())
                {
                    var ProductTypeData = File.ReadAllText("../Infrastucture/Data/SeedData/types.json");
                    var ProductTypes = JsonSerializer.Deserialize<List<ProductType>>(ProductTypeData);
                    foreach (var productType in ProductTypes)
                    {
                        context.ProductTypes.Add(productType);
                    }
                    await context.SaveChangesAsync();
                }

                if (!context.Products.Any())
                {
                    var ProductsData = File.ReadAllText("../Infrastucture/Data/SeedData/products.json");
                    var Products = JsonSerializer.Deserialize<List<Product>>(ProductsData);
                    foreach (var product in Products)
                    {
                        context.Products.Add(product);
                    }
                    await context.SaveChangesAsync();
                }
            }
			catch (Exception ex)
			{

                var Logger = loggerFactory.CreateLogger<StoreContextSeed>();
                Logger.LogError(ex.Message);
			}
        }
    }
}
