import React, { useState, useContext, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store.js";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  let { search, state } = useLocation();
  let redirectUrl = new URLSearchParams(search).get("redirect");
  let redirect = redirectUrl ? redirectUrl : "/";

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const { state3, dispatch3 } = useContext(Store);

  const { userInfo } = state3;

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("api/users/signin", {
        email,
        password,
      });
      console.log(data);
      dispatch3({
        type: "USER_SIGNIN",
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));

      navigate("/vendor", { state: "login Succcessful" });
    } catch (err) {
      toast.error("Invalid email or password");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, []);

  return (
    <Container
      className="w-25 border mt-5 p-3"
      style={{ background: "#21B3DC" }}
    >
      <Alert varriant="primary" className="text-center">
        <h1 className="loginalert">Login</h1>
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
      <Form.Text id="passwordHelpBlock" muted>
        <span className="login">Don't Have an Account? </span>
        <Link to={`/signup?redirect=${redirect}`}>
          <span className="logincreate">Create Account</span>
        </Link>
      </Form.Text>
    </Container>
  );
};

export default Login;
