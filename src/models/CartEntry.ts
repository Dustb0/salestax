import { Product } from "./Product.js";

/**
 * Combination of a product plus the amount in a shopping cart
 */
export class CartEntry {

  product: Product;
  amount: number;
  salesTax: number;

  constructor(product: Product, amount: number) {
    this.product = product;
    this.amount = amount;
    this.salesTax = 0;
  }
}