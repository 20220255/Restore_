using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http.Features;

namespace API.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        // Navigation property. This will link the ProductId of the
        // BasketItem with properties of Product entity but in this
        // case, only the ProductId will show for the BasketItem
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int BasketId {get; set;}
        public Basket Basket {get; set;}
    }
}