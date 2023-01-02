import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Coponents/Footer/Footer";
import TopNavbar from "../Coponents/Header/TopNavbar";
import {
  RegistrationState,
  userRegistration,
} from "../Features/UserAuthentication/RegisterSlice";

function Registration() {
  const [joinForm, setJoinForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const { name, email, password, password_confirmation } = joinForm;

  const { token, user } = useSelector(RegistrationState);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  //on form change
  const inputOnchange = (e) => {
    e.preventDefault();
    setJoinForm({ ...joinForm, [e.target.name]: e.target.value });
  };

  //registratoin form submit
  const registerFormSubmit = (e) => {
    e.preventDefault();

    dispatch(userRegistration(joinForm));

    console.log(joinForm);
  };

  useEffect(() => {}, [token]);

  useEffect(() => {
    console.log(token);
    if (token) {
      navigate(from, { replace: true });
    }
    if (user) {
      setJoinForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
    }
  }, [dispatch, user, token]);

  return (
    <Fragment>
      <TopNavbar />
      <Container>
        <div className="w-50 mx-auto my-5">
          <Card>
            <Card.Header>
              <h3 className="text-center">Join With Us</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={registerFormSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    placeholder="John Smith"
                    onChange={inputOnchange}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Your Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    placeholder="smith@example.com"
                    onChange={inputOnchange}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    placeholder="*********"
                    onChange={inputOnchange}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password_confirmation"
                    value={password_confirmation}
                    placeholder="*********"
                    onChange={inputOnchange}
                    required
                  ></Form.Control>
                </Form.Group>
                <div className="text-center">
                  <Button type="submit" variant="dark">
                    Register
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

export default Registration;
