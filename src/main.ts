import { ShoppingCartService } from "./ShoppingCart.service.js";
import { Cart } from "./models/Cart.js";
import { Product } from "./models/Product.js";
import { ProductCategory } from "./models/ProductCategory.js";

/**
 * Prints a cart-object according to the specifications
 */
const printCart = function(cart: Cart) {
  cart.entries.forEach((entry) => {
    console.log(`${entry.amount} ${entry.product.isImported ? "imported " : ""}${entry.product.label}: ${entry.total.toFixed(2)}`)
  });

  console.log(`Salex Taxes: ${cart.salesTaxTotal.toFixed(2)}`);
  console.log(`Total: ${cart.total.toFixed(2)}\n`);
}

// Prepare category data
const bookCategory = new ProductCategory("Books", false);
const otherCategory = new ProductCategory("Other", true);
const foodCategory = new ProductCategory("Food", false);
const medicineCategory = new ProductCategory("Medicine", false);

const service = new ShoppingCartService();

// Case 1
service.addProduct(new Product("Book", 12.49, false, bookCategory), 1);
service.addProduct(new Product("Music CD", 14.99, false, otherCategory), 1);
service.addProduct(new Product("Chocolate Bar", 0.85, false, foodCategory), 1);
service.calculateCartTotalAndTaxes();
printCart(service.getCart());

// Case 2
service.clearCart();
service.addProduct(new Product("Box of Chocolates", 10.00, true, foodCategory), 1);
service.addProduct(new Product("Bottle of Perfume", 47.50, true, otherCategory), 1);
service.calculateCartTotalAndTaxes();
printCart(service.getCart());

// Case 3
service.clearCart();
service.addProduct(new Product("Bottle of Perfume", 27.99, true, otherCategory), 1);
service.addProduct(new Product("Bottle of Perfume", 18.99, false, otherCategory), 1);
service.addProduct(new Product("Headache Pills", 9.75, false, medicineCategory), 1);
service.addProduct(new Product("Box of Chocolates", 11.25, true, foodCategory), 1);
service.calculateCartTotalAndTaxes();
printCart(service.getCart());