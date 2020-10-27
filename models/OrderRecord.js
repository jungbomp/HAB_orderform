export class OrderRecord {
  constructor({
    brand,
    product,
    variantList,
    variantOrderList
  }) {
    this.setBrand(brand);
    this.setProduct(product);
    this.setVariantList(variantList);
    this.setVariantOrderList(variantOrderList);
  }

  getBrand() {
    return this.brand;
  }

  setBrand(brand) {
    this.brand = brand;
  }

  getProduct() {
    return this.product;
  }

  setProduct(product) {
    this.product = product;
  }

  getVariantList() {
    return this.variantList;
  }

  setVariantList(variantList) {
    this.variantList = variantList;
  }

  getVariantOrderList() {
    return this.variantOrderList;
  }

  setVariantOrderList(variantOrderList) {
    this.variantOrderList = variantOrderList;
  }

  toObject() {
    return {
      brand: this.getBrand().toObject(),
      product: this.getProduct().toObject(),
      variantList: this.getVariantList().map(v => v.toObject()),
      variantOrderList: this.getVariantOrderList().map(v => v.toObject())
    };
  }
}