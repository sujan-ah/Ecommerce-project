import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import AdminNavbar from "./AdminNavbar";

const AdminProductList = () => {
  const [proList, setProList] = useState([]);

  useEffect(() => {
    async function pro() {
      let { data } = await axios.get("/products/adminProList");
      setProList(data);
    }
    pro();
  }, []);

  return (
    <Container>
      <Row>
        <Col lg={3}>
          <AdminNavbar active="productlist" />
        </Col>

        <Col lg={9}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Serial</th>
                <th>Name</th>
                <th>Catagory</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {proList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.catagory}</td>
                  <td>${item.price}</td>
                  <td>{item.instock}</td>
                  <td>
                    <div
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminProductList;
