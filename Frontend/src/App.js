import { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Badge,
  NavDropdown,
  Button,
  Offcanvas,
  NavItem,
} from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./components/ProductPage";
import ProductDetails from "./components/ProductDetails";
import HomePage from "./components/HomePage";
import WishList from "./components/WishList";
import Compare from "./components/Compare";
import CartPage from "./components/CartPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Store } from "./Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Shipping from "./components/Shipping";
import Payment from "./components/Payment";
import Placeorder from "./components/Placeorder";
import Order from "./components/Order";
import MyOrder from "./components/MyOrder";
import Dashboard from "./components/Dashboard";
import Vendor from "./components/Vendor";
import VertualCard from "./components/VertualCard";
import Affiliate from "./components/Affiliate";
import AffiliateLink from "./components/AffiliateLink";
import AdminDashboard from "./components/AdminDashboard";
import AdminUserList from "./components/AdminUserList";
import AdminRollManagement from "./components/AdminRollManagement";
import AdminSignin from "./components/AdminSignin";
import AdminProductList from "./components/AdminProductList";

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { state, dispatch, state2, dispatch2, state3, dispatch3 } =
    useContext(Store);

  const {
    cart: { cartItems },
  } = state;
  const {
    wishlist: { wishlistItems },
  } = state2;
  const { userInfo } = state3;

  let updateCart = (item, quantity) => {
    dispatch({
      type: "CART_ADD_ITEMS",
      payload: { ...item, quantity },
    });
  };

  let handleRemoveItem = (item) => {
    dispatch({
      type: "CART_REMOVE_ITEMS",
      payload: item,
    });
  };

  let handleRemoveWItem = (item) => {
    dispatch2({
      type: "WISHLIST_REMOVE_ITEMS",
      payload: item,
    });
  };

  let handleLogout = () => {
    dispatch3({ type: "USER_LOGOUT" });
    localStorage.removeItem("userInfo");
  };

  return (
    <>
      <BrowserRouter>
        <Navbar bg="dark" variant="dark">
          <Container>
            <ToastContainer position="bottom-center" limit={1} />
            <Navbar.Brand href="#home">Amazon</Navbar.Brand>
            <Nav className="ms-auto menu">
              <Link className="item" to="/">
                Home
              </Link>
              <Link className="item" to="/products">
                Products
              </Link>
              <Link className="item" to="/compare">
                Compare Products
              </Link>

              {/* video no: 14 */}
              <NavDropdown title="Cart" id="basic-nav-dropdown">
                {cartItems.map((item) => (
                  <>
                    <img className="me-2 mt-2" width="50" src={item.img}></img>
                    <Link className="me-2" to={`/products/${item.slug}`}>
                      {item.name}
                    </Link>
                    <Button
                      className="me-2 mt-2"
                      onClick={() => updateCart(item, item.quantity + 1)}
                      disabled={item.quantity == item.instock}
                      variant="success"
                    >
                      +
                    </Button>

                    <span className="me-2 mt-2">{item.quantity}</span>

                    <Button
                      className="me-2 mt-2"
                      onClick={() => updateCart(item, item.quantity - 1)}
                      disabled={item.quantity === 1}
                      variant="success"
                    >
                      -
                    </Button>
                    <Button
                      className="me-2 mt-2"
                      onClick={() => handleRemoveItem(item)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                    <NavDropdown.Divider />
                    <br />
                  </>
                ))}

                <div>
                  <Link to="/cartpage">
                    <Button className="w-100" variant="info">
                      Go to Cart
                    </Button>
                  </Link>
                </div>
              </NavDropdown>

              {state.cart.cartItems.length > 0 && (
                <Badge pill bg="info">
                  {state.cart.cartItems.length}
                </Badge>
              )}
              <NavDropdown title="Wishlist" id="basic-nav-dropdown">
                {wishlistItems.map((item) => (
                  <>
                    <img className="me-2 mt-2" width="50" src={item.img}></img>
                    <Link className="me-2" to={`/products/${item.slug}`}>
                      {item.name}
                    </Link>

                    <Button
                      className="me-2 mt-2"
                      onClick={() => handleRemoveWItem(item)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                    <NavDropdown.Divider />
                    <br />
                  </>
                ))}

                <div>
                  <Link to="/wishlist">
                    <Button className="w-100" variant="info">
                      Go to Wishlist
                    </Button>
                  </Link>
                </div>
              </NavDropdown>

              {state2.wishlist.wishlistItems.length > 0 && (
                <Badge pill bg="info">
                  {state2.wishlist.wishlistItems.length}
                </Badge>
              )}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  {userInfo.isAdmin && (
                    <NavDropdown.Item>
                      <Link className="item" to="/admin">
                        Admin Dashboard
                      </Link>
                    </NavDropdown.Item>
                  )}
                  {userInfo.isVendor ? (
                    <NavDropdown.Item>
                      <Link className="item" to="/dashboard">
                        Dashboard
                      </Link>
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item>
                      <Link className="item" to="/vendor">
                        Become a vendor
                      </Link>
                    </NavDropdown.Item>
                  )}

                  <NavDropdown.Item>
                    <Link className="item" to="/vertualcard">
                      Get A Virtual Cart
                    </Link>
                  </NavDropdown.Item>
                  {userInfo.isAffiliate ? (
                    <NavDropdown.Item>
                      <Link className="item" to="/affiliateLink">
                        Get Affiliate Info
                      </Link>
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item>
                      <Link className="item" to="/affiliate">
                        Become a Affiliate
                      </Link>
                    </NavDropdown.Item>
                  )}

                  <NavDropdown.Item>
                    <Link className="item" to="/myorders">
                      My Orders
                    </Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link className="item" to="/signin">
                  Signin
                </Link>
              )}
            </Nav>
          </Container>
        </Navbar>

        <Button variant="primary" onClick={handleShow} className="me-2 sidebar">
          Cart
        </Button>

        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {cartItems.map((item) => (
              <>
                <img className="me-2 mt-2" width="50" src={item.img}></img>
                <Link className="me-2" to={`/products/${item.slug}`}>
                  {item.name}
                </Link>
                <Button
                  className="me-2 mt-2"
                  onClick={() => updateCart(item, item.quantity + 1)}
                  disabled={item.quantity == item.instock}
                  variant="success"
                >
                  +
                </Button>

                <span className="me-2 mt-2">{item.quantity}</span>

                <Button
                  className="me-2 mt-2"
                  onClick={() => updateCart(item, item.quantity - 1)}
                  disabled={item.quantity === 1}
                  variant="success"
                >
                  -
                </Button>
                <Button
                  className="me-2 mt-2"
                  onClick={() => handleRemoveItem(item)}
                  variant="danger"
                >
                  Delete
                </Button>
                <hr />
                <br></br>
              </>
            ))}

            <div>
              <Button className="w-100" variant="info">
                <Link to="/cartpage">Go to Cart</Link>
              </Button>
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/placeorder" element={<Placeorder />} />
          <Route path="/orders/:id" element={<Order />} />
          <Route path="/myorders" element={<MyOrder />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/vertualcard" element={<VertualCard />} />
          <Route path="/affiliate" element={<Affiliate />} />
          <Route path="/affiliateLink" element={<AffiliateLink />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/adminUserlist" element={<AdminUserList />} />
          <Route path="/adminProductlist" element={<AdminProductList />} />
          <Route path="/adminrollmanage" element={<AdminRollManagement />} />
          <Route path="/adminsignin" element={<AdminSignin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
