import React, { useState, useContext, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store.js";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  let { search } = useLocation();
  let redirectUrl = new URLSearchParams(search).get("redirect");
  let redirect = redirectUrl ? redirectUrl : "/";

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [cpassword, setCpassword] = useState("");

  const { state3, dispatch3 } = useContext(Store);

  const { userInfo } = state3;

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.post("api/users/signup", {
        name,
        email,
        password,
        cpassword,
      });
      console.log(data);
      navigate("/signin", { state: "Please login" });
    } catch (err) {
      toast.error("Invalid email or password");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("redirect");
    }
  }, []);

  return (
    <Container
      className="w-25 border mt-5 p-3"
      style={{ background: "#308F9D" }}
    >
      <Alert varriant="primary" className="text-center">
        <h1 className="loginalert">Sign Up</h1>
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Form.Label htmlFor="inputPassword5" className="login">
          Name
        </Form.Label>
        <Form.Control
          type="name"
          id="Write Your Name"
          onChange={(e) => setName(e.target.value)}
        />
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
        <Form.Label htmlFor="inputPassword5" className="login">
          Confirm Password
        </Form.Label>
        <Form.Control
          type="password"
          id="Confirm Password"
          onChange={(e) => setCpassword(e.target.value)}
        />
      </Form>
      <Button
        className="mt-3 mb-3 loginbtn"
        variant="primary"
        onClick={handleSubmit}
      >
        Signup
      </Button>
      <br />
      <Form.Text id="passwordHelpBlock" muted>
        Already Have an Account?{" "}
        <Link to={`/signin?redirect=${redirect}`}>Login</Link>
      </Form.Text>
    </Container>
  );
};

export default Signup;
