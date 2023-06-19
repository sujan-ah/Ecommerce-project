import React, { useContext, useState, useEffect, useReducer } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  ListGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import CheckoutStep from "./CheckoutStep";
import { toast } from "react-toastify";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
  }
};

const Placeorder = () => {
  let navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const {
    state,
    dispatch: ctxdispatch,
    state4,
    dispatch4,
    state5,
    dispatch5,
    state3,
  } = useContext(Store);
  const { userInfo } = state3;

  const [paymentMethod, setPaymentMethod] = useState(
    state5.paymentMethod ? state5.paymentMethod : ""
  );

  const [fullname, setFullname] = useState(
    state4.shippingaddress.fullname || ""
  );
  const [address, setAddress] = useState(state4.shippingaddress.address || "");
  const [city, setCity] = useState(state4.shippingaddress.city || "");
  const [postcode, setPostcode] = useState(
    state4.shippingaddress.postcode || ""
  );
  const [country, setCountry] = useState(state4.shippingaddress.country || "");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let handleSubmit = (e) => {
    e.preventDefault();
    if (!fullname || !address || !city || !postcode || !country) {
      toast.error("Please Fill The All field");
    } else if (city === country) {
      toast.error("City & Country Have To Be Different Name");
    } else {
      dispatch4({
        type: "SHIPPING_ADDRESS",
        payload: {
          fullname,
          address,
          city,
          postcode,
          country,
        },
      });
      localStorage.setItem(
        "shippingaddress",
        JSON.stringify({
          fullname,
          address,
          city,
          postcode,
          country,
        })
      );
    }
    setShow(false);
  };
  const [pshow, setPShow] = useState(false);

  const handlePClose = () => setPShow(false);
  const handlePShow = () => setPShow(true);

  let handlePaymentSubmit = (e) => {
    e.preventDefault();
    dispatch5({
      type: "PAYMENT_METHOD",
      payload: paymentMethod,
    });
    localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
    setPShow(false);
  };
  let [total, setTotal] = useState("");
  let [dcharge, setDcharge] = useState("");
  let [tax, setTax] = useState("");
  let [totalprice, setTotalprice] = useState("");

  useEffect(() => {
    let total = state.cart.cartItems.reduce(
      (accumulator, current) => accumulator + current.price * current.quantity,
      0
    );
    setTotal(total);

    let dcharge = total < 500 ? 10 : 0;
    setDcharge(dcharge);

    let tax = total < 500 ? 0 : (total * 5) / 100;
    setTax(tax);

    let totalprice =
      total + (total < 500 ? 0 : (total * 5) / 100) + (total < 500 ? 10 : 0);
    setTotalprice(totalprice);
  }, [state.cart.cartItems]);

  let handlePlaceOrder = async () => {
    try {
      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: state.cart.cartItems,
          shippingaddress: state4.shippingaddress,
          paymentMethod: state5.paymentMethod,
          productPrice: total,
          shippingPrice: 0,
          taxPrice: total < 500 ? 0 : (total * 5) / 100,
          totalPrice:
            total +
            (total < 500 ? 0 : (total * 5) / 100) +
            (total < 500 ? 10 : 0),
          userId: userInfo._id,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      console.log(data);
      ctxdispatch({ type: "CLEAR_CART" });
      localStorage.removeItem("cartItems");
      dispatch({ type: "CREATE_SUCCESS" });
      navigate(`/orders/${data.order._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(err);
    }

    let { data } = await axios.post("/products/affiliatedata", {
      /* AffiliateInfo HW */ userId: userInfo._id,
      pro: state.cart.cartItems,
    });
  };

  return (
    <Container>
      <CheckoutStep step1="true" step2="true" step3="true" step4="true" />
      <h1>Preview Order</h1>
      <Row>
        <Col lg={8}>
          {/* Shipping */}
          <Card className="mt-5">
            <Card.Body>
              <Card.Title>Shipping Address</Card.Title>
              <hr />
              <Card.Text>
                <b>Name:</b> {state4.shippingaddress.fullname} <br />
                <b>Address:</b> {state4.shippingaddress.address} <br />
                <b>City:</b> {state4.shippingaddress.city} <br />
                <b>Postal Code:</b> {state4.shippingaddress.postcode} <br />
                <b>Country:</b> {state4.shippingaddress.country}
              </Card.Text>
              <Button variant="primary" onClick={handleShow}>
                Edit
              </Button>
            </Card.Body>
          </Card>

          {/* Payment */}
          <Card className="mt-5">
            <Card.Body>
              <Card.Title>Payment Method</Card.Title>
              <hr />
              <Card.Text>
                <b>Payment Method:</b> {state5.paymentMethod}
              </Card.Text>
              <Button variant="primary" type="submit" onClick={handlePShow}>
                Edit
              </Button>
            </Card.Body>
          </Card>

          <Card className="mt-5">
            <Card.Body>
              <Card.Title>Order Item</Card.Title>
              <hr />
              <Card.Text>
                <b>Total Item:</b> {state.cart.cartItems.length}
                <ListGroup className="mt-3">
                  {state.cart.cartItems.map((item) => (
                    <ListGroup.Item>
                      <img
                        src={item.img}
                        style={{ width: 50 }}
                        className="me-4"
                      />
                      {item.name}
                      <b className="ms-4">Quantity:</b> {item.quantity}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Text>
              <Button variant="primary" type="submit">
                Edit
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="mt-5">
            <Card.Body>
              <Card.Title>Payment Summary</Card.Title>
              <hr />
              <Card.Text>
                <ListGroup.Item>
                  <b>Product Price: ${total} </b>
                </ListGroup.Item>

                <ListGroup.Item>
                  <b>Delivery Charge:${dcharge} </b>
                </ListGroup.Item>

                <ListGroup.Item>
                  <b>Tax:${tax}</b>
                </ListGroup.Item>

                <ListGroup.Item>
                  <b>Total Price:${totalprice}</b>
                </ListGroup.Item>
              </Card.Text>
              <Button
                variant="primary"
                type="submit"
                onClick={handlePlaceOrder}
              >
                Place order
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/*Shipping */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shipping Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                <h6>Full Name</h6>
              </Form.Label>
              <Form.Control
                onChange={(e) => setFullname(e.target.value)}
                type="text"
                placeholder="Write your Full Name"
                value={fullname}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                <h6>Adress</h6>
              </Form.Label>
              <Form.Control
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Address"
                value={address}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                <h6>City</h6>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                <h6>Postal Code</h6>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Postal Code"
                onChange={(e) => setPostcode(e.target.value)}
                value={postcode}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                <h6>Country</h6>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                onChange={(e) => setCountry(e.target.value)}
                value={country}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="success" onClick={handleSubmit}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Payment */}
      <Modal show={pshow} onHide={handlePClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePaymentSubmit}>
            <Form.Check
              type="radio"
              id="paypal"
              label="Paypal"
              value="Paypal"
              checked={paymentMethod == "Paypal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type="radio"
              id="strip"
              label="Strip"
              value="Strip"
              checked={paymentMethod == "Strip"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type="radio"
              id="sslcommerz"
              label="SSLcommerz"
              value="SSLcommerz"
              checked={paymentMethod == "SSLcommerz"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePaymentSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Placeorder;
