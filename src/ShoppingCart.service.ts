import { Cart } from "./models/Cart.js";
import { CartEntry } from "./models/CartEntry.js";
import { Product } from "./models/Product.js";

export class ShoppingCartService {
 
  private cart: Cart;

  constructor() {
    this.cart = new Cart();
  }

  getCart(): Cart {
    return this.cart;
  }

  addProduct(product: Product, amount: number) {
    if (amount < 1) {
      throw Error("Amount has to be greater 0");
    }

    // Check if product is already in the cart
    let entry = this.cart.entries.find(e => e.product === product);

    if (!entry) {
      // If the product hasn't been added yet, add a new entry
      this.cart.entries.push(new CartEntry(product, amount));
    } else {
      // It's already in the cart, so just increase the amount
      entry.amount += amount;
    }
  }

  getSalesTax(): number {
    return 0.1;
  }

  getImportTax(): number {
    return 0.05;
  }

  clearCart() {
    this.cart.entries = [];
    this.cart.salesTaxTotal = 0;
    this.cart.total = 0;
  }

  /**
   * Calculates the taxes of each product entry and the overall total in the cart
   */
  calculateCartTotalAndTaxes() {

    this.cart.entries.forEach((entry) => {
      const basePriceTotal = entry.product.basePrice * entry.amount;

      if (entry.product.category.salesTaxApplicable) {
        entry.salesTax += basePriceTotal * this.getSalesTax();
      }

      if (entry.product.isImported) {
        entry.salesTax += basePriceTotal * this.getImportTax();
      }

      // Round sales taxes up to nearest .05-step
      entry.salesTax = Math.ceil(entry.salesTax / 0.05) * 0.05

      this.cart.salesTaxTotal += entry.salesTax;
      entry.total = basePriceTotal + entry.salesTax;
      this.cart.total += entry.total;
    });
  }
}