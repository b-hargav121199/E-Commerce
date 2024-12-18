﻿using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastucture.Data
{
    public class GenericRepository<T>(StoreContext  storeContext): IGenericRepository<T> where T : BaseEntity
    {

        private readonly StoreContext _storeContext=storeContext;
        public async Task<T> GetByIdAsync(int id)
        {
           return await _storeContext.Set<T>().FindAsync(id);
        }        

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await _storeContext.Set<T>().ToListAsync();
        }
        public async Task<T> GetEntityWithSpec(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).FirstOrDefaultAsync();
        }
        public async Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec)
        {
           return await ApplySpecification(spec).ToListAsync();
        }

        private IQueryable<T> ApplySpecification(ISpecification<T> spec) 
        {
            return SpecificationEvaluator<T>.GetQuery(_storeContext.Set<T>().AsQueryable(), spec);
        }
    }
    
}
