import React, { useEffect, useContext, useState } from "react";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Row,
  Col,
  Nav,
  Form,
  Button,
  Modal,
  Tab,
  Table,
} from "react-bootstrap";
import axios from "axios";
import EditorConvertToHTML from "./Editor.jsx";
import Storename from "./Storename";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

const Dashboard = () => {
  let navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [cat, setCat] = useState(false);
  const [pro, setPro] = useState(false);
  const [prolist, setProlist] = useState(false);
  const [myprolist, setMyprolist] = useState([]);
  const [proid, setProId] = useState("");
  const [storename, setStorename] = useState("");

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [stock, setStock] = useState("");
  const [catagory, setCatagory] = useState("");
  const [cupon, setCupon] = useState("");
  const [discount, setDiscount] = useState("");
  const [total, setTotal] = useState("");

  const { state3 } = useContext(Store);
  const { userInfo } = state3;

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  }, []);

  let handleCat = () => {
    setCat(true);
    setPro(false);
    setProlist(false);
  };

  let handlePro = () => {
    setPro(true);
    setCat(false);
    setProlist(false);
  };

  let handleProList = () => {
    setPro(false);
    setCat(false);
    setProlist(true);
  };

  useEffect(() => {
    async function Store() {
      let { data } = await axios.get(`/products/storename/${userInfo._id}`);
      setStorename(data[0].name);
    }
    Store();
  }, []);

  useEffect(() => {
    async function productlist() {
      let { data } = await axios.get(`/products/productlist/${userInfo._id}`);
      setMyprolist(data);
    }
    productlist();
  }, []);

  let handleProductSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image || !price || !slug || !stock) {
      toast.error("Please Fill The All field");
    } else if (localStorage.getItem("text") == "") {
      toast.error("Please Fill Description");
    } else {
      await axios.post("/products", {
        name: name,
        image: image,
        price: price,
        description: localStorage.getItem("text"),
        slug: slug,
        stock: stock,
        catagory: catagory,
        cupon: cupon,
        discount: discount,
        total: total,
        owner: state3.userInfo._id,
      });
      navigate("/products");
    }
  };

  let handleProListDelete = async (id) => {
    await axios.post("/products/productlist/del", {
      id: id,
    });
  };

  const handleProListModalShow = async (id) => {
    setShow(true);
    setProId(id);
    let { data } = await axios.get(`/products/productlistModal/${id}`);
    setName(data.name);
    setPrice(data.price);
    setDiscount(data.discount);
  };

  let handleProListMdalSubmit = async () => {
    setShow(false);
    await axios.put("/products/productlistModal/edit", {
      id: proid,
      name: name,
      price: price,
      discount: discount,
    });
  };

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col lg={2}>
          <Nav variant="pills" className="flex-column mt-3">
            <Nav.Item>
              <Nav.Link onClick={handlePro} eventKey="first">
                <h4>Create Product</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={handleCat} eventKey="second">
                <h4>Create Catagory</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={handleProList} eventKey="third">
                <h4>Product List</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        <Col lg={8}>
          {pro && (
            <Form className="mt-3" style={{ fontSize: 15, fontWeight: 700 }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Product Name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  onChange={(e) => setImage(e.target.value)}
                  type="text"
                  placeholder="Product Image"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  placeholder="Product Price"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Description</Form.Label>
                <EditorConvertToHTML
                  onChange={(e) => setDescription(localStorage.getItem("text"))}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Slug</Form.Label>
                <Form.Control
                  onChange={(e) => setSlug(e.target.value)}
                  type="text"
                  placeholder="Product Slug"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  onChange={(e) => setStock(e.target.value)}
                  type="number"
                  placeholder="Product Stock"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Catagory</Form.Label>
                <Form.Control
                  onChange={(e) => setCatagory(e.target.value)}
                  type="text"
                  placeholder="Product Catagory"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Cupon</Form.Label>
                <Form.Control
                  onChange={(e) => setCupon(e.target.value)}
                  type="text"
                  placeholder="Product Cupon"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  onChange={(e) => setDiscount(e.target.value)}
                  type="number"
                  placeholder="Product Discount"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Totalsale</Form.Label>
                <Form.Control
                  onChange={(e) => setTotal(e.target.value)}
                  type="number"
                  placeholder="Product Totalsale"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Store Name</Form.Label>
                <Form.Control
                  placeholder="Disabled input"
                  disabled
                  value={storename}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                onClick={handleProductSubmit}
              >
                Submit
              </Button>
            </Form>
          )}
          {cat && <Storename />}
          {prolist && (
            <Table striped bordered hover className="proTable">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Discount</th>
                  <th className="action">Action</th>
                </tr>
              </thead>
              <tbody>
                {myprolist.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      {item.discount ? <h6>{item.discount}</h6> : "No Discount"}
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleProListModalShow(item._id)}
                        style={{ width: "45%" }}
                      >
                        <FaEdit />
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() => handleProListDelete(item._id)}
                        style={{ width: "45%" }}
                        className="ms-2"
                      >
                        <RiDeleteBin5Fill />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <Modal show={show} onHide={handleClose}>
            <Modal.Title
              style={{ marginLeft: 50, marginTop: 25, fontWeight: 40 }}
            >
              <h3>Product List Info</h3>
            </Modal.Title>
            <Modal.Body className="mdl">
              <Form className="mt-3" style={{ fontSize: 15, fontWeight: 700 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Product Name"
                    className="formModal"
                    value={name}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Product Price</Form.Label>
                  <Form.Control
                    onChange={(e) => setPrice(e.target.value)}
                    type="text"
                    placeholder="Product Price"
                    className="formModal"
                    value={price}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Discount</Form.Label>
                  <Form.Control
                    onChange={(e) => setDiscount(e.target.value)}
                    type="number"
                    placeholder="Product Discount"
                    className="formModal"
                    value={discount}
                  />
                </Form.Group>
              </Form>
              <Button
                variant="primary"
                type="submit"
                onClick={handleProListMdalSubmit}
                className="btnMdl"
                style={{ background: "#0D6EFD" }}
              >
                Submit
              </Button>
              <Button
                variant="secondary"
                onClick={handleClose}
                className="ms-2 btnMdl"
                style={{ background: "#3F0082" }}
              >
                Close
              </Button>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default Dashboard;
