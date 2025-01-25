using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace API.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDto MapBasketToDto(this Basket basket)
        {
            if (basket == null) return null;

            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item =>
                {
                    if (item.Product == null)
                    {
                        // Handle missing product information if necessary (e.g., log or throw an error)
                        return null;
                    }

                    return new BasketItemDto
                    {
                        ProductId = item.ProductId,
                        Name = item.Product.Name,
                        Price = item.Product.Price,
                        PictureUrl = item.Product.PictureUrl,
                        Type = item.Product.Type,
                        Genre = item.Product.Genre,
                        Quantity = item.Quantity
                    };
                }).Where(item => item != null).ToList() // Exclude any null items in the list
            };
        }

        public static IQueryable<Basket> RetrieveBasketWithItems(this IQueryable<Basket> query, string buyerId)
        {
            return query
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .Where(b => b.BuyerId == buyerId);
        }
    }

}