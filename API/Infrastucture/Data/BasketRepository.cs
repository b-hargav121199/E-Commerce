using Core.Entities;
using Core.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastucture.Data
{
    public class BasketRepository : IBasketRepository
    {
        private IMemoryCache _cacheProvider;
        public BasketRepository( IMemoryCache cacheProvider)
        {
                _cacheProvider=cacheProvider;
        }
        public async Task<bool> DeleteBasketAsync(string basketId)
        {
            await Task.Run(() => _cacheProvider.Remove(basketId));
            return true;
        }

        public async Task<CustomerBasket> GetBasketAsync(string basketId)
        {
            var data = _cacheProvider.Get(basketId) as CustomerBasket;
            return await Task.FromResult(data);
        }

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
        {
            var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetSlidingExpiration(TimeSpan.FromDays(30));
            var Created = _cacheProvider.Set(basket.Id, basket);
            return await GetBasketAsync(basket.Id);
        }
    }
}
