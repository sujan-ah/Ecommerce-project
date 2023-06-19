import { useState, useEffect, useReducer, useContext } from "react";
import { Container, Row, Col, Dropdown, Card, Button } from "react-bootstrap";
import axios from "axios";
import { Store } from "../Store";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "FETCH_FAILS":
      return { ...state, loading: false, error: action.payload };
    default:
      return true;
  }
}

const Compare = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  let [singlePro, setSinglePro] = useState("");
  let [singlePro2, setSinglePro2] = useState("");

  const [{ loading, product, error }, dispatch] = useReducer(reducer, {
    loading: false,
    product: [],
    error: "",
  });
  useEffect(async () => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      let product = await axios.get("/products");
      dispatch({ type: "FETCH_SUCCESS", payload: product.data });
    } catch (err) {
      dispatch({ type: "FETCH_FAILS", payload: err.message });
    }
  }, []);

  let handleCompare = async (params) => {
    let product = await axios.get(`/products/${params}`);
    setSinglePro(product.data);
  };
  let handleCompare2 = async (params) => {
    let product = await axios.get(`/products/${params}`);
    setSinglePro2(product.data);
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
  };

  return (
    <Container>
      <Row>
        <Col lg={6}>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Choose Product
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {product.map((item) => (
                <Dropdown.Item onClick={() => handleCompare(item.slug)}>
                  <img className="cimg" src={item.img}></img>
                  {item.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Card className="mt-5">
            {singlePro ? (
              <div style={{ display: "flex", height: 220 }}>
                <Card.Img
                  variant="top"
                  src={singlePro.img}
                  style={{ width: 300 }}
                />
                <Card.Body>
                  <Card.Title>{singlePro.name}</Card.Title>
                  <Card.Text>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: singlePro.description,
                      }}
                    />
                    {singlePro.price}
                  </Card.Text>
                  {singlePro.instock == 0 ? (
                    <Button className="mt-3" variant="danger">
                      Out of Stock
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleAddToCart(singlePro)}
                      variant="info"
                    >
                      Add to Card
                    </Button>
                  )}
                </Card.Body>
              </div>
            ) : (
              <h1>Choose a Product</h1>
            )}
          </Card>
        </Col>

        <Col lg={6}>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Choose Product
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                {product.map((item) => (
                  <Dropdown.Item onClick={() => handleCompare2(item.slug)}>
                    <img className="cimg" src={item.img}></img>
                    {item.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Card className="mt-5">
            {singlePro2 ? (
              <div style={{ display: "flex", height: 220 }}>
                <Card.Img className="w-50" variant="top" src={singlePro2.img} />
                <Card.Body>
                  <Card.Title>{singlePro2.name}</Card.Title>
                  <Card.Text>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: singlePro2.description,
                      }}
                    />
                    {singlePro2.price}
                  </Card.Text>

                  {singlePro2.instock == 0 ? (
                    <Button className="mt-3" variant="danger">
                      Out of Stock
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleAddToCart(singlePro2)}
                      variant="info"
                    >
                      Add to Card
                    </Button>
                  )}
                </Card.Body>
              </div>
            ) : (
              <h1>Choose a Product</h1>
            )}
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col lg={7}>
          {singlePro && singlePro2 ? (
            singlePro.rating < singlePro2.rating ||
            (singlePro.rating == singlePro2.rating &&
              singlePro.price < singlePro2.price) ? (
              <>
                <h1 className="mt-5" style={{ color: "green", marginLeft: 48 }}>
                  It will be
                  <span style={{ color: "red" }}> best </span>
                  between two products
                </h1>
                <Card>
                  <div style={{ display: "flex", height: 220 }}>
                    <Card.Img
                      variant="top"
                      src={singlePro.img}
                      style={{ width: 300 }}
                    />
                    <Card.Body>
                      <Card.Title>{singlePro.name}</Card.Title>
                      <Card.Text>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: singlePro.description,
                          }}
                        />
                        {singlePro.price}
                      </Card.Text>
                      {singlePro.instock == 0 ? (
                        <Button className="mt-3" variant="danger">
                          Out of Stock
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleAddToCart(singlePro)}
                          variant="info"
                        >
                          Add to Card
                        </Button>
                      )}
                    </Card.Body>
                  </div>
                </Card>
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </Col>
        <Col lg={7}>
          {singlePro && singlePro2 ? (
            singlePro.rating > singlePro2.rating ||
            (singlePro.rating == singlePro2.rating &&
              singlePro.price > singlePro2.price) ? (
              <>
                <h1 className="mt-5" style={{ color: "green", marginLeft: 48 }}>
                  It will be
                  <span style={{ color: "red" }}> best </span>
                  between two products
                </h1>
                <Card>
                  <div style={{ display: "flex", height: 220 }}>
                    <Card.Img
                      className="w-50"
                      variant="top"
                      src={singlePro2.img}
                    />
                    <Card.Body>
                      <Card.Title>{singlePro2.name}</Card.Title>
                      <Card.Text>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: singlePro2.description,
                          }}
                        />
                        {singlePro2.price}
                      </Card.Text>

                      {singlePro2.instock == 0 ? (
                        <Button className="mt-3" variant="danger">
                          Out of Stock
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleAddToCart(singlePro2)}
                          variant="info"
                        >
                          Add to Card
                        </Button>
                      )}
                    </Card.Body>
                  </div>
                </Card>
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Compare;
