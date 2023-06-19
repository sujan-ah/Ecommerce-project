import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Table, Badge } from "react-bootstrap";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const MyOrder = () => {
  let navigate = useNavigate();

  const { state3 } = useContext(Store);
  const { userInfo } = state3;

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    orders: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/mine/${userInfo._id}`, {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_SUCCESS", payload: err.message });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <Container>
      <Helmet>
        <title>Order History</title>
      </Helmet>

      <h1>Order History</h1>

      {loading ? (
        <h2>Loading....</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Payment Method</th>
              <th>TOTAL</th>
              <th>PAID</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>
                  {item.orderItems.map((item) => (
                    <Badge bg="secondary ms-2">{item.name}</Badge>
                  ))}
                </td>
                <td>{item.paymentMethod}</td>
                <td>{item.totalPrice}</td>
                <td>{item.ispaid ? "Paid" : "Unpaid"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default MyOrder;
