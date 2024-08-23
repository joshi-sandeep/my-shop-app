// src/slices/orderSlice.js

// https://chatgpt.com/share/50954ccb-0169-431e-85a9-1c6bf0692a97

// https://chatgpt.com/share/50954ccb-0169-431e-85a9-1c6bf0692a97
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching orders
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    const response = await axios.get('http://localhost:4000/order/');
    return response.data;
});

// Create slice
const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.map(order => ({
                    ...order,
                    orderdate: new Date(order.orderdate)
                }));
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default orderSlice.reducer;
