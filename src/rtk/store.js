import { configureStore } from "@reduxjs/toolkit";
import shoppingCartReducer from "./slices/shoppingCartSlice";
import productsReducer from "./slices/productsSlice";
import dimensionsReducer from "./slices/dimensionsSlice";
import userReducer from "./slices/userSlice";
// import thunk from 'redux-thunk';

export default configureStore({
    reducer: {
        shoppingCart: shoppingCartReducer,
        products: productsReducer,
        dimensions: dimensionsReducer,
        user: userReducer
    },
    // middleware: [thunk]
})