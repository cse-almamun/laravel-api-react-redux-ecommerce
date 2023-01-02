import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Coponents/Footer/Footer";
import TopNavbar from "../Coponents/Header/TopNavbar";
import {
  LoginState,
  userLogin,
} from "../Features/UserAuthentication/LoginSlice";

function Login() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginForm;
  const { token } = useSelector(LoginState);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const inputChange = (e) => {
    e.preventDefault();
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const loginFormSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(loginForm));
  };

  useEffect(() => {
    if (token) {
      setLoginForm({ email: "", password: "" });
      navigate(from, { replace: true });
    }
  }, [token]);
  return (
    <Fragment>
      <TopNavbar />
      <Container>
        <div className="w-50 mx-auto my-5">
          <Card>
            <Card.Header>
              <h3 className="text-center">Login to your account</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={loginFormSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Your Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={inputChange}
                    placeholder="smith@example.com"
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={inputChange}
                    placeholder="*********"
                  ></Form.Control>
                </Form.Group>

                <div className="text-center">
                  <Button type="submit" variant="dark">
                    Login
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
      <Footer />
    </Fragment>
  );
}

export default Login;
