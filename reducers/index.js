import { combineReducers } from 'redux';
import brandListReducer from './brandListSlice';
import orderListReducer from './orderListSlice';
import productReducer from './productListSlice';
import productVariantReducer from './productVariantListSlice';
import statusReducer from './statusSlice';

export default combineReducers({
    brandList: brandListReducer,
    orderList: orderListReducer,
    productList: productReducer,
    productVariantList: productVariantReducer,
    status: statusReducer,
});
