import { useEffect, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Alert, Form, Button } from "react-bootstrap";
import CheckoutStep from "./CheckoutStep";
import { Store } from "../Store";

const Payment = () => {
  let navigate = useNavigate();

  const { state5, dispatch5, state3 } = useContext(Store);
  const { userInfo } = state3;

  const [paymentMethod, setPaymentMethod] = useState(
    state5.paymentMethod ? state5.paymentMethod : ""
  );
  console.log(state5.paymentMethod);

  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch5({
      type: "PAYMENT_METHOD",
      payload: paymentMethod,
    });
    localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  }, []);

  return (
    <>
      <CheckoutStep step1="true" step2="true" step3="true" />
      <Container className="w-25 border mt-5 p-3">
        <Link to="/shipping">
          <Button className="mb-3 w-100">Go To Shipping Page</Button>
        </Link>
        <Alert varriant="primary" className="text-center">
          <h5>Choose Payment Method</h5>
        </Alert>

        <Form onSubmit={handleSubmit}>
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

        <Button variant="primary" className="mt-3" onClick={handleSubmit}>
          Continue
        </Button>
      </Container>
    </>
  );
};

export default Payment;
