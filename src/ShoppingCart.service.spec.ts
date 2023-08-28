import { ShoppingCartService } from "./ShoppingCart.service.js";
import { Product } from "./models/Product.js";
import { ProductCategory } from "./models/ProductCategory.js";

// General mock data
const mockCategory = new ProductCategory("Books", false);
const mockProduct = new Product("Book", 12.49, false, mockCategory);

describe("ShoppingCart Service", () => {

  test("should validate product amount", () => {

    const service = new ShoppingCartService();
  
    // Call method in anonymous function expect the error
    expect(() => service.addProduct(mockProduct, 0)).toThrowError();
  });
  
  test("should add new entry", () => {
  
    const service = new ShoppingCartService();
    service.addProduct(mockProduct, 2);
  
    expect(service.getCart().entries.length).toBe(1);
    expect(service.getCart().entries[0].product).toEqual(mockProduct);
    expect(service.getCart().entries[0].amount).toEqual(2);
  });
  
  test("should increase amount of existing entry", () => {
  
    const service = new ShoppingCartService();
    service.addProduct(mockProduct, 2);
    service.addProduct(mockProduct, 5);
  
    expect(service.getCart().entries.length).toBe(1);
    expect(service.getCart().entries[0].product).toEqual(mockProduct);
    expect(service.getCart().entries[0].amount).toEqual(7);
  });

  test("should correctly calculate total with no-tax product", () => {
  
    const service = new ShoppingCartService();
    service.addProduct(mockProduct, 2);
  
    service.calculateCartTotalAndTaxes();
    expect(service.getCart().total).toBe(mockProduct.basePrice * 2);
    expect(service.getCart().salesTaxTotal).toBe(0);
  });

  test("should clear cart", () => {
  
    const service = new ShoppingCartService();
    service.addProduct(mockProduct, 2);
    service.calculateCartTotalAndTaxes();

    service.clearCart();
    expect(service.getCart().entries.length).toBe(0);
    expect(service.getCart().total).toBe(0);
    expect(service.getCart().salesTaxTotal).toBe(0);
  });

  test("should correctly calculate total with taxed product", () => {
  
    const taxedCategory = new ProductCategory("Entertaiment", true);
    const taxedProduct = new Product("Music CD", 14.99, false, taxedCategory);

    const service = new ShoppingCartService();
    service.addProduct(taxedProduct, 1);
  
    service.calculateCartTotalAndTaxes();
    expect(service.getCart().total).toBe(taxedProduct.basePrice + service.getCart().salesTaxTotal);
    expect(service.getCart().salesTaxTotal).toBe(1.5);
  });

  test("should correctly calculate total with imported product", () => {
  
    const category = new ProductCategory("Food", false);
    const importedProduct = new Product("Chocolates", 10.50, true, category);

    const service = new ShoppingCartService();
    service.addProduct(importedProduct, 1);
  
    service.calculateCartTotalAndTaxes();
    expect(service.getCart().total).toBe(importedProduct.basePrice + service.getCart().salesTaxTotal);
    expect(service.getCart().salesTaxTotal).toBe(0.55);
  });

});