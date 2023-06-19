import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Container, Table } from "react-bootstrap";
import { Store } from "../Store";

const AffiliateLink = () => {
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState([]);

  const { state3 } = useContext(Store);
  const { userInfo } = state3;

  useEffect(() => {
    async function Pro() {
      let { data } = await axios.get(`/products/affiliat/info/${userInfo._id}`);
      setProduct(data);

      let totalAmount = 0;
      data.map((item) => (totalAmount += item.amount));
      setTotal(totalAmount);
    }
    Pro();
  }, []);

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Serial</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {product.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
          <tr>
            <td>Total</td>
            <td>{total}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default AffiliateLink;
