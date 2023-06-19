import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const CheckoutStep = (props) => {
  return (
    <Container className="step mt-5">
      <Row>
        <Col>
          <h3 className={props.step1 ? "stepactive" : ""}>Sign In</h3>
        </Col>

        <Col>
          <h3 className={props.step2 ? "stepactive" : ""}>Shipping Address</h3>
        </Col>

        <Col>
          <h3 className={props.step3 ? "stepactive" : ""}>Payment</h3>
        </Col>

        <Col>
          <h3 className={props.step4 ? "stepactive" : ""}>Placeorder</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutStep;
