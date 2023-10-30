using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly string BUYER_ID = "buyerId";
        public BasketController(StoreContext context)
        {
            _context = context;

        }


        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDTO>> getBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();

            return mapBasketToDTO(basket);
        }



        [HttpPost]
        public async Task<ActionResult<BasketDTO>> addItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();

            if (basket == null) basket = CreateBasket();

            var product = await _context.Products.FindAsync(productId);

            if (product == null) return BadRequest(new ProblemDetails { Title = "Product Not Found" });

            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
                return CreatedAtRoute("GetBasket", mapBasketToDTO(basket));

            return BadRequest(new ProblemDetails { Title = "Saving failed" });
        }



        [HttpDelete]
        public async Task<ActionResult> removeItemfromBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();

            basket.RemoveItem(productId, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
                return Ok();

            return BadRequest(new ProblemDetails { Title = "Saving failed" });
        }

        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                        .Include(i => i.Items)
                        .ThenInclude(p => p.Product)
                        .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies[BUYER_ID]);
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();

            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };

            Response.Cookies.Append(BUYER_ID, buyerId, cookieOptions);

            var basket = new Basket { BuyerId = buyerId };

            _context.Baskets.Add(basket);

            return basket;
        }

        private static BasketDTO mapBasketToDTO(Basket basket)
        {
            return new BasketDTO
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDTO
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Name,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity,
                }).ToList()
            };
        }

    }
}