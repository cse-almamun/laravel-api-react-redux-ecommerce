import { createSelector } from "@reduxjs/toolkit";

export const cartsItem = (state) => state.carts.carts;
export const coupon = (state) => state.appliedCoupon.coupon;

//count total cart prouduct quantity
export const totalCartItem = createSelector(cartsItem, (items) => {
  //items.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);
  let total = 0;
  if (items) {
    items.map((i) => (total += i.quantity));
  }
  return total;
});

//calculate subtotal proudct price
export const subTotalPrice = createSelector(cartsItem, (items) => {
  let total = 0;
  if (items) {
    items.map((i) => (total += i.price * i.quantity));
  }
  return total.toFixed(2);
});

export const discountAmmount = createSelector(
  coupon,
  subTotalPrice,
  (item, subtotal) => {
    let amount = 0.0;
    if (!isEmptyObject(item)) {
      if (item.type === "percent") {
        if (subtotal > 300) {
          amount = subtotal * (item.value / 100);
        }
      } else if (item.type === "fixed") {
        if (subtotal > 1000) {
          amount = parseFloat(item.value);
        }
      } else {
        return;
      }
    }
    return amount.toFixed(2);
  }
);

//count total cart price including tax
export const totalPrice = createSelector(
  subTotalPrice,
  discountAmmount,
  (subtotal, discount) => parseFloat(subtotal) - parseFloat(discount)
);

const isEmptyObject = (item) => {
  return item && Object.keys(item).length === 0 && item.constructor === Object;
};
