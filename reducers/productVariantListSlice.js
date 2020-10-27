import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'productVariantList',
  initialState: { productVariantList: [] },
  reducers: {
    setProductVariantList: {
      reducer(state, action) {
        return { productVariantList: action.payload.productVariantList };
      },
      prepare(productVariantList) {
        return { payload: { productVariantList } }
      }
    }
  }
})


export const { setProductVariantList } = slice.actions

export default slice.reducer
