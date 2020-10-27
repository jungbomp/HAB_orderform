import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'status',
  initialState: { employee: null, screen: "brandList", brand: null, product: null },
  reducers: {
    setEmployee(state, action) {
      return { ...state, employee: action.payload }
    },
    setScreen(state, action) {
      return { ...state, screen: action.payload }
    },
    setBrand(state, action) {
      return { ...state, brand: action.payload }
    },
    setProduct(state, action) {
      return { ...state, product: action.payload }
    }
  }
})


export const { setEmployee, setScreen, setBrand, setProduct } = slice.actions

export default slice.reducer
