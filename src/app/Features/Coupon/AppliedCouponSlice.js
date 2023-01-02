import { createSlice } from "@reduxjs/toolkit";
import App from "../../../App";

export const AppliedCouponSlice = createSlice({
  name: "appliedCoupon",
  initialState: { isApplied: false, coupon: {} },
  reducers: {
    applyCoupon: (state, action) => {
      state.isApplied = true;
      state.coupon = action.payload;
    },
    removeCoupon: (state) => {
      state.isApplied = false;
      state.coupon = {};
    },
  },
});
export const appliedCoupnState = (state) => state.appliedCoupon;
export const { applyCoupon, removeCoupon } = AppliedCouponSlice.actions;
export default AppliedCouponSlice.reducer;
