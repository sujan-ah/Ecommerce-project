import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col, Alert, ListGroup, Button } from "react-bootstrap";
import { Store } from "../Store";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const WishList = () => {
  const { state, dispatch: ctxDispatch, state2, dispatch2 } = useContext(Store);

  const {
    wishlist: { wishlistItems },
  } = state2;
  const { cart } = state;

  let handleRemoveItem = (item) => {
    dispatch2({
      type: "WISHLIST_REMOVE_ITEMS",
      payload: item,
    });
  };

  let handleAddToCart = async (product) => {
    const existingItem = cart.cartItems.find(
      (item) => item._id === product._id
    );
    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    const { data } = await axios.get(`/cartproduct/${product._id}`);
    if (data.instock < quantity) {
      window.alert(`${product.name} out of stock`);
      return;
    }

    ctxDispatch({
      type: "CART_ADD_ITEMS",
      payload: { ...product, quantity },
    });

    dispatch2({
      type: "WISHLIST_REMOVE_ITEMS",
      payload: product,
    });
  };

  return (
    <Container>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      <h1>Shopping Cart</h1>

      <Row>
        <Col lg={8}>
          {wishlistItems.length < 0 ? (
            <Alert variant="danger">Wishlist is Empty</Alert>
          ) : (
            <ListGroup>
              {wishlistItems.map((item) => (
                <ListGroup.Item>
                  <Row>
                    <Col lg={3}>
                      <img width="50" src={item.img}></img>
                      <Link to={`/products/${item.slug}`}>{item.name}</Link>
                    </Col>

                    <Col lg={3}>
                      <h4 className="mt-3">Price: {item.price}</h4>
                    </Col>

                    <Col lg={3}>
                      <Button
                        className="mt-3"
                        onClick={() => handleRemoveItem(item)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </Col>

                    <Col lg={3}>
                      <Button
                        className="mt-3"
                        onClick={() => handleAddToCart(item)}
                        variant="info"
                      >
                        Add to Card
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default WishList;
