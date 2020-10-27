import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'variantOrderList',
  initialState: { variantOrderList: [] },
  reducers: {
    setVariantOrderList: {
      reducer(state, action) {
        return { variantOrderList: action.payload.variantOrderList };
      },
      prepare(variantOrderList) {
        return { payload: { variantOrderList } }
      }
    }
  }
})

export const { setVariantOrderList } = slice.actions

export default slice.reducer
