import React from "react";
import { Card, Table } from "react-bootstrap";

const index = ({ order }) => {
  const { total, discount, items } = order;
  const orderProducts = JSON.parse(items);
  return (
    <Card className="mb-4">
      <Card.Header>
        <div className="d-flex justify-content-between">
          <h3>Total Price: $ {total}</h3>
          <h3>Discount: $ {discount}</h3>
        </div>
      </Card.Header>

      <Card.Body>
        <Table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orderProducts &&
              orderProducts.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image} style={{ width: "40px" }} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{parseFloat(item.price) * parseInt(item.quantity)}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default index;
