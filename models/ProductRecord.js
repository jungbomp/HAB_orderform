/**
 * @param {*} item : Object
 * {
 *   BRAND_CODE: "KS",
 *   PRODUCT_CODE: "1KSA0001",
 *   PRODUCT_TITLE: "Product title",
 *   MANUFACTURING_CODE: "code",
 *   PACK_INFO: 1,
 *   ORDER_BY_SIZE: "N",
 *   data: "product title",
 *   key: "1KSA0001"
 * }
 */

export class ProductRecord {
    constructor({
      code,
      title,
      manufacturingCode,
      packInfo,
      orderBySize,
      brandCode,
      brandType
    }) {
      this.setCode(code);
      this.setTitle(title);
      this.setManufacturingCode(manufacturingCode);
      this.setPackInfo(packInfo);
      this.setOrderBySize(orderBySize);
      this.setBrandCode(brandCode);
      this.setBrandType(brandType);
    }
  
    getCode() {
      return this.code;
    }
  
    setCode(code) {
      this.code = code;
    }
  
    getTitle() {
      return this.title;
    }
  
    setTitle(title) {
      this.title = title;
    }
  
    getManufacturingCode() {
      return this.manufacturingCode;
    }
  
    setManufacturingCode(manufacturingCode) {
      this.manufacturingCode = manufacturingCode;
    }
  
    getPackInfo() {
      return this.packInfo;
    }
  
    setPackInfo(packInfo) {
      this.packInfo = packInfo;
    }
  
    getOrderBySize() {
      return this.orderBySize;
    }
  
    setOrderBySize(orderBySize) {
      const localeUpperCaseStr = orderBySize.toLocaleUpperCase();
      if (false === ["Y", "N"].includes(localeUpperCaseStr)) {
        throw "type should be either Y or N.";
      }
  
      this.orderBySize = localeUpperCaseStr;
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
  
    toObject() {
      return {
        code: this.getCode(),
        title: this.getTitle(),
        manufacturingCode: this.getManufacturingCode(),
        packInfo: this.getPackInfo(),
        orderBySize: this.getOrderBySize(),
        brandCode: this.getBrandCode(),
        brandType: this.getBrandType()
      };
    }
  }