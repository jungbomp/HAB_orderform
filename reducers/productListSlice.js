import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'productList',
  initialState: { productList: [] },
  reducers: {
    setProductList: {
      reducer(state, action) {
        return { productList: action.payload.productList };
      },
      prepare(productList) {
        return { payload: { productList } }
      }
    }
  }
})


export const { setProductList } = slice.actions

export default slice.reducer
