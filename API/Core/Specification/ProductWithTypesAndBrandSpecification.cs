using Core.Entities;


namespace Core.Specification
{
    public class ProductWithTypesAndBrandSpecification :BaseSpecification<Product>
    {
        public ProductWithTypesAndBrandSpecification(string sort,int ? brandid,int ? typeid) :base(x=>
        (!brandid.HasValue || x.ProductBrandId==brandid) && 
        (!typeid.HasValue || x.ProductTypeId == typeid))  {

            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddOrderBy(x => x.Name);
            if (!string.IsNullOrEmpty(sort)) {
                switch (sort)
                {
                    case "priceAsc" :
                        AddOrderBy(b => b.Price);
                    break;
                    case "priceDesc":
                        AddOrderByDescending(b => b.Price);
                        break;

                    default:
                        AddOrderBy(b => b.Name);    
                        break;
                }
            }
        }
        public ProductWithTypesAndBrandSpecification(int id):base(b=>b.Id==id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
    }
}
