import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart, useDispatchCart } from './ContextReducer';

export default function Navbar() {
  let data = useCart() || [];
  const dispatch = useDispatchCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handlelogout = () => {
    localStorage.removeItem("authToken");
    dispatch({ type: "DROP" });
    navigate("/login");
  };

  const activeStyle = {
    borderBottom: '2px solid black',
    fontWeight: '500'
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: '#f8f9fa' }} // light gray
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#000'
          }}
        >
          Hungry
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link
                className="nav-link fs-5"
                to="/"
                style={location.pathname === '/' ? activeStyle : {}}
              >
                Home
              </Link>
            </li>

            {localStorage.getItem("authToken") && (
              <li className="nav-item">
                <Link
                  className="nav-link fs-5"
                  to="/myOrder"
                  style={location.pathname === '/myOrder' ? activeStyle : {}}
                >
                  My Orders
                </Link>
              </li>
            )}
          </ul>

          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <Link className="btn bg-white text-success mx-1" to="/login">
                Login
              </Link>
              <Link className="btn bg-white text-success mx-1" to="/createuser">
                SignUp
              </Link>
            </div>
          ) : (
            <div>
              <div
                className="btn bg-white text-success mx-2"
                onClick={() => {
                  setCartView(true);
                }}
              >
                My Cart{" "}
                <Badge pill bg="danger">
                  {data.length > 0 ? data.length : ""}
                </Badge>
              </div>

              {cartView && (
                <Modal onClose={() => setCartView(false)}>
                  <Cart />
                </Modal>
              )}

              <div className="btn bg-white text-danger mx-2" onClick={handlelogout}>
                Log Out
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
