/**
 * 
 * @param {*} item : Object
 * {
 *   VENDOR_CODE: "01",
 *   VENDOR_NAME: "Vendor 01 Name",
 *   EMAIL: "vendor01@email.com",
 *   ORDERS_FROM: "orders from",
 *   data: "vendor 01 Name",
 *   key: "Vendor 1",
 *   PRODUCTS:  [
 *     {
 *       BRAND_CODE: "KS",
 *       PRODUCT_CODE: "1KSA0001",
 *       PRODUCT_TITLE: "Product title",
 *       MANUFACTURING_CODE: "code",
 *       PACK_INFO: 1,
 *       ORDER_BY_SIZE: "N",
 *       data: "product title",
 *       key: "1KSA0001"
 *     }
 *   ]
 * }
 * or 
 * {
 *   BRAND_CODE: "KS",
 *   BRAND_NAME: "brand name",
 *   EMAIL: "brand@email.com",
 *   ORDERS_FROM: "orders from",
 *   data: "brand name",
 *   key: "KS"
 * }
 */

export class BrandRecord {
  constructor({
    code,
    title,
    email,
    ordersFrom,
    type,
  }) {
    this.setCode(code);
    this.setTitle(title);
    this.setEmail(email);
    this.setOrdersFrom(ordersFrom);
    this.setType(type);
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

  getEmail() {
    return this.email;
  }

  setEmail(email) {
    this.email = email;
  }

  getOrdersFrom() {
    return this.ordersFrom;
  }

  setOrdersFrom(ordersFrom) {
    this.ordersFrom = ordersFrom;
  }

  getType() {
    return this.type;
  }

  setType(type) {
    const localeLowerCaseType = type.toLocaleLowerCase();
    if (false === ["brand", "vendor"].includes(localeLowerCaseType)) {
      throw "type should be either brand or vendor.";
    }

    this.type = localeLowerCaseType;
  }

  toObject() {
    return {
      code: this.getCode(),
      title: this.getTitle(),
      email: this.getEmail(),
      ordersFrom: this.getOrdersFrom(),
      type: this.getType()
    };
  }
}