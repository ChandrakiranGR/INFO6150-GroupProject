import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import heroImg from "../../assets/hero.jpeg";
const LandingPage = () => {
  return (
    // <Container
    //   fluid
    //   className="d-flex align-items-center sm-flex-reverse"
    //   style={{ height: "100vh" }}
    // >
    //   <Row className="w-100">
    //     <Col
    //       md={6}
    //       className="d-flex flex-column  justify-content-center text-start"
    //     >
    //       <h1>Welcome to Our Website</h1>
    //       <p>
    //         This is a brief description of what we offer. Explore our services
    //         and find the perfect solution for your needs!
    //       </p>
    //       <Button variant="success">Get Started</Button>
    //     </Col>
    //     <Col md={6} className="d-none d-md-flex justify-content-center">
    //       <img
    //         src={heroImg} // Replace with your hero image URL
    //         alt="Hero"
    //         style={{ maxWidth: "100%", height: "auto" }}
    //       />
    //     </Col>
    //   </Row>
    // </Container>
    // <Container
    //   fluid
    //   className="d-flex align-items-center"
    //   style={{ height: "100vh" }}
    // >
    //   <Row className="w-100">
    //     {/* Description Column */}
    //     <Col
    //       md={6}
    //       className="d-flex flex-column justify-content-center text-start order-1 order-md-1"
    //     >
    //       <h1>Welcome to Our Website</h1>
    //       <p>
    //         This is a brief description of what we offer. Explore our services
    //         and find the perfect solution for your needs!
    //       </p>
    //       <Button variant="success">Get Started</Button>
    //     </Col>

    //     {/* Hero Image Column */}
    //     <Col
    //       md={6}
    //       className="d-flex justify-content-center order-2 order-md-2"
    //     >
    //       <img
    //         src={heroImg} // Replace with your hero image URL
    //         alt="Hero"
    //         className="img-fluid" // Makes the image responsive
    //       />
    //     </Col>
    //   </Row>
    // </Container>
    <Container
      fluid
      className="d-flex align-items-center gap-3 flex-column flex-md-row bg-success bg-sm bg-light" // Change bg-success to light on larger screens
      style={{ height: "100vh" }}
    >
      <Row className="w-100">
        <Col
          md={6}
          className="d-flex flex-column justify-content-center text-start"
        >
          <h1>Welcome to Our Website</h1>
          <p>
            This is a brief description of what we offer. Explore our services
            and find the perfect solution for your needs!
          </p>
          <Button variant="success">Get Started</Button>
        </Col>
        <Col md={6} className=" d-md-flex justify-content-center">
          <img
            src={heroImg} // Replace with your hero image URL
            alt="Hero"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
