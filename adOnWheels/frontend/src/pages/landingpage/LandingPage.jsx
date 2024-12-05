import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import heroImg from "../../assets/hero.jpeg";
import "./LandingPage.css";
import Navbarr from "../navbar/Navbarr";

const LandingPage = () => {
  return (
    <Container
      fluid
      className="d-flex align-items-center flex-column flex-md-row landing"
      style={{ height: "90vh" }}
    >
      <Navbarr />
      <div className="d-flex flex-column desc-part gap-4">
        <h1 className="primary-heading">Welcome to AdOnWheels</h1>
        <p className="hero-description">
          We connect advertisers with vehicle owners to create powerful mobile
          ads. Explore our services and find the perfect solution for your needs!
        </p>
        <Link to="/signup">
          <Button className="cta-button" variant="success">
            Get Started
          </Button>
        </Link>
      </div>
      <div className="d-md-flex justify-content-center img-part">
        <img src={heroImg} alt="Hero" className="hero-img" />
      </div>
    </Container>
  );
};

export default LandingPage;
