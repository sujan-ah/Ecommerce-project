import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Tab, Tabs, Form, Button } from "react-bootstrap";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";

const AdminRollManagement = () => {
  const [name, setName] = useState("");
  const [roles, setRoles] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRoll] = useState("");

  let rolelist = [];

  let handleProductUpload = () => {
    if (rolelist.indexOf("productUpload") !== -1) {
      rolelist.splice(rolelist.indexOf("productUpload"), 1);
      console.log("ache", rolelist);
    } else {
      rolelist.push("productUpload");
      console.log("nai", rolelist);
    }
  };
  let handleCatagoryUpload = () => {
    if (rolelist.indexOf("catagoryUpload") !== -1) {
      rolelist.splice(rolelist.indexOf("catagoryUpload"), 1);
      console.log("ache", rolelist);
    } else {
      rolelist.push("catagoryUpload");
      console.log("nai", rolelist);
    }
  };
  let handleBrandUpload = () => {
    if (rolelist.indexOf("brandUpload") !== -1) {
      rolelist.splice(rolelist.indexOf("brandUpload"), 1);
      console.log("ache", rolelist);
    } else {
      rolelist.push("brandUpload");
      console.log("nai", rolelist);
    }
  };
  let handleBlog = () => {
    if (rolelist.indexOf("blogUpload") !== -1) {
      rolelist.splice(rolelist.indexOf("blogUpload"), 1);
      console.log("ache", rolelist);
    } else {
      rolelist.push("blogUpload");
      console.log("nai", rolelist);
    }
  };
  let handleProductApprove = () => {
    if (rolelist.indexOf("productApprove") !== -1) {
      rolelist.splice(rolelist.indexOf("productApprove"), 1);
      console.log("ache", rolelist);
    } else {
      rolelist.push("productApprove");
      console.log("nai", rolelist);
    }
  };

  let handleUserRoleSubmit = async (e) => {
    e.preventDefault();
    let { data } = await axios.post("/api/users/userRole", {
      name: name,
      permissions: rolelist,
    });
  };

  useEffect(() => {
    async function role() {
      let { data } = await axios.get("/api/users/userrole");
      setRoles(data);
      // console.log(data);
    }
    role();
  }, []);

  let handleAssignRole = async (e) => {
    e.preventDefault();
    let { data } = await axios.post("/api/users/role", {
      email: email,
      password: password,
      role: role,
    });
  };

  return (
    <Container>
      <Row>
        <Col lg={3}>
          <AdminNavbar active="rollmanage" />
        </Col>

        <Col lg={9}>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="rolllist" title="Roll List">
              Sujan
            </Tab>

            <Tab eventKey="assignroll" title="Assign Roll">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Select
                  aria-label="Select Roll"
                  onChange={(e) => setRoll(e.target.value)}
                >
                  <option>Select Roll</option>
                  {roles.map((item) => (
                    <option value={item._id}>{item.name}</option>
                  ))}
                </Form.Select>

                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleAssignRole}
                >
                  Submit
                </Button>
              </Form>
            </Tab>

            <Tab eventKey="createroll" title="Create Roll">
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Create Roll</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Create Roll"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Check
                  type="checkbox"
                  id="checkbox"
                  label="Product Upload"
                  onChange={handleProductUpload}
                />
                <Form.Check
                  type="checkbox"
                  id="checkbox"
                  label="Catagory Upload"
                  onChange={handleCatagoryUpload}
                />
                <Form.Check
                  type="checkbox"
                  id="checkbox"
                  label="Brand Upload"
                  onChange={handleBrandUpload}
                />
                <Form.Check
                  type="checkbox"
                  id="checkbox"
                  label="Blog"
                  onChange={handleBlog}
                />
                <Form.Check
                  type="checkbox"
                  id="checkbox"
                  label="Product Approve"
                  onChange={handleProductApprove}
                />
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleUserRoleSubmit}
                >
                  Submit
                </Button>
              </Form>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminRollManagement;
