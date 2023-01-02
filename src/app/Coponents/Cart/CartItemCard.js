import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFormCart,
} from "../../Features/Cart/CartSlice";

function CartItemCard({ item }) {
  //destruct the item value
  const { name, price, quantity } = item;

  //import redux dispatch
  const dispatch = useDispatch();

  //increase quantity
  const increaseItemQuantity = (e) => {
    e.preventDefault();
    dispatch(increaseQuantity(item));
  };
  //decrease the item quantity
  const decreaseItemQunaity = (e) => {
    e.preventDefault();
    dispatch(decreaseQuantity(item));
  };
  //remove item form cart
  const removeItem = (e) => {
    e.preventDefault();
    dispatch(removeFormCart(item));
  };
  let content = "";
  if (item) {
    return (content = (
      <Card className="my-2">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div className="w-100 fs-4">{name ? name.slice(0, 20) : ""}...</div>
            <div className="d-flex w-100 justify-content-center">
              <button
                className="btn btn-sm btn-dark fs-6 me-3 text-center"
                onClick={decreaseItemQunaity}
              >
                <FaMinus />
              </button>
              <span className="fs-4">{quantity}</span>
              <button
                className="btn btn-sm btn-dark fs-6 ms-3 text-center"
                onClick={increaseItemQuantity}
              >
                <FaPlus />
              </button>
            </div>
            <div className="w-100 text-center">
              <span className="fs-5">
                $
                {price ? parseFloat(price) * parseInt(quantity).toFixed(2) : ""}
              </span>
            </div>
            <div className="w-100 text-center">
              <Button variant="danger" onClick={removeItem}>
                Remove
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    ));
  }
  return { content };
}

export default CartItemCard;
