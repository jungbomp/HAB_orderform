import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'brandList',
  initialState: { brandList: [], vendorList: [] },
  reducers: {
    setBrandList: {
      reducer(state, action) {
        return { brandList: action.payload.brandList, vendorList: action.payload.vendorList };
      },
      prepare(brandList, vendorList) {
        return { payload: { brandList, vendorList } }
      }
    }
  }
})


export const { setBrandList } = slice.actions

export default slice.reducer
