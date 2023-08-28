import { ShoppingCartService } from "./ShoppingCart.service.js";
import { Cart } from "./models/Cart.js";
import { Product } from "./models/Product.js";
import { ProductCategory } from "./models/ProductCategory.js";

/**
 * Prints a cart-object according to the specifications
 */
const printCart = function(cart: Cart) {
  cart.entries.forEach((entry) => {
    console.log(`${entry.amount} ${entry.product.label}: ${entry.total.toFixed(2)}`)
  });

  // Round sales taxes to the nearest .05-step:
  const totalSalesTax =  Math.ceil(cart.salesTaxTotal / 0.05) * 0.05;
  console.log(`Salex Taxes: ${totalSalesTax.toFixed(2)}`);
  console.log(`Total: ${cart.total.toFixed(2)}`);
}

// Prepare category data
const bookCategory = new ProductCategory("Books", false);
const entertaimentCategory = new ProductCategory("Entertaiment", true);
const foodCategory = new ProductCategory("Food", false);

const service = new ShoppingCartService();

// Case 1
service.addProduct(new Product("Book", 12.49, false, bookCategory), 1);
service.addProduct(new Product("Music CD", 14.99, false, entertaimentCategory), 1);
service.addProduct(new Product("Chocolate Bar", 0.85, false, foodCategory), 1);
service.calculateCartTotalAndTaxes();
printCart(service.getCart());

// Case 2
service.clearCart();
service.addProduct(new Product("Book", 12.49, false, bookCategory), 1);
service.addProduct(new Product("Music CD", 14.99, false, entertaimentCategory), 1);
service.addProduct(new Product("Chocolate Bar", 0.85, false, foodCategory), 1);
service.calculateCartTotalAndTaxes();
printCart(service.getCart());