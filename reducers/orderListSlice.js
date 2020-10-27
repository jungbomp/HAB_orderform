import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'orderList',
  initialState: { orderList: [] },
  reducers: {
    setOrderList: {
      reducer(state, action) {
        return { orderList: action.payload.orderList };
      },
      prepare(orderList) {
        return { payload: { orderList } }
      }
    }
  }
})

export const { setOrderList } = slice.actions

export default slice.reducer
