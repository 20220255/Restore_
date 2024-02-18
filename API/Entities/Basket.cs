namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();
        public void AddItem(Product product, int quantity)
        {
            // check to see if the product exists in the BasketItem entity
            // if not, item need to be added in the BasketItem
            if (Items.All(item => item.ProductId != product.Id))
            {
                Items.Add(new BasketItem { Product = product, Quantity = quantity });
            }

            // code to check if item exists in the basket, using FirstOrDefault method
            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existingItem != null)
            {
                existingItem.Quantity += quantity;
            }

            // if (Items.Any(item => item.ProductId != product.Id))
            // {
            //     Items.Add(new BasketItem { Product = product, Quantity = quantity });
            // }
        }

        // Just need the productId in the parameter and not the whole product
        // when removing an item. This is just updating Items in memory
        public void RemoveItem(int productId, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            if (item == null)
            {
                return;
            }
            else
            {
                item.Quantity -= quantity;
                if (item.Quantity == 0)
                {
                    Items.Remove(item);
                }
            }
        }
    }
}