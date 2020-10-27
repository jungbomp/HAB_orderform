import { connect } from 'react-redux';
import { setProductList } from '../reducers/productListSlice';
import { setScreen, setBrand } from '../reducers/statusSlice';

import screen from '../screens/BrandListScreen';

const mapStateToProps = state => ({
  brandList: state.brandList.brandList,
  vendorList: state.brandList.vendorList
})

const mapDispatchToProps = { setBrand, setProductList, setScreen }

export default connect(mapStateToProps, mapDispatchToProps)(screen);