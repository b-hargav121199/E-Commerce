using Core.Entities;
using Core.Specification;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastucture.Data
{
    public class SpecificationEvaluator<TEntity> where TEntity : BaseEntity
    {
        public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery, ISpecification<TEntity> spac) 
        {
            var query = inputQuery;
            if (spac.Criteria != null)
            {
                query   = query.Where(spac.Criteria);
            }
            if (spac.OrderBy != null)
            {
                query = query.OrderBy(spac.OrderBy);
            }
            if (spac.OrderByDescending != null)
            {
                query = query.OrderByDescending(spac.OrderByDescending);
            }
            if (spac.IsPagingEnabled)
            {
                query = query.Skip(spac.Skip).Take(spac.Take);
            }
            query = spac.Includes.Aggregate(query, (current, include) =>current.Include(include));
            return query;
        }
    }
}
