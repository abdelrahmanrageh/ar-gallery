import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        return data;
    }
)
export const fetchProduct  = createAsyncThunk(
    'products/fetchProduct',
        async (productId) => {
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
            const data = await response.json();
            return data;
        }
    
)

export const productsSlice = createSlice({
    initialState: { products: [], loading: true, searchValue:  ''},
    name: 'products',
    reducers: {
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        })
        
    }
});
export const { setSearchValue } = productsSlice.actions;
export default productsSlice.reducer;