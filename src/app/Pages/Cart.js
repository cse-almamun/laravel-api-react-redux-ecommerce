import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartItemCard from "../Coponents/Cart/CartItemCard";
import Footer from "../Coponents/Footer/Footer";
import TopNavbar from "../Coponents/Header/TopNavbar";
import {
  subTotalPrice,
  discountAmmount,
  totalPrice,
} from "../Features/Cart/CartSelector";
import { cartState } from "../Features/Cart/CartSlice";
import { couponState } from "../Features/Coupon/CouponSlice";
import {
  appliedCoupnState,
  applyCoupon,
  removeCoupon,
} from "../Features/Coupon/AppliedCouponSlice";
import { LoginState } from "../Features/UserAuthentication/LoginSlice";
import { OrderState, submiutUserOrders } from "../Features/Order/OrderSlice";
function Cart() {
  //redux selector
  let state = useSelector((state) => state);
  const { isApplied } = useSelector(appliedCoupnState);
  const { carts } = useSelector(cartState);
  const { coupons } = useSelector(couponState);
  const { token } = useSelector(LoginState);
  const { orderSuccess } = useSelector(OrderState);

  //react use state
  const [discountCoupon, setDiscountCoupon] = useState("");
  const [couponAmount, setCouponAmount] = useState(0);

  //redux dispatch and
  const dispatch = useDispatch();

  //use navigation
  const navigate = useNavigate();

  const subTotal = subTotalPrice(state);
  const totalAmmount = totalPrice(state);
  const discount = discountAmmount(state);

  //apply coupon
  const applyCouponCode = (e) => {
    e.preventDefault();
    if (isApplied) {
      setDiscountCoupon("");
      dispatch(removeCoupon());
    } else {
      if (coupons.length > 0) {
        let coupon = coupons.find(
          (item) => item.code === discountCoupon.toUpperCase()
        );

        if (coupon) {
          if (coupon.type == "percent") {
            if (subTotal > 300) {
              dispatch(applyCoupon(coupon));
            } else {
              alert(
                "Coupon applicable only if your purchases amount is more than $300"
              );
            }
          } else if (coupon.type == "fixed") {
            if (subTotal > 1000) {
              dispatch(applyCoupon(coupon));
            } else {
              alert(
                "Coupon applicable only if your purchases amount is more than $1000"
              );
            }
          } else {
            setCouponAmount(0);
          }
        } else {
          alert("Innvalid Coupon");
        }
      }
    }
  };

  //checkout the order
  const checkoutOrder = (e) => {
    e.preventDefault();
    if (token) {
      let data = {
        formdata: {
          items: carts,
          subtotal: subTotal,
          coupon: discountCoupon,
          discount: parseFloat(discount),
          total: totalAmmount,
        },
        token: token,
      };

      dispatch(submiutUserOrders(data));
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (orderSuccess) {
      localStorage.removeItem("mycarts");
    }
  }, [dispatch, carts, couponAmount, subTotal, totalAmmount, orderSuccess]);

  return (
    <Fragment>
      <TopNavbar />
      <Container>
        <Row>
          {!carts && (
            <div className="w-100 my-5 text-center text-danger">
              <h3>
                You don't have any product in carts.{" "}
                <Link to="/" className="text-dark text-decoration-none">
                  {" "}
                  Go for shoping{" "}
                </Link>
              </h3>
            </div>
          )}
          {carts &&
            carts.map((c) => {
              return (
                <Col sm="12" lg="12" key={c.id}>
                  <CartItemCard item={c} />
                </Col>
              );
            })}
        </Row>

        {carts && (
          <div className="my-3">
            <Card className="my-3">
              <Card.Body>
                <div className="w-100">
                  <h5 className="align-middle d-flex">
                    Do you have any Coupon Code?{" "}
                    <input
                      type="text"
                      className="w-auto mx-2"
                      value={discountCoupon}
                      onChange={(e) => setDiscountCoupon(e.target.value)}
                    />{" "}
                    <Button
                      variant={isApplied ? "danger" : "dark"}
                      size="sm"
                      onClick={applyCouponCode}
                    >
                      {isApplied ? "Remove" : "Apply"}
                    </Button>
                  </h5>
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-around ">
                  <div className="w-100 align-middle">
                    <h5 className="align-middle d-inline">
                      Subtotal: ${subTotal}
                    </h5>
                  </div>
                  <div className="w-100 me-4">
                    <h5 className="align-middle d-flex">
                      Discount coupon amount: $ {discount}
                    </h5>
                  </div>
                  <div className="w-100 align-middle">
                    <h5 className="align-middle d-inline">
                      Total Price: ${totalAmmount.toFixed(2)}
                    </h5>
                  </div>
                  <div className="w-100 text-center">
                    <Button
                      variant="dark"
                      className="align-middle d-inline"
                      onClick={checkoutOrder}
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        )}
      </Container>
      <Footer />
    </Fragment>
  );
}

export default Cart;
