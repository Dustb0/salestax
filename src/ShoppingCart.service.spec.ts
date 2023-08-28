import { ShoppingCartService } from "./ShoppingCart.service.js";
import { Product } from "./models/Product.js";

const mockProduct = new Product();
mockProduct.label = "Apfel";
mockProduct.basePrice = 1.2;

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

});