import { createSlice } from "@reduxjs/toolkit";

export const shoppingCartSlice = createSlice({
    initialState: {
        cart: JSON.parse(localStorage.getItem('cart')) || {}
        , openShoppingCart: false, totalPrice: 0
    },
    name: 'shoppingCart',
    reducers: {
        toggleCart: (state) => {
            state.openShoppingCart = !state.openShoppingCart;
        },
        addTocart: (state, action) => {
            const { _id, title, price, images, } = action.payload;
            if (state.cart[_id]) {
                state.cart[_id].quantity += 1;
            } else {
                state.cart[_id] = { _id , title, price, quantity: 1 ,images};
            }
            window.localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeFromCart: (state, action) => {
            const _id = action.payload;
            if (state.cart[_id]) {
                // if (state.cart[_id].quantity > 1) {
                //     // state.cart[_id].quantity -= 1;
                // } else {
                    delete state.cart[_id];
                // }
            }
            window.localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        clearCart: (state) => { 
            state.cart = {};
            window.localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        changeQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            if (state.cart[id]) {
                state.cart[id].quantity = quantity;
            }
            window.localStorage.setItem('cart', JSON.stringify(state.cart));
        }
        ,
        getTotalPrice: (state) => {
            state.totalPrice = Object.values(state.cart).reduce((acc, item) => {
                return acc + item.price * item.quantity;
            },0)
        }

    }
});
export const { toggleCart , addTocart , removeFromCart , getTotalPrice , changeQuantity , clearCart} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;