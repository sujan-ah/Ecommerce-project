import React, { useState, useContext } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store.js";
import { toast } from "react-toastify";

const AdminSignin = () => {
  const { AdminUserState, AdminUserDispatch } = useContext(Store);

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("api/users/adminsignin", {
        email,
        password,
      });
      console.log(data);
      AdminUserDispatch({
        type: "ADMINUSER_SIGNIN",
        payload: data,
      });
      localStorage.setItem("AdminUserInfo", JSON.stringify(data));
    } catch (err) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <Container
      className="w-25 border mt-5 p-3"
      style={{ background: "#21B3DC" }}
    >
      <Alert varriant="primary" className="text-center">
        <h1 className="loginalert">Admin Login</h1>
      </Alert>
      <Form>
        <Form.Label htmlFor="inputPassword5" className="login">
          Email
        </Form.Label>
        <Form.Control
          type="email"
          id="Write Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Label htmlFor="inputPassword5" className="login">
          Password
        </Form.Label>
        <Form.Control
          type="password"
          id="Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form>
      <Button
        className="mt-3 mb-3 loginbtn"
        variant="primary"
        onClick={handleSubmit}
      >
        Signin
      </Button>
      <br />
    </Container>
  );
};

export default AdminSignin;
