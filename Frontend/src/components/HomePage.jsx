import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Button,
  Modal,
  ListGroup,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import axios from "axios";

const HomePage = () => {
  const [show, setShow] = useState(false);
  const [discountimg, setDiscountimg] = useState(false);
  const [catagory, setCatagory] = useState([]);
  const [catagoryproduct, setCatagoryproduct] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let catarr = [];

  useEffect(async () => {
    const { data } = await axios.get(`./discount`);
    setDiscountimg(data.img);
    // setShow(true)

    let product = await axios.get("/products");
    product.data.map((item) => {
      if (catarr.indexOf(item.catagory) == -1) {
        catarr.push(item.catagory);
      }
    });
    setCatagory(catarr);
  }, []);

  let handleCatagory = async (catagory) => {
    let catagoryproduct = await axios.get(`/products/catagory/${catagory}`);
    setCatagoryproduct(catagoryproduct.data);
  };

  return (
    <>
      <Helmet>
        <title>Dvaly</title>
      </Helmet>

      <div className="banner">
        <img
          className="banner-img"
          style={{ height: 500, width: "100%" }}
          src="/images/banner.jpg"
        />

        <Container>
          <div className="cat-container">
            <div className="cat">
              <ListGroup>
                {catagory.map((item) => (
                  <ListGroup.Item onClick={() => handleCatagory(item)}>
                    {item}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </div>
        </Container>
      </div>

      <div className="cartproductshow">
        <Button variant="primary" onClick={handleShow}>
          Offer
        </Button>
        <Container>
          <Row>
            {catagoryproduct
              ? catagoryproduct.map((item) => (
                  <Col lg={4}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img variant="top" src={item.img} />
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text></Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              : ""}
          </Row>
        </Container>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={discountimg} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HomePage;
