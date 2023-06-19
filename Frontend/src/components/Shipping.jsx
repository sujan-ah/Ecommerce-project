import { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
import CheckoutStep from "./CheckoutStep";
import { toast } from "react-toastify";

const Shipping = () => {
  let navigate = useNavigate();
  const { state4, dispatch4, state3 } = useContext(Store);
  const { userInfo } = state3;

  const [fullname, setFullname] = useState(
    state4.shippingaddress.fullname || ""
  );
  const [address, setAddress] = useState(state4.shippingaddress.address || "");
  const [city, setCity] = useState(state4.shippingaddress.city || "");
  const [postcode, setPostcode] = useState(
    state4.shippingaddress.postcode || ""
  );
  const [country, setCountry] = useState(state4.shippingaddress.country || "");

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
      navigate("/payment");
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutStep step1="true" step2="true" />

      <Container className="w-25 border mt-5 p-3">
        <Alert varriant="primary" className="text-center">
          <h1>Shipping Address</h1>
        </Alert>
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

          <Button type="submit" variant="success">
            Continue
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Shipping;
