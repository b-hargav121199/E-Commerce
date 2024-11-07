
using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Infrastucture.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    
    public class ProductsController(IGenericRepository<Product> ProductRepo,
        IGenericRepository<ProductBrand> BrandRepo,
        IGenericRepository<ProductType> TypeRepo,IMapper Mapper) :
        BaseApiController
    {
        private readonly IGenericRepository<Product> _Productrepo = ProductRepo;
        private readonly IGenericRepository<ProductBrand> _ProductbrandRepo = BrandRepo;
        private readonly IGenericRepository<ProductType> _ProductTypeRepo = TypeRepo;
        private readonly IMapper _Mapper = Mapper;




        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts(string sort,int ? brandid, int ? typeid,string search)
        {
            var spec= new ProductWithTypesAndBrandSpecification(sort,brandid,typeid);
            var Products = await _Productrepo.ListAsync(spec);
            if (search != null) 
            {
                Products = Products.Where(p => p.Name != null && p.Name.ToLower().Contains(search.ToLower())).ToList();
            }
            return Ok(_Mapper.Map<IReadOnlyList<Product>,IReadOnlyList<ProductToReturnDto>>(Products));
        }
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse),StatusCodes.Status404NotFound)]

        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductWithTypesAndBrandSpecification(id);
            var Product = await _Productrepo.GetEntityWithSpec(spec);
            if (Product == null) return NotFound(new ApiResponse(404));
            return Ok(_Mapper.Map<Product,ProductToReturnDto>(Product));
        }

        [HttpGet("ProductBrands")]
        public async Task<ActionResult<ProductBrand>> GetProductBrands()
        {
            var ProductBrands = await _ProductbrandRepo.ListAllAsync();
            return Ok(ProductBrands);
        }
        [HttpGet("ProductBrand/{id}")]
        public async Task<ActionResult<List<ProductBrand>>> GetProductBrand(int id)
        {
            var ProductBrand = await _ProductbrandRepo.GetByIdAsync(id);
            return Ok(ProductBrand);
        }

        [HttpGet("ProductTypes")]
        public async Task<ActionResult<List<ProductType>>> GetProductTypes()
        {
            var ProductTypes = await _ProductTypeRepo.ListAllAsync();
            return Ok(ProductTypes);
        }
        [HttpGet("ProductType/{id}")]
        public async Task<ActionResult<ProductType>> GetProductType(int id)
        {
            var ProductType = await _ProductTypeRepo.GetByIdAsync(id);
            return Ok(ProductType);
        }
    }
}
