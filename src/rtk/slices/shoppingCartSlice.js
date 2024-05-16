import { createSlice } from "@reduxjs/toolkit";

export const shoppingCartSlice = createSlice({
    initialState: { cart: {}, openShoppingCart: false , totalPrice: 0},
    name: 'shoppingCart',
    reducers: {
        toggleCart: (state) => {
            state.openShoppingCart = !state.openShoppingCart;
        },
        addTocart: (state, action) => {
            const { id, title, price, image, } = action.payload;
            if (state.cart[id]) {
                state.cart[id].quantity += 1;
            } else {
                state.cart[id] = { id , title, price, quantity: 1 ,image};
            }
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            if (state.cart[id]) {
                if (state.cart[id].quantity > 1) {
                    state.cart[id].quantity -= 1;
                } else {
                    delete state.cart[id];
                }
            }
        },
        clearCart: (state) => { 
            state.cart = {};
        },
        changeQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            if (state.cart[id]) {
                state.cart[id].quantity = quantity;
            }
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