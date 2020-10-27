import { UserRecord } from "./UserRecord";
import { BrandRecord } from "./BrandRecord";
import { ProductRecord } from "./ProductRecord";
import { ProductVariantRecord } from "./ProductVariantRecord";
import { VariantOrderRecord } from "./VariantOrderRecord";
import {
  UserRepository,
  BrandRepository,
  ProductRepository,
  ProductVariantRepository,
  OrderRepository,
} from "./LocalStorageRepository";
import { QuantityService } from "../services/QuantityService";
import { OrderRecord } from "./OrderRecord";
  
// const baseUrl = "http://localhost:3000";
const baseUrl = "http://ec2-54-183-214-25.us-west-1.compute.amazonaws.com:3000";
const orderFormUrl = `${baseUrl}/order_form`;

const User = (function() {
  const _repository = UserRepository;
  let _lastAccess = null;

  async function listAll() {
    try {
      const list = await fetch(`${baseUrl}/user/allemployees`).then((response) => response.json());
      _lastAccess = Date.now();
      
      const userRecords = list.map(r => new UserRecord({ employeeId: r.EMPLOYEE_ID, firstName: r.FIRST_NAME, lastName: r.LAST_NAME }));
      _repository.alterAll(userRecords).then(_ => console.log("Stored UserRecords into Local Storage."));

      return userRecords;
    } catch (err) {
      console.log('User.listAll: ' + err);
      if (err.message === 'Network request failed') {
        const users = await _repository.listAll().then(list => list.map(r => new UserRecord(r)));
        return users;
      }
    }
  }

  async function employee(employeeCode) {
    try {
      const users = await _repository.listAll().then(list => list.filter(r => r.employeeId === employeeCode).map(r => new UserRecord(r)));
      if (users.length === 1) {
        return users[0];
      }
      
      const responseJson = await fetch(`${baseUrl}/order/login?employee_code=${encodeURIComponent(employeeCode)}`).then((response) => response.json());
      if (100 === responseJson.code) {
        throw responseJson.status;
      }
      
      _lastAccess = Date.now();
      return new UserRecord({
        employeeId: responseJson.EMPLOYEE_ID,
        firstName: responseJson.FIRST_NAME,
        lastName: responseJson.LAST_NAME
      });
    } catch (err) {
      console.log('Usre.employee: ' + err);
      if (err.message === 'Network request failed') {
        return null;
      }
      
      throw err;
    }
  }

  return {
    listAll,
    employee

  }
})();

const BrandList = (function() {
  const _repository = BrandRepository;
  let _lastAccess = null;

  async function listAll() {
    try {
      const list = await fetch(`${orderFormUrl}/brand_list`).then((response) => response.json());
      _lastAccess = Date.now();

      const brandRecordList = list.map(r => new BrandRecord({ code: r.BRAND_CODE, title: r.BRAND_NAME, email: r.EMAIL, ordersFrom: r.ORDERS_FROM, type: 'brand' }));
      _repository.alterAll(brandRecordList).then(_ => console.log("Stored BrandRecords into Local Storage."));

      return brandRecordList;
    } catch (err) {
      console.log('BrandList.listAll: ' + err);
      if (err.message === 'Network request failed') {
        const list = await _repository.listAll().then(list => list.map(r => new BrandRecord(r)));
        return list;
      }

      throw err;
    }
  }

  async function listAllVendor() {
    try {
      const list = await fetch(`${orderFormUrl}/vendor_list`).then((response) => response.json());
      _lastAccess = Date.now();

      const brandRecordList = list.map(r => new BrandRecord({ code: r.VENDOR_CODE, title: r.VENDOR_NAME, email: r.VENDOR_EMAIL, ordersFrom: r.ORDERS_FROM, type: 'vendor' }));
      _repository.alterAllVendor(brandRecordList).then(_ => console.log("Stored Vendor BrandRecords into Local Storage."));

      return brandRecordList
    } catch (err) {
      console.log('BrandList.listAllVendor: ' + err);
      if (err.message === 'Network request failed') {
        const list = await _repository.listAllVendor().then(list => list.map(r => new BrandRecord(r)));
        return list;
      }

      throw err;
    }
  }

  return {
    listAll: listAll,
    listAllVendor: listAllVendor,
  };
})();

const ProductList = (function() {
  const _repository = ProductRepository;
  let _lastAccess = null;

  async function listAllProducts() {
    try {
      const allProducts = await fetch(`${orderFormUrl}/all_product_list`).then((response) => response.json()).then((list) => list.reduce((prev, cur) => {
        prev[cur.BRAND_CODE] = [...(prev[cur.BRAND_CODE] || []), new ProductRecord({
          code: cur.PRODUCT_CODE,
          title: cur.PRODUCT_TITLE,
          manufactureCode: cur.MANUFACTURING_CODE,
          packInfo: cur.PACK_INFO,
          orderBySize: cur.ORDER_BY_SIZE,
          brandCode: cur.BRAND_CODE,
          brandType: 'brand'
        })];

        return prev;
      }, {}));
      _lastAccess = Date.now();

      _repository.alterAllProductList(allProducts).then(_ => console.log("Stored ProductRecords into Local Storage"));
      return allProducts;
    } catch (err) {
      console.log('ProductList.listAllProducts' + err);
      if (err.message === 'Network request failed') {
        return {};
      }

      throw err;
    }
  }

  async function listAllVendorProducts() {
    try {
      const allProducts = await fetch(`${orderFormUrl}/all_vendor_product_list`).then((response) => response.json()).then((list) => list.reduce((prev, cur) => {
        prev[cur.VENDOR_CODE] = [...(prev[cur.VENDOR_CODE] || []), new ProductRecord({
          code: cur.PRODUCT_CODE,
          title: cur.PRODUCT_TITLE,
          manufactureCode: cur.MANUFACTURING_CODE,
          packInfo: cur.PACK_INFO,
          orderBySize: cur.ORDER_BY_SIZE,
          brandCode: cur.VENDOR_CODE,
          brandType: 'vendor'
        })];

        return prev;
      }, {}));
      _lastAccess = Date.now();
      _repository.alterAllVendorProductList(allProducts).then(_ => console.log("Stored Vendor ProductRecords into Local Storage."));
      return allProducts;
    } catch (err) {
      console.log('ProductList.alterAllVendorProductList' + err);
      if (err.message === 'Network request failed') {
        return {};
      }

      throw err;
    }
  }

  async function listAll(brandCode, brandType) {
    try {
      let products = null;
      if (brandType === "brand") {
        products = await _repository.listAllProductList().then((products) => products[brandCode] || []).then(list => list.map(r => new ProductRecord(r)));
      } else if (brandType === "vendor") {
        products = await _repository.listAllVendorProductList().then((products) => products[brandCode] || []).then(list => list.map(r => new ProductRecord(r)));
      }

      if (products.length > 0) {
        return products;
      }

      const endpointUrl = `${orderFormUrl}/${brandType === "brand" ? 'product_list?brand_code' : 'vendor_product_list?vendor_code'}=${decodeURIComponent(brandCode)}`;
      const list = await fetch(endpointUrl).then((response) => response.json());
      _lastAccess = Date.now();

      products = list.map(r => new ProductRecord({ code: r.PRODUCT_CODE, title: r.PRODUCT_TITLE, manufactureCode: r.MANUFACTURING_CODE, packInfo: r.PACK_INFO, orderBySize: r.ORDER_BY_SIZE, brandCode, brandType }));
      _repository.alterAll(products).then(_ => console.log("Stored ProductRecords into Local Storage."));

      return products;
    } catch (err) {
      console.log('ProductList.listAll' + err);
      if (err.message === 'Network request failed') {
        const list = await _repository.listAll().then(list => list.map(r => new ProductRecord(r)));
        return list;
      }

      throw err;
    }
  }

  return {
    listAllProducts: listAllProducts,
    listAllVendorProducts: listAllVendorProducts,
    listAll: listAll,
  };
})();

const ProductVariantList = (function() {
  const _repository = ProductVariantRepository;
  let _lastAccess = null;

  async function listAllProductVariants() {
    try {
      const variants = await fetch(`${orderFormUrl}/all_product_variant_list`).then((response) => response.json()).then((list) => list.reduce((prev, cur) => {
        prev[cur.PRODUCT_CODE] = [...(prev[cur.PRODUCT_CODE] || []), new ProductVariantRecord({
          stdSku: cur.STD_SKU,
          color: cur.PRODUCT_COLOR,
          sizeCode: cur.SIZE_CODE,
          shortSizeCode: cur.SHORT_SIZE_CODE,
          sizeOrder: cur.SIZE_ORDER,
          productCode: cur.PRODUCT_CODE
        })];

        return prev;
      }, {}));
      _lastAccess = Date.now();

      _repository.alterAllProductVariantList(variants).then(_ => console.log("Stored ProductVariantRecords into Local Storage"));
      return variants;
    } catch (err) {
      console.log('ProductVariantList.listAllProductVariants' + err);
      if (err.message === 'Network request failed') {
        return {};
      }

      throw err;
    }
  }

  async function listAll(productCode) {
    try {
      const variants = await _repository.listAllProductVariantList().then((products) => products[productCode] || []).then(list => list.map(r => new ProductVariantRecord(r)));
      if (variants.length > 0) {
        return variants;
      }

      const list = await fetch(`${orderFormUrl}/product_variant_list?product_code=${decodeURIComponent(productCode)}`).then((response) => response.json());
      _lastAccess = Date.now();

      const variantRecords = list.map(r => new ProductVariantRecord({ stdSku: r.STD_SKU, color: r.PRODUCT_COLOR, sizeCode: r.SIZE_CODE, shortSizeCode: r.SHORT_SIZE_CODE, sizeOrder: r.SIZE_ORDER, productCode: r.PRODUCT_CODE }));
      _repository.alterAll(variantRecords).then(_ => console.log("Stored ProductVariantsRecords into Local Storage."));

      return variantRecords;
    } catch (err) {
      console.log('ProductVariantList.listAll' + err);
      if (err.message === 'Network request failed') {
        const list = await _repository.listAll().then(list => list.map(r => new ProductVariantRecord(r)));
        return list;
      }

      throw err;
    }
  }

  return {
    listAllProductVariants,
    listAll
  }
})();

const Order = (function() {
  const _repository = ProductVariantRepository;

  // Filter out obsolated orders.
  async function save(orderList) {
    const now = new Date(Date.now());
    const today = new Date(now.getFullYear(), now.getMonth()+1, now.getDate());
    
    await _repository.alterAll(orderList.map(order => ({order, timestamp: today})));
  }

  // Filter out order whose placed not today
  async function listAll() {
    const now = new Date(Date.now());
    const today = new Date(now.getFullYear(), now.getMonth()+1, now.getDate());

    const orders = await _repository.listAll();
    return orders.filter(({timestamp}) => !(new Date(JSON.stringify(timestamp)) < today)).map(({order}) =>
      new OrderRecord({
        brand: new BrandRecord(order.brand),
        product: new ProductRecord(order.product),
        variantList: order.variantList.map(v => new ProductVariantRecord(v)),
        variantOrderList: order.variantOrderList.map(v => new VariantOrderRecord(v))
      }));
  }

  async function insertOrder(variantOrderList, employeeId, dttm) {
    const params = variantOrderList.map(v => ({
      STD_SKU: v.getStdSku(),
      BRAND_CODE: (v.getBrandType() === 'brand' ? v.getBrandCode() : null),
      VENDOR_CODE: (v.getBrandType() === 'vendor' ? v.getBrandCode() : null),
      PRODUCT_CODE: v.getProductCode(),
      ORDER_QTY: v.getQuantity(),
      ORDER_DATE: dttm.substr(0, 8),
      ORDER_TM: dttm.substr(8, 6),
      EMPLOYEE_ID: employeeId
    }));

    return await fetch(`${orderFormUrl}/place_order`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ORDER_LIST: params })
    }).then(response => response.json())
    .catch(error => {
      console.log('Order.insertOrder: ' + error);
      throw error;
    });
  }

  async function uploadToGoogleSheet(orderList) {
    const params = orderList.map(v => {
      const colors = QuantityService.getColorVariants(v.getVariantList());
      const quantityTable = QuantityService.getQuantityTable(v.getVariantList(), v.getVariantOrderList());

      const filteredColors = [];
      const filteredQuantityTable = quantityTable.filter((row, i) => {
        const sum = row.reduce((accu, cur) => accu + cur, 0);
        if (sum > 0) {
          filteredColors.push(colors[i]);
        }
        
        return sum > 0;
      });

      return {
        brandName: v.getBrand().getTitle(),
        productCode: v.getProduct().getCode(),
        productTitle: v.getProduct().getTitle(),
        order: filteredQuantityTable,
        sizeVariant: QuantityService.getSizeVariants(v.getVariantList()),
        colorVariant: filteredColors,
        totalQty: v.getVariantOrderList().reduce((accu, cur) => accu + cur.getQuantity(), 0)
      };
    });

    return await fetch(`${orderFormUrl}/export_to_google_spread`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ORDER_LIST: params })
    }).then(response => response.json())
    .catch(error => {
      console.log('Order.uploadToGoogleSheet: ' + error);
      throw error;
    });
  }

  return {
    save,
    listAll,
    insertOrder,
    uploadToGoogleSheet
  }
})();
  
export { User, BrandList, ProductList, ProductVariantList, Order };
  