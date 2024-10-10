import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  InputGroup,
  FormControl,
  Alert,
  ButtonGroup,
  Row,
  Col,
} from "react-bootstrap";
import "./Signup.css";
//Pradyumna and Advait refer Monday for task details
const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/.test(email);

  const validateField = (name, value) => {
    let formErrors = { ...errors };
    let isValid = true;

    if (name === "firstName") {
      if (!value.trim()) {
        formErrors.firstName = "First Name is required";
        isValid = false;
      } else if (value.length < 2 || value.length > 10) {
        formErrors.firstName = "First Name must be between 2 and 10 characters";
        isValid = false;
      } else {
        formErrors.firstName = "";
      }
    }

    if (name === "lastName") {
      if (!value.trim()) {
        formErrors.lastName = "Last Name is required";
        isValid = false;
      } else if (value.length < 2 || value.length > 10) {
        formErrors.lastName = "Last Name must be between 2 and 10 characters";
        isValid = false;
      } else {
        formErrors.lastName = "";
      }
    }

    if (name === "email") {
      if (!value.trim()) {
        formErrors.email = "Email is required";
        isValid = false;
      } else if (!validateEmail(value)) {
        formErrors.email = "Email must be a valid Northeastern email";
        isValid = false;
      } else {
        formErrors.email = "";
      }
    }

    if (name === "password") {
      if (!value.trim()) {
        formErrors.password = "Password is required";
        isValid = false;
      } else if (value.length < 6) {
        formErrors.password = "Password must be at least 6 characters long";
        isValid = false;
      } else {
        formErrors.password = "";
      }
    }

    if (name === "confirmPassword") {
      if (value !== formData.password) {
        formErrors.confirmPassword = "Passwords do not match";
        isValid = false;
      } else {
        formErrors.confirmPassword = "";
      }
    }

    if (name === "acceptTerms") {
      if (!value) {
        formErrors.acceptTerms = "You must accept the terms";
        isValid = false;
      } else {
        formErrors.acceptTerms = "";
      }
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: fieldValue });
    validateField(name, fieldValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formIsValid = Object.keys(formData).every((field) =>
      validateField(field, formData[field])
    );
    if (formIsValid) {
      setShowSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      });
      setErrors({});
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5 signup-container">
      <Card style={{ width: "28rem" }} className="p-4 container-card">
        <h2 className="text-primary fw-bold text-center mb-4 title-form">
          Signup Form
        </h2>
        {showSuccess && (
          <Alert
            variant="success"
            onClose={() => setShowSuccess(false)}
            dismissible
          >
            Signup successful!
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label className="fw-bold form-titles">First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              isInvalid={!!errors.firstName}
              className="inputs-form"
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstName}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Enter your first name (2-10 characters).
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label className="fw-bold form-titles">Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="inputs-form"
              isInvalid={!!errors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastName}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Enter your last name (2-10 characters).
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="fw-bold form-titles">
              Email Address
            </Form.Label>
            <InputGroup>
              <FormControl
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="inputs-form"
                placeholder="yourname@northeastern.edu"
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label className="fw-bold form-titles">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="inputs-form"
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label className="fw-bold form-titles">
              Confirm Password
            </Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="inputs-form"
              isInvalid={!!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="acceptTerms">
            <Form.Check
              type="checkbox"
              name="acceptTerms"
              label="I accept the terms and conditions"
              checked={formData.acceptTerms}
              onChange={handleChange}
              isInvalid={!!errors.acceptTerms}
              feedback={errors.acceptTerms}
              className="form-titles"
            />
          </Form.Group>

          <ButtonGroup className="mt-3 d-flex justify-content-between">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="secondary" type="reset">
              Reset
            </Button>
          </ButtonGroup>
        </Form>
      </Card>
    </Container>
  );
};

export default Signup;
