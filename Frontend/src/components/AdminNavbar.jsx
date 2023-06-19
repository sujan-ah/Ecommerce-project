import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminNavbar = (props) => {
  return (
    <ListGroup as="ul">
      <ListGroup.Item
        as="li"
        active={props.active == "userList" ? true : false}
      >
        <Link
          style={{ color: `${props.active == "userList" ? "white" : "black"}` }}
          to="/adminUserlist"
        >
          User List
        </Link>
      </ListGroup.Item>

      <ListGroup.Item
        as="li"
        active={props.active == "productlist" ? true : false}
      >
        <Link
          style={{
            color: `${props.active == "productlist" ? "white" : "black"}`,
          }}
          to="/adminProductlist"
        >
          Product List
        </Link>
      </ListGroup.Item>

      <ListGroup.Item as="li">Product Upload</ListGroup.Item>
      <ListGroup.Item as="li">Catagory Upload</ListGroup.Item>
      <ListGroup.Item as="li">Brand Upload</ListGroup.Item>
      <ListGroup.Item as="li">Blog</ListGroup.Item>
      <ListGroup.Item as="li">Product Approve</ListGroup.Item>

      <ListGroup.Item
        as="li"
        active={props.active == "rollmanage" ? true : false}
      >
        <Link
          style={{
            color: `${props.active == "rollmanage" ? "white" : "black"}`,
          }}
          to="/adminrollmanage"
        >
          Role Assign
        </Link>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default AdminNavbar;
