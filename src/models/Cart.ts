import { CartEntry } from "./CartEntry.js";

export class Cart {

  /**
   * The contents of the shopping cart, each product and the amount
   */
  entries: CartEntry[] = [];

  salesTaxTotal: number = 0;

  total: number = 0;
}