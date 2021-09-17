import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  status: "loading",
  orderData: [],
};
const url = "http://localhost:5000/api/order/";
export const fetchOrders = createAsyncThunk(
  "orders/getOrders",
  async (payload) => {
    const data = await axios.post(`${url}fetch`, payload);
    return data;
  }
);
const orderReducer = createSlice({
  name: "Orders",
  initialState,
  extraReducers: {
    [fetchOrders.pending]: (state) => {
      state.status = "loading";
    },
    [fetchOrders.fulfilled]: (state, action) => {
      console.log(action);
      state.status = "succeeded";
      state.orderData.push(...action.payload.data);
    },
    [fetchOrders.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

export default orderReducer.reducer;
