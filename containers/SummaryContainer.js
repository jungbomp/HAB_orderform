import { connect } from 'react-redux';
import { setScreen } from '../reducers/statusSlice';
import { setOrderList } from '../reducers/orderListSlice';

import screen from '../screens/SummaryScreen';

const mapStateToProps = state => ({
  orderList: state.orderList.orderList,
  employee: state.status.employee
});

const mapDispatchToProps = { setScreen, setOrderList }

export default connect(mapStateToProps, mapDispatchToProps)(screen);