import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Row,
  Col,
  Alert,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import { Store } from "../Store";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  let navigate = useNavigate();

  const [cuponText, setCuponText] = useState("");
  const [errcupon, setErrcupon] = useState("");
  const [afterdiscountprice, setAfterdiscountprice] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  let updateCart = (item, quantity) => {
    ctxDispatch({
      type: "CART_ADD_ITEMS",
      payload: { ...item, quantity },
    });
  };

  let handleRemoveItem = (item) => {
    ctxDispatch({
      type: "CART_REMOVE_ITEMS",
      payload: item,
    });
  };

  let handleCheckOut = () => {
    navigate("/signin?redirect=/shipping");
  };

  let handleCuponText = (e) => {
    setCuponText(e.target.value);
  };

  let handleCupon = () => {
    {
      cartItems.map((item) => {
        if (item.allcupon == cuponText) {
          let discountprice =
            (item.price * item.quantity * item.discount) / 100;
          let afterdiscountprice = item.price * item.quantity - discountprice;
          setAfterdiscountprice(afterdiscountprice);
        } else {
          setErrcupon("Wrong Cupon Code");
        }
      });
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>

      <Row>
        <Col lg={8}>
          {cartItems.length < 0 ? (
            <Alert variant="danger">Cart is Empty</Alert>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item>
                  <Row>
                    <Col lg={4}>
                      <img width="50" src={item.img}></img>
                      <Link to={`/products/${item.slug}`}>{item.name}</Link>
                    </Col>

                    <Col lg={3}>
                      <Button
                        onClick={() =>
                          updateCart(item, item.quantity + 1)
                        } /* class 47  Cart + Part */
                        disabled={item.quantity === item.instock}
                        variant="success"
                      >
                        +
                      </Button>

                      <span>{item.quantity}</span>

                      <Button
                        onClick={() => updateCart(item, item.quantity - 1)}
                        disabled={item.quantity === 1}
                        variant="success"
                      >
                        -
                      </Button>
                    </Col>

                    <Col lg={3}>
                      <Button
                        onClick={() => handleRemoveItem(item)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col lg={4}>
          <ListGroup>
            <ListGroup.Item>
              <h1>
                Total (
                {cartItems.reduce(
                  (accumulator, current) => accumulator + current.quantity,
                  0
                )}
                ) Products
              </h1>

              {errcupon == "" ? (
                <>
                  {afterdiscountprice ? (
                    <h3>
                      Price: $
                      <del>
                        {cartItems.reduce(
                          (accumulator, current) =>
                            accumulator + current.price * current.quantity,
                          0
                        )}
                      </del>{" "}
                      {cartItems.reduce(
                        (accumulator, current) =>
                          accumulator + current.price * current.quantity,
                        0
                      ) >= 1000
                        ? cartItems.reduce(
                            (accumulator, current) =>
                              accumulator + current.price * current.quantity,
                            0
                          ) -
                          cartItems.reduce(
                            (accumulator, current) =>
                              accumulator +
                              (current.price *
                                current.quantity *
                                current.alldiscount) /
                                100,
                            0
                          )
                        : setErrcupon("For This price Discount not Applicable")}
                    </h3>
                  ) : (
                    <h3>
                      Price $
                      {cartItems.reduce(
                        (accumulator, current) =>
                          accumulator + current.price * current.quantity,
                        0
                      )}
                    </h3>
                  )}
                </>
              ) : (
                <h3>
                  Price $
                  {cartItems.reduce(
                    (accumulator, current) =>
                      accumulator + current.price * current.quantity,
                    0
                  )}
                </h3>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <Form.Control
                className="mt-2"
                onChange={handleCuponText}
                type="text"
                placeholder="text"
              />
              <Form.Text className="text-muted">{errcupon}</Form.Text>
              <br />
              <Button className=" mb-2" onClick={handleCupon} variant="info">
                Apply
              </Button>
            </ListGroup.Item>
          </ListGroup>

          <Button
            onClick={handleCheckOut}
            className="w-100 mt-2"
            variant="primary"
          >
            Payment
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
