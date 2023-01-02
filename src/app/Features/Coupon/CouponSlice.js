import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../Utils/axiosErrorHandler";
export const getAllCoupons = createAsyncThunk(
  "coupons/getAllCoupons",
  async () => {
    try {
      let { data: alldata } = await axios.get(
        "http://localhost:8000/api/coupon"
      );
      return alldata.data.coupons;
    } catch (error) {
      return axiosErrorHandler(error);
    }
  }
);

export const CouponSlice = createSlice({
  name: "coupons",
  initialState: { isLoading: true, coupons: {}, message: null },
  extraReducers: (builder) => {
    builder.addCase(getAllCoupons.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllCoupons.fulfilled, (state, action) => {
      state.isLoading = false;
      state.coupons = action.payload;
    });
    builder.addCase(getAllCoupons.rejected, (state, action) => {
      state.isLoading = false;
      state.coupons = {};
    });
  },
});
//export coupnn state
export const couponState = (state) => state.coupons;

export default CouponSlice.reducer;
