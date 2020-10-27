export class VariantOrderRecord {
  constructor({
    brandCode,
    brandType,
    productCode,
    stdSku,
    quantity
  }) {
    this.setBrandCode(brandCode);
    this.setBrandType(brandType);
    this.setProductCode(productCode);
    this.setStdSku(stdSku);
    this.setQuantity(quantity);
  }
  
  getBrandCode() {
    return this.brandCode;
  }

  setBrandCode(brandCode) {
    this.brandCode = brandCode;
  }

  getBrandType() {
    return this.brandType;
  }

  setBrandType(brandType) {
    this.brandType = brandType;
  }

  getProductCode() {
    return this.productCode;
  }

  setProductCode(productCode) {
    this.productCode = productCode;
  }
  
  getStdSku() {
    return this.stdSku;
  }

  setStdSku(stdSku) {
    this.stdSku = stdSku;
  }
    
  getQuantity() {
    return this.quantity;
  }

  setQuantity(quantity) {
    this.quantity = quantity;
  }

  toObject() {
    return {
      brandCode: this.getBrandCode(),
      brandType: this.getBrandType(),
      productCode: this.getProductCode(),
      stdSku: this.getStdSku(),
      quantity: this.getQuantity()
    };
  }
}