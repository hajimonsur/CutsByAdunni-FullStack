import React from "react";
import Accordion from "react-bootstrap/Accordion";

const ContactPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          padding: "50px 20px",
          backgroundColor: "#6c757d",
          color: "#fff",
        }}
      >
        <h1 className="text-center">Get in Touch with Us</h1>
        <p className="text-center">
          We'd love to hear from you! Whether you have questions or just want to
          say hello, reach out to us.
        </p>
      </section>

      {/* Contact Form */}
      <section style={{ padding: "50px 0", backgroundColor: "#f8f9fa" }}>
        <h2 className="text-center mb-4">Contact Us</h2>
        <form className="mt-4 mx-auto" style={{ maxWidth: "600px" }}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" id="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              id="message"
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-warning w-100">
            Send Message
          </button>
        </form>
      </section>

      {/* Our Location & Map Section */}
      <section style={{ padding: "50px 20px", backgroundColor: "#e9ecef" }}>
        <h2 className="text-center mb-4">Our Location</h2>
        <div className="container text-center">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126045.72811624776!2d3.3668696!3d6.4973814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c687e554013%3A0xf8d2d7c4bd02d6b!2sOyingbo%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1697072068984!5m2!1sen!2sng"
            width="100%"
            height="400"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </section>

      {/* Contact Details & Social Media */}
      <section style={{ padding: "50px 20px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 text-center">
              <h4>Phone</h4>
              <a href="tel:+2348135881858" className="d-block">
                (+234)8135881858
              </a>
            </div>
            <div className="col-md-4 text-center">
              <h4>Email</h4>
              <a href="mailto:contact@cutbyadunni.com" className="d-block">
                contact@cutbyadunni.com
              </a>
            </div>
            <div className="col-md-4 text-center">
              <h4>Follow Us</h4>
              <div>
                <a
                  href="https://www.facebook.com"
                  className="btn btn-outline-warning mx-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/adunni_dunnki"
                  className="btn btn-outline-warning mx-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <a
                  href="https://twitter.com"
                  className="btn btn-outline-warning mx-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: "50px 20px", backgroundColor: "#f8f9fa" }}>
        <h2 className="text-center mb-4">Frequently Asked Questions</h2>
        <Accordion className="container mx-auto">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              How long does it take to receive my order?
            </Accordion.Header>
            <Accordion.Body>
              Our typical turnaround time is 7-14 business days.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Can I provide my own design?</Accordion.Header>
            <Accordion.Body>
              Yes, absolutely! You can upload your design description during the
              order process.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              What if the outfit doesn’t fit perfectly?
            </Accordion.Header>
            <Accordion.Body>
              We offer free alterations to ensure your complete satisfaction.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              Do you offer delivery to all locations in Nigeria?
            </Accordion.Header>
            <Accordion.Body>
              Yes, we deliver to all locations across Nigeria. Delivery times
              may vary depending on your location.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>What materials do you use?</Accordion.Header>
            <Accordion.Body>
              We use a wide variety of high-quality materials to ensure comfort
              and style. You can specify your preferred fabric when placing an
              order.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </section>
    </div>
  );
};

export default ContactPage;
