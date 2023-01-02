import React, { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Coponents/Footer/Footer";
import TopNavbar from "../Coponents/Header/TopNavbar";
import { getUserOrders, OrderState } from "../Features/Order/OrderSlice";
import { LoginState } from "../Features/UserAuthentication/LoginSlice";
import OrderCard from "../Coponents/OrderCard";

const Orders = () => {
  //redux selector
  const { token } = useSelector(LoginState);
  const { orders } = useSelector(OrderState);

  //dispatch form redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders(token));
  }, [dispatch, token]);

  return (
    <Fragment>
      <TopNavbar />

      <Container>
        <div className="my-3">
          <div className="text-center">
            <h3>Order History</h3>
            <div className="my-2">
              {orders &&
                orders.length > 0 &&
                orders.map((item) => <OrderCard key={item.id} order={item} />)}
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default Orders;
