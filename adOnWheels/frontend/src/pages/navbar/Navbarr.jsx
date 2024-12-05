import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo1.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
const Navbarr = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userType = useSelector((state) => state.auth.type);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Navbar
      bg="dark"
      className="custom-navbar-color fixed-top"
      variant="dark"
      expand="sm"
      style={{
        padding: "0",
      }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="logo-part">
          <div className="logo-img">
            <img src={logo} alt="" />
          </div>
          AdOnWheels
        </Navbar.Brand>
        <div className="d-flex align-items-center">
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-2" />
        </div>
        <Navbar.Collapse id="basic-navbar-nav" className="ms-3 ">
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <span className="navbar-text me-3 text-light">
                  Welcome, <strong>{userType}</strong>!
                </span>
                {/* {userType === "Admin" && (
                  <Nav.Link as={Link} to="/admin">
                    Admin Dashboard
                  </Nav.Link>
                )}
                {userType === "Advertiser" && (
                  <Nav.Link as={Link} to="/addashboard">
                    Advertiser Dashboard
                  </Nav.Link>
                )}
                {userType === "Publisher" && (
                  <Nav.Link as={Link} to="/publisher/dashboard">
                    Publisher Dashboard
                  </Nav.Link>
                )}
                {userType === "BodyShop" && (
                  <Nav.Link as={Link} to="/bodyshop-dashboard">
                    BodyShop Dashboard
                  </Nav.Link>
                )} */}
                {userType === "Admin" && (
                  <Nav.Link
                    as={Link}
                    to="/admin"
                    className="btn btn-outline-primary mx-2"
                  >
                    Admin Dashboard
                  </Nav.Link>
                )}
                {userType === "Advertiser" && (
                  <Nav.Link
                    as={Link}
                    to="/addashboard"
                    className="btn btn-outline-success mx-2"
                  >
                    Advertiser Dashboard
                  </Nav.Link>
                )}
                {userType === "Publisher" && (
                  <Nav.Link
                    as={Link}
                    to="/publisher/dashboard"
                    className="btn btn-outline-info mx-2"
                  >
                    Publisher Dashboard
                  </Nav.Link>
                )}
                {userType === "BodyShop" && (
                  <Nav.Link
                    as={Link}
                    to="/bodyshop-dashboard"
                    className="btn btn-outline-warning mx-2"
                  >
                    BodyShop Dashboard
                  </Nav.Link>
                )}

                <button
                  onClick={handleLogout}
                  className="btn btn-danger ms-2" // Styling for the button
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">
                  About
                </Nav.Link>
                <Nav.Link as={Link} to="/services">
                  Services
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="btn-login">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarr;
