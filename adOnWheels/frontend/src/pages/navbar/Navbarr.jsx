import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "./Navbar.css";
const Navbarr = () => {
  return (
    <Navbar
      bg="dark"
      className="custom-navbar-color"
      variant="dark"
      expand="sm"
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand href="#home">AdOnWheels</Navbar.Brand>

        <div className="d-flex align-items-center">
          <Button variant="outline-light" className="ms-2">
            Sign up
          </Button>

          <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-2" />
        </div>
        <Navbar.Collapse id="basic-navbar-nav" className="ms-3">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">About</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarr;
