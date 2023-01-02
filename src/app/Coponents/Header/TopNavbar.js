import React, { Fragment } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LoginState,
  userLogout,
} from "../../Features/UserAuthentication/LoginSlice";

function TopNavbar() {
  const { token } = useSelector(LoginState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    dispatch(userLogout(token));
    navigate("/");
  };
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <NavLink to={"/"} className={"navbar-brand"}>
          Shop Now
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to={"/"} className="nav-link">
              Home
            </NavLink>

            {token == null ? (
              <Fragment>
                <NavLink to={"/login"} className="nav-link">
                  Login
                </NavLink>
                <NavLink to={"/register"} className="nav-link">
                  Join
                </NavLink>
              </Fragment>
            ) : (
              <Fragment>
                <NavLink to={"/orders"} className="nav-link">
                  Orders
                </NavLink>
                <NavLink to={"/logut"} className="nav-link" onClick={logout}>
                  Logout
                </NavLink>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
