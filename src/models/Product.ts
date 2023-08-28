import { ProductCategory } from "./ProductCategory.js";

export class Product {

  label: string;
  basePrice: number;
  isImported: boolean;
  category: ProductCategory;

  constructor(label: string, basePrice: number, isImported: boolean, category: ProductCategory) {
    this.label = label;
    this.basePrice = basePrice;
    this.isImported = isImported;
    this.category = category;
  }

}