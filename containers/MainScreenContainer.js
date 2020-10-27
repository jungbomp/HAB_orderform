import { connect } from 'react-redux';
import { setBrandList } from '../reducers/brandListSlice';
import { setEmployee, setScreen } from '../reducers/statusSlice';

import screen from '../screens/MainScreen';

const mapStateToProps = state => ({
  screen: state.status.screen,
  productList: state.productList.productList,
  productVariantList: state.productVariantList.productVariantList,
  orderList: state.orderList.orderList,
})

const mapDispatchToProps = { setEmployee, setScreen, setBrandList }

export default connect(mapStateToProps, mapDispatchToProps)(screen);