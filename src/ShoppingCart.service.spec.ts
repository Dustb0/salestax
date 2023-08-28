import { ShoppingCartService } from "./ShoppingCart.service.js";
import { Product } from "./models/Product.js";
import { ProductCategory } from "./models/ProductCategory.js";

const mockCategory = new ProductCategory("Books", false);

const mockProduct = new Product();
mockProduct.label = "Book";
mockProduct.basePrice = 12.49;
mockProduct.category = mockCategory;

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
  
    const total = service.calculateCartTotal();
    expect(total.total).toBe(mockProduct.basePrice * 2);
    expect(total.salesTaxTotal).toBe(0);
  });

  test("should correctly calculate total with taxed product", () => {
  
    const taxedCategory = new ProductCategory("Entertaiment", true);

    const taxedProduct = new Product();
    taxedProduct.label = "Music CD";
    taxedProduct.basePrice = 14.99;
    taxedProduct.category = taxedCategory;

    const service = new ShoppingCartService();
    service.addProduct(taxedProduct, 1);
  
    const total = service.calculateCartTotal();
    expect(total.total).toBe(taxedProduct.basePrice + total.salesTaxTotal);
    expect(total.salesTaxTotal).toBe(taxedProduct.basePrice * service.getSalesTax());
  });

  test("should correctly calculate total with imported product", () => {
  
    const category = new ProductCategory("Food", false);

    const importedProduct = new Product();
    importedProduct.label = "Chocolates";
    importedProduct.basePrice = 10.50;
    importedProduct.category = category;
    importedProduct.isImported = true;

    const service = new ShoppingCartService();
    service.addProduct(importedProduct, 1);
  
    const total = service.calculateCartTotal();
    expect(total.total).toBe(importedProduct.basePrice + total.salesTaxTotal);
    expect(total.salesTaxTotal).toBe(importedProduct.basePrice * service.getImportTax());
  });

});