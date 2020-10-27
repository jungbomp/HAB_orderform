import { connect } from 'react-redux';
import { setScreen } from '../reducers/statusSlice';
import { setOrderList } from '../reducers/orderListSlice';

import screen from '../screens/QuantityScreen';

const mapStateToProps = state => ({
  brand: state.status.brand,
  product: state.status.product,
  productVariantList: state.productVariantList.productVariantList,
  orderList: state.orderList.orderList,
});

const mapDispatchToProps = { setScreen, setOrderList }

export default connect(mapStateToProps, mapDispatchToProps)(screen);