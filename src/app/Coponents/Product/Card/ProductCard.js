import React, { Fragment } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCarts } from "../../../Features/Cart/CartSlice";
import "./ProductCard.css";
function ProductCard({ product }) {
  const { image, name, price } = product;

  const dispatch = useDispatch();

  //add the item to the cart
  const addToCart = (e) => {
    e.preventDefault();
    let item = {
      ...product,
      quantity: 1,
    };
    dispatch(addToCarts(item));
  };

  return (
    <Fragment>
      <Card className="custom-card">
        <Card.Img variant="top" className="" src={image} />
        <Card.Body className="text-center">
          <Card.Title className="fs-6">{name.slice(0, 30)} ...</Card.Title>
          <h5>${price}</h5>
          <Button variant="danger" onClick={addToCart}>
            Add To Cart
          </Button>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default ProductCard;
