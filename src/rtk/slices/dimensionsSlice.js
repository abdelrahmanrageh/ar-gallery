import { createSlice } from "@reduxjs/toolkit";

export const dimensionsSlice = createSlice({
  initialState: { dimensions: { ProductsScroll: 0 } },
  name: "dimensions",
  reducers: {
    setProductsScroll: (state, action) => {
      state.dimensions.ProductsScroll = action.payload;
    },
  },
});

export const { setProductsScroll } = dimensionsSlice.actions;
export default dimensionsSlice.reducer;
