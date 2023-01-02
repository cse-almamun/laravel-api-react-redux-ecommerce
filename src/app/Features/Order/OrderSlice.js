import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../Utils/axiosErrorHandler";

//fetch user orders
export const getUserOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (token) => {
    try {
      let options = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data: all } = await axios.get(
        "http://laravelapi.almamun.me/api/order",
        options
      );
      console.log(all);
      return all.data;
    } catch (error) {
      return axiosErrorHandler(error);
    }
  }
);

//post user orders
export const submiutUserOrders = createAsyncThunk(
  "orders/postOrders",
  async ({ formdata, token }) => {
    try {
      let options = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      let { data } = await axios.post(
        "http://laravelapi.almamun.me/api/order",
        formdata,
        options
      );
      console.log(data);
      return data;
    } catch (error) {
      return axiosErrorHandler(error);
    }
  }
);

export const OrderSlice = createSlice({
  name: "Orders",
  initialState: { isLoading: false, orders: [], orderSuccess: false },
  extraReducers: (builder) => {
    //fetch order builders
    builder.addCase(getUserOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload.orders;
    });
    builder.addCase(getUserOrders.rejected, (state) => {
      state.isLoading = false;
      state.orders = [];
    });

    //create user orders
    builder.addCase(submiutUserOrders.pending, (state) => {
      state.isLoading = true;
      state.orderSuccess = false;
    });
    builder.addCase(submiutUserOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderSuccess = true;
    });
    builder.addCase(submiutUserOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.orderSuccess = false;
    });
  },
});

//export state
export const OrderState = (state) => state.orders;

export default OrderSlice.reducer;
