export class ProductVariantRecord {
    constructor({
      stdSku,
      color,
      sizeCode,
      shortSizeCode,
      sizeOrder,
      productCode
    }) {
      this.setStdSku(stdSku);
      this.setColor(color);
      this.setSizeCode(sizeCode);
      this.setShortSizeCode(shortSizeCode);
      this.setSizeOrder(sizeOrder);
      this.setProductCode(productCode);
    }
  
    getStdSku() {
      return this.stdSku;
    }
  
    setStdSku(stdSku) {
      this.stdSku = stdSku;
    }
  
    getColor() {
      return this.color;
    }
  
    setColor(color) {
      this.color = color;
    }
  
    getSizeCode() {
      return this.sizeCode;
    }
  
    setSizeCode(sizeCode) {
      this.sizeCode = sizeCode;
    }
  
    getShortSizeCode() {
      return this.shortSizeCode;
    }
  
    setShortSizeCode(shortSizeCode) {
      this.shortSizeCode = shortSizeCode;
    }

    getSizeOrder() {
      return this.sizeOrder;
    }

    setSizeOrder(sizeOrder) {
      this.sizeOrder = sizeOrder;
    }

    getProductCode() {
      return this.productCode;
    }
  
    setProductCode(productCode) {
      this.productCode = productCode;
    }
  
    toObject() {
      return {
        stdSku: this.getStdSku(),
        color: this.getColor(),
        sizeCode: this.getSizeCode(),
        shortSizeCode: this.getShortSizeCode(),
        sizeOrder: this.getSizeOrder(),
        productCode: this.getProductCode()
      };
    }
  }