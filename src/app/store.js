import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import CartSlice from "./Features/Cart/CartSlice";
import AppliedCouponSlice from "./Features/Coupon/AppliedCouponSlice";
import CouponSlice from "./Features/Coupon/CouponSlice";
import OrderSlice from "./Features/Order/OrderSlice";
import ProductSlice from "./Features/Product/ProductSlice";
import LoginSlice from "./Features/UserAuthentication/LoginSlice";
import RegisterSlice from "./Features/UserAuthentication/RegisterSlice";
let initialState = {};
let store = configureStore(
  {
    reducer: {
      products: ProductSlice,
      carts: CartSlice,
      coupons: CouponSlice,
      appliedCoupon: AppliedCouponSlice,
      registration: RegisterSlice,
      auth: LoginSlice,
      orders: OrderSlice,
    },
  },
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

setupListeners(store.dispatch);

export default store;
