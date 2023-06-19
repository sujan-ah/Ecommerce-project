import React, { useContext, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Store } from "../Store";
import axios from "axios";

const Affiliate = () => {
  const [agree, setAgree] = useState(false);

  const { state3, dispatch3 } = useContext(Store);
  const { userInfo } = state3;

  let handleAgree = () => {
    setAgree(!agree);
  };
  let handleAffiliate = async () => {
    console.log("ami");
    let { data } = await axios.put(`/api/users/affiliate/${userInfo._id}`);
    console.log(data);
    dispatch3({
      type: "USER_SIGNIN",
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  };

  return (
    <Container>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing
      </p>
      <Form.Check
        type={"checkbox"}
        label={`default ${"Accept the agreement"}`}
        onChange={handleAgree}
      />
      {agree ? (
        <Button variant="primary" onClick={handleAffiliate}>
          Primary
        </Button>
      ) : (
        <Button variant="primary disabled">Primary</Button>
      )}
    </Container>
  );
};

export default Affiliate;
