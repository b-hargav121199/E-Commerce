using Core.Entities;


namespace Core.Specification
{
    public class ProductWithTypesAndBrandSpecification :BaseSpecification<Product>
    {
        public ProductWithTypesAndBrandSpecification() {

            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
        public ProductWithTypesAndBrandSpecification(int id):base(b=>b.Id==id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
    }
}
