export class ProductCategory {

  label: string;
  salesTaxApplicable: boolean;

  constructor(label: string, salesTaxApplicable: boolean) {
    this.label = label;
    this.salesTaxApplicable = salesTaxApplicable;
  }

}