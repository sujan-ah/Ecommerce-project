import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { Container, Row, Col } from "react-bootstrap";
import AdminNavbar from "./AdminNavbar";

const AdminDashboard = () => {
  let navigate = useNavigate();
  const { state3 } = useContext(Store);
  const { userInfo } = state3;

  useEffect(() => {
    if (userInfo) {
      if (!userInfo.isAdmin) {
        navigate("/");
      }
    }
  });

  return (
    <Container>
      <Row>
        <Col lg={3}>
          <AdminNavbar active="" />
        </Col>

        <Col lg={9}>
          <h1>
            Welcome To Admin Dashboard. You Have The Super Power TO Controll
            Everything.
          </h1>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
