import { connect } from 'react-redux';
import { setScreen, setBrand, setProduct } from '../reducers/statusSlice';
import { setProductList } from '../reducers/productListSlice';
import { setProductVariantList } from '../reducers/productVariantListSlice';

import screen from '../screens/ProductListScreen';

const mapStateToProps = state => ({
  brand: state.status.brand,
  brandList: state.brandList.brandList,
  vendorList: state.brandList.vendorList,
  productList: state.productList.productList
})


const mapDispatchToProps = { setProduct, setScreen, setBrand, setProductList, setProductVariantList }

export default connect(mapStateToProps, mapDispatchToProps)(screen);