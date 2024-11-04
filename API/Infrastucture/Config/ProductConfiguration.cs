using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastucture.Config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
          builder.Property(b=>b.Id).IsRequired();
          builder.Property(b=>b.Name).IsRequired().HasMaxLength(100);
          builder.Property(b => b.Description).IsRequired().HasMaxLength(180);
          builder.Property(b => b.Price).HasColumnType("decimal(18,2)");
          builder.Property(b => b.PictureUrl).IsRequired();
          builder.HasOne(b => b.ProductBrand).WithMany()
                  .HasForeignKey(b => b.ProductBrandId);
            builder.HasOne(b => b.ProductType).WithMany()
                .HasForeignKey(b=>b.ProductTypeId); 


        }
    }
}
