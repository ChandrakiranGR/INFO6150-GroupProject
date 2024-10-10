import React from "react";

const Footer = () => {
  const d = new Date();
  const year = d.getFullYear();
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6 " style={{ marginBottom: "10px" }}>
            <h5>About Us</h5>
            <p>
              We are the perfect bridge for you to market and advertise your
              products to reaching right customers.
            </p>
          </div>

          <div className="col-md-6 text-md-end">
            <h5>Follow Us</h5>
            <a
              href="https://facebook.com"
              className="text-white me-3"
              aria-label="Facebook"
              target="_blank"
            >
              <i className="bi bi-facebook"></i> Facebook
            </a>
            <a
              href="https://twitter.com"
              className="text-white me-3"
              aria-label="Twitter"
              target="_blank"
            >
              <i className="bi bi-twitter"></i> X (Twitter)
            </a>
            <a
              href="https://instagram.com"
              className="text-white"
              aria-label="Instagram"
              target="_blank"
            >
              <i class="bi bi-instagram"></i> Instagram
            </a>
          </div>
        </div>
        <div className="text-center pt-3">
          <p>&copy; {year} AdOnWheel. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
