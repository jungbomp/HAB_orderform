import { ProductVariantRecord } from '../models/ProductVariantRecord'

const QuantityService =  (function() {
  function getSizeVariants(productVariantList) {
    const set = new Set();
    const sizeList = productVariantList.reduce((accu, cur) => {
      if (set.has(cur.getSizeCode()) === false) {
        set.add(cur.getSizeCode());
        accu.push({ code: cur.getSizeCode(), shortCode: cur.getShortSizeCode(), rank: cur.getSizeOrder() });
      }

      return accu;
    }, []);
    
    return sizeList.sort((lhs, rhs) => lhs.rank - rhs.rank);
  }

  function getColorVariants(productVariantList) {
    const set = new Set();
    const colorList = productVariantList.reduce((accu, cur) => {
      const color = cur.getColor();
      if (set.has(color) === false) {
        set.add(color);
        accu.push(color);
      }

      return accu;
    }, []);
    
    return colorList.sort((lhs, rhs) => lhs.localeCompare(rhs));
  }

  function getQuantityTable(productVariantList, orderList) {
    const colorVariants = getColorVariants(productVariantList);
    const colorIndex = colorVariants.reduce((accu, cur, i) => ({ ...accu, [cur]: i }), {});

    const sizeVariants = getSizeVariants(productVariantList);
    const sizeIndex = sizeVariants.reduce((accu, cur, i) => ({ ...accu, [cur.code]: i }), {});
    
    const skuIndex = productVariantList.reduce((accu, cur, i) => ({ ...accu, [cur.getStdSku()]: i }));

    const quantityTable = colorVariants.map((v) => new Array(sizeVariants.length).fill(0));

    return (orderList || []).reduce((accu, cur) => {
      const stdSku = cur.getStdSku();
      if (stdSku in skuIndex) {
        const color = productVariantList[skuIndex[stdSku]].getColor();
        const sizeCode = productVariantList[skuIndex[stdSku]].getSizeCode();
        accu[colorIndex[color]][sizeIndex[sizeCode]] = cur.getQuantity();
      }

      return accu;
    }, quantityTable);
  }

  function getVariantQuantityList(productVariantList, quantityTable) {
    const colorVariants = getColorVariants(productVariantList);
    const sizeVariants = getSizeVariants(productVariantList);
    const skuIndex = productVariantList.reduce((accu, cur, i) => ({ ...accu, [cur.getColor()]: { ...accu[cur.getColor()], [cur.getSizeCode()]: i }}), {});
    
    const variantQuantityList = quantityTable.reduce((accu, row, r) => {
      const list = row.reduce((inner_accu, cell, c) => {
        if (cell > 0) {
          inner_accu.push({ stdSku: productVariantList[skuIndex[colorVariants[r]][sizeVariants[c].code]].getStdSku(), quantity: cell });
        }

        return inner_accu;
      }, []);

      return [ ...accu, ...list];
    }, []);

    return variantQuantityList;
  }

  return {
    getSizeVariants,
    getColorVariants,
    getQuantityTable,
    getVariantQuantityList,
  }
})();



export { QuantityService }