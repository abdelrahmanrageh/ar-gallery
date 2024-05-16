import { configureStore } from "@reduxjs/toolkit";
import shoppingCartReducer from "./slices/shoppingCartSlice";
import productsReducer from "./slices/productsSlice";
import dimensionsReducer from "./slices/dimensionsSlice";

export default configureStore({
    reducer: {
        shoppingCart: shoppingCartReducer,
        products: productsReducer,
        dimensions: dimensionsReducer
    }
})