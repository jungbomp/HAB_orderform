import * as types from './ActionTypes';

export function setBrand(brand) {
  return {
    type: types.SET_BRAND,
    brand: { ...brand }
  }
}

export function setProduct(product) {
  return {
    type: types.SET_PRODUCT,
    product: { ...product }
  }
}

 /* {
  *   sizeVariant: {
  *     index: Map {
  *       "A000S" => 0,
  *       "A000M" => 1,
  *       .
  *       .
  *       .
  *     },
  *     variant: Array [
  *       {
  *         code: "A000S",
  *         rank: 3, // display order
  *         shortCode: "S"
  *       },
  *       .
  *       .
  *       .
  *     ]
  *   },
  *   colorOrderList: Array [ // Each array element stores each color row
  *     {
  *       color: "Black",
  *       order: Array [ // Each array element stores each size variant (each size column)
  *         0,
  *         0,
  *         .
  *         .
  *         .
  *       ]
  *     },
  *     .
  *     .
  *     .
  *   ]
  * }
  */

export function setOrderList(orderList) {
  return {
    type: types.SET_ORDER_LIST,
    ...orderList
  }
}