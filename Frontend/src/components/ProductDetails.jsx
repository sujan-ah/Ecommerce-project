import { useState, useReducer, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Card,
  Col,
  Row,
  ListGroup,
  Badge,
  Button,
  Alert,
  Form,
} from "react-bootstrap";
import axios from "axios";
import Rating from "./Rating";
import ReactImageZoom from "react-image-zoom";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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

const ProductDetails = () => {
  const { state3 } = useContext(Store);
  const { userInfo } = state3;

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <FaArrowLeft />,
    nextArrow: <FaArrowRight />,
  };

  let params = useParams();

  const [relatedproduct, setRelatedproduct] = useState([]);
  const [cuponText, setCuponText] = useState("");
  const [errcupon, setErrcupon] = useState("");
  const [afterdiscountprice, setAfterdiscountprice] = useState("");
  const [ratingInfo, setRatingInfo] = useState("");
  const [number, setNumber] = useState("");

  const [{ loading, product, error }, dispatch] = useReducer(reducer, {
    loading: false,
    product: {},
    error: "",
  });

  useEffect(async () => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      if (userInfo) {
        if (userInfo.isAffiliate) {
          let product = await axios.get(
            `/products/${params.slug}?id=${userInfo._id}`
          );
          dispatch({ type: "FETCH_SUCCESS", payload: product.data });
        } else {
          let product = await axios.get(`/products/${params.slug}`);
          dispatch({ type: "FETCH_SUCCESS", payload: product.data });
        }
      }
      let product = await axios.get(`/products/${params.slug}`);
      dispatch({ type: "FETCH_SUCCESS", payload: product.data });

      let relatedproduct = await axios.get("/products");
      let filterItem = relatedproduct.data.filter(
        (item) =>
          item.catagory == product.data.catagory &&
          item.name !== product.data.name
      );
      setRelatedproduct(filterItem);
    } catch (err) {
      dispatch({ type: "FETCH_FAILS", payload: err.message });
    }
  }, [params.slug]);

  useEffect(async () => {
    let { data } = await axios.get(
      `/products/singleProRating/info/${product._id}`
    );
    setNumber(data.length);
    {
      data.map((item) => {
        if (item.userId == userInfo._id) {
          setRatingInfo(item.rating);
        }
      });
    }
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { cart } = state;

  let handleAddToCart = async () => {
    const existingItem = cart.cartItems.find(
      (item) => item._id === product._id
    );
    console.log(existingItem);
    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    ctxDispatch({
      type: "CART_ADD_ITEMS",
      payload: {
        ...product,
        price: afterdiscountprice ? afterdiscountprice : product.price,
        quantity,
      },
    });
  };

  let handleCuponText = (e) => {
    setCuponText(e.target.value);
  };

  let handleCupon = () => {
    console.log(product);
    if (product.cupon !== "") {
      if (product.cupon == cuponText) {
        let discountprice = (product.price * product.discount) / 100;
        let afterdiscountprice = product.price - discountprice;

        if (afterdiscountprice < product.discountlimit) {
          setErrcupon("For This price Discount not Applicable");
        } else {
          setAfterdiscountprice(afterdiscountprice);
        }
      } else {
        setErrcupon("Wrong Cupon Code");
      }
    } else {
      setErrcupon("not allow any cupon for this product");
    }
  };

  const props = {
    width: 400,
    height: 400,
    zoomPosition: "right",
    zoomWidth: 400,
    img: product.img,
  };

  return (
    <Container>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>

      <Row className="mt-3">
        {product ? (
          <>
            <Col lg={6}>{product.img && <ReactImageZoom {...props} />}</Col>

            <Col lg={3}>
              <Card style={{ width: "18rem" }}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h1>{product.name}</h1>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Rating rating={ratingInfo} numberofrating={number} />
                  </ListGroup.Item>

                  <ListGroup.Item>
                    {product.instock > 0 ? (
                      <h6>
                        Stock <Badge bg="success">{product.instock}</Badge>
                      </h6>
                    ) : (
                      <h6>
                        Stock <Badge bg="danger">{product.instock}</Badge>
                      </h6>
                    )}

                    <h4>{product.price}</h4>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <div
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>

            <Col lg={3}>
              <ListGroup>
                <ListGroup.Item>
                  <h5>
                    {afterdiscountprice ? (
                      <>
                        <h3>
                          Price: {""}
                          <del>${product.price}</del> ${afterdiscountprice}
                        </h3>
                      </>
                    ) : (
                      <h3>Price: ${product.price}</h3>
                    )}
                  </h5>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Form.Control
                    onChange={handleCuponText}
                    type="text"
                    placeholder="Enter email"
                  />

                  <Form.Text className="text-muted">{errcupon}</Form.Text>
                  <br />

                  <Button onClick={handleCupon} variant="info">
                    Apply
                  </Button>
                </ListGroup.Item>

                <ListGroup.Item>
                  {product.instock == 0 ? (
                    <Button onClick={handleAddToCart} variant="info">
                      Add to cart
                    </Button>
                  ) : (
                    <Link to={"/cartpage"}>
                      <Button
                        className="w-100"
                        onClick={handleAddToCart}
                        variant="info"
                      >
                        Add to cart
                      </Button>
                    </Link>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </>
        ) : (
          <Alert className="text-center mt-5" variant={"danger"}>
            Product not found pls try another product
          </Alert>
        )}
      </Row>

      <Row>
        <h2 className="mt-5"> Related Product</h2>

        {relatedproduct.length > 0 ? (
          <Slider {...settings}>
            {relatedproduct.map((item) => (
              <Card className="p-2" style={{ width: "18rem" }}>
                <Card.Img
                  style={{ height: 300 }}
                  variant="top"
                  src={item.img}
                />
                <Card.Body>
                  <Link to={`/products/${item.slug}`}>
                    <Card.Title>{item.name}</Card.Title>
                  </Link>
                  <Card.Text>
                    <div
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            ))}
          </Slider>
        ) : (
          <Alert variant="danger">No Related product found</Alert>
        )}
      </Row>
    </Container>
  );
};

export default ProductDetails;
