import React, { useState } from "react";
import "./Login.css";
import { Modal, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

const Login = () => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const goBack = () => {
    window.history.back();
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);

    const regex = /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/;
    if (!regex.test(value) && value !== "") {
      setError("Enter a Valid Email Address");
    } else {
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!error) {
      alert("Login successful!");
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="card p-4">
        <div className="d-flex justify-content-center align-items-center mb-4 position-relative">
          <button
            className="btn btn-link back-btn"
            onClick={goBack}
            style={{ textDecoration: "none" }}
          >
            <FaArrowLeft /> Back
          </button>
          <h2 className="login-heading">Login</h2>
        </div>
        <div className="text-center">
          <form onSubmit={handleSubmit}>
            <div className="row mt-3 text-start">
              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="text"
                  id="email"
                  className="form-control mb-2"
                  placeholder="Username@northeastern.edu"
                  value={username}
                  onChange={handleUsernameChange}
                />
                {error && <p className="text-danger">{error}</p>}
              </div>
              <div className="col-12">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control mb-4"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="text-center">
              <button className="btn btn-primary btn-block mb-3" type="submit">
                Get Started
              </button>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-muted">
                <a href="#" onClick={handleShow}>
                  Forgot Password?
                </a>
              </p>
              <p className="text-muted">
                <a href="#">Create Account</a>
              </p>
            </div>
          </form>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please contact the administrator for changing your password.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
