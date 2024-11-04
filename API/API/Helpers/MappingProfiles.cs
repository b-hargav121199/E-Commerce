using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles:Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>().
                ForMember(b=>b.ProductBrand,b=>b.MapFrom(b=>b.ProductBrand.Name)).
                ForMember(b => b.ProductType, b => b.MapFrom(b => b.ProductType.Name))
                .ForMember(b=>b.PictureUrl,b=>b.MapFrom<ProductUrlResolver>() );
        }
        
    }
}
