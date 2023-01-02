import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Registration from "./app/Pages/Registration";
import Home from "./app/Pages/HomePage/Home";
import PageNotFound from "./app/Pages/PageNotFound";
import Cart from "./app/Pages/Cart";
import Login from "./app/Pages/Login";
import Orders from "./app/Pages/Orders";
function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />
        <Route path="cart" element={<Cart />} />
        <Route path="orders" element={<Orders />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Fragment>
  );
}

export default App;
