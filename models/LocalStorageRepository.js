import {
  AsyncStorage
} from "react-native";

async function retrieveRecords(key) {
  try {
    const jsonListStr = await AsyncStorage.getItem(key);
    return jsonListStr && JSON.parse(jsonListStr) || [];
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function setList(key, list) {
  if (list === null || list === undefined || (list.length || 0) === 0) {
    return;
  }

  try {
    await AsyncStorage.setItem(key, JSON.stringify(list));
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function setObject(key, obj) {
  if (obj === null || obj === undefined) {
    return;
  }

  try {
    await AsyncStorage.setItem(key, JSON.stringify(obj));
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function appand(key, list, primaryKeys) {
  if (key === null || key === '') return;
  if (list === null || (list.length || 0) < 1) return;
  if (primaryKeys === null || (primaryKeys.length || 0) < 1) return;

  try {
    const records = await retrieveRecords(key);

    const uniqueKeys = new Set(list.map((v) => primaryKeys.reduce((acc, cur) => acc + v[cur] + '#')));
    const keep = records.filter((v) => !uniqueKeys.has(primaryKeys.reduce((acc, cur) => acc + v[cur] + '#')));
    const newList = [...keep, ...list];
    setList(key, newList);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

const UserRepository = (function() {
  async function listAll() {
    return await retrieveRecords('@userList') || [];
  }

  async function insert(list) {
    await appand('@userList', list, ['employeeCode']);
  }

  async function alterAll(list) {
    await setList('@userList', list);
  }

  return {
    listAll,
    insert,
    alterAll
  };
})();

const BrandRepository = (function() {
  async function listAll() {
    return await retrieveRecords('@brandList') || [];
  }

  async function insert(list) {
    await appand('@brandList', list, ['code']);
  }

  async function alterAll(list) {
    await setList('@brandList', list);
  }

  async function listAllVendor() {
    return await retrieveRecords('@vendorList');
  }

  async function insertVendor(list) {
    if (list == null) {
      return;
    }

    await appand('@vendorList', list, ['code']);
  }

  async function alterAllVendor(list) {
    await setList('@vendorList', list);
  }

  return {
    listAll: listAll,
    insert: insert,
    alterAll: alterAll,
    listAllVendor: listAllVendor,
    insertVendor: insertVendor,
    alterAllVendor: alterAllVendor,
  };
})();

const ProductRepository = (function() {
  async function listAll(brandCode, brandType) {
    const products = await retrieveRecords('@productList') || [];
    return products.filter((p) => ((brandCode || "") === "" || p.brandCode === brandCode) && ((brandType || "") === "" || p.brandType === brandType));
  }

  async function insert(list) {
    if (list === null) {
      return;
    }
  
    await appand('@productList', list, ['code']);
  }

  async function alterAll(list) {
    if (list === null) {
      return;
    }

    await setList('@productList', list);
  }

  async function listAllProductList() {
    return await retrieveRecords('@allProductList') || {};
  }

  async function alterAllProductList(list) {
    await setObject('@allProductList', list);
  }

  async function listAllVendorProductList() {
    return await retrieveRecords('@allVendorProductList') || {};
  }

  async function alterAllVendorProductList(list) {
    await setObject('@allVendorProductList', list);
  }
  
  return {
    listAll: listAll,
    insert: insert,
    alterAll: alterAll,
    listAllProductList: listAllProductList,
    alterAllProductList: alterAllProductList,
    listAllVendorProductList: listAllVendorProductList,
    alterAllVendorProductList: alterAllVendorProductList,
  };
})();

const ProductVariantRepository = (function() {
  async function listAll(brandCode) {
    const list = await retrieveRecords('@productVariantList') || [];
    return list.filter((v) => ((brandCode || "") === "" || v.brandCode === brandCode));
  }

  async function insert(list) {
    if (list === null) {
      return;
    }
  
    await appand('@productVariantList', list, ['stdSku']);
  }

  async function alterAll(list) {
    if (list === null) {
      return;
    }

    await setList('@productVariantList', list);
  }

  async function listAllProductVariantList() {
    return await retrieveRecords('@allProductVariantList') || {};
  }

  async function alterAllProductVariantList(list) {
    await setObject('@allProductVariantList', list);
  }
  
  return {
    listAll: listAll,
    insert: insert,
    alterAll: alterAll,
    listAllProductVariantList: listAllProductVariantList,
    alterAllProductVariantList: alterAllProductVariantList,
  };
})();

// Store orders in local storage brfore pass them into backend
// { order: OrderRecord, dttm: yyyymmdd hhmiss}
const OrderRepository = (function() {
  async function listAll() {
    return await retrieveRecords('@orderList');
  }

  async function alterAll(list) {
    if (list === null) {
      return;
    }

    await setList('@orderList', list);
  }

  return {
    listAll: listAll,
    alterAll: alterAll,
  };
})();

export { UserRepository, BrandRepository, ProductRepository, ProductVariantRepository, OrderRepository };
