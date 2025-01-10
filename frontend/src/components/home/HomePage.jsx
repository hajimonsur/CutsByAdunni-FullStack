import React from "react";
import HeroSection from "../hero/Hero";
import { Image } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import { motion } from "framer-motion";
import "./home.css";
import { useState, useEffect } from "react";

const HomePage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [portfolioItems, setPortfolioItems] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/portfolio`);
        const data = await response.json();
        console.log(data);
        setPortfolioItems(data); // Store all 5 items in state
      } catch (error) {
        console.error("Error fetching portfolio items:", error);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Divider Section */}
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-6 col-sm-4 col-md-3 text-center mb-3">
            <Image
              src="./images/xhina.png"
              alt="CutByAdunni Logo"
              className="img-fluid"
              width={150}
              height={120}
            />
          </div>
          <div className="col-6 col-sm-4 col-md-3 text-center mb-3">
            <Image
              src="./images/3m.png"
              alt="CutByAdunni Logo"
              className="img-fluid"
              width={150}
              height={120}
            />
          </div>
          <div className="col-6 col-sm-4 col-md-3 text-center mb-3">
            <Image
              src="./images/xhina.png"
              alt="CutByAdunni Logo"
              className="img-fluid"
              width={150}
              height={120}
            />
          </div>
          <div className="col-6 col-sm-4 col-md-3 text-center mb-3">
            <Image
              src="./images/3m.png"
              alt="CutByAdunni Logo"
              className="img-fluid"
              width={150}
              height={120}
            />
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="py-5 bg-light text-dark">
        <h2 className="text-center">Why Choose Us?</h2>
        <div className="container">
          <div className="row justify-content-center mt-4">
            <div className="col-md-4 text-center mb-4">
              {/* <Image
                // src="./images/customimg.jpg"
                alt="Custom Tailoring"
                className="img-fluid"
              /> */}
              <h4 className="mt-3">Custom Tailoring</h4>
              <p>Made-to-measure outfits for every occasion.</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              {/* <Image
                // src="./images/priceimg.jpg"
                alt="Affordable Pricing"
                className="img-fluid"
              /> */}
              <h4 className="mt-3">Affordable Pricing</h4>
              <p>Style that fits your budget.</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              {/* <Image
                // src="./images/quickimg.jpg"
                alt="Quick Turnaround"
                className="img-fluid"
              /> */}
              <h4 className="mt-3">Quick Turnaround</h4>
              <p>Get your outfits when you need them.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-5 bg-light text-dark">
        <h2 className="text-center">Our Work</h2>
        <motion.div
          className="container d-flex flex-wrap justify-content-center mt-4 portfolio-gallery"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {portfolioItems.slice(0, 4).map((item) => (
            <div key={item.id} className="portfolio-item">
              <img
                src={item.images}
                alt={item.title}
                className="portfolio-image"
              />
              <div className="portfolio-overlay">
                <h5>{item.title}</h5>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Testimonial Section */}
      <section className="py-5 bg-light text-dark">
        <h2 className="text-center mb-4">What Our Clients Say</h2>
        <div className="container">
          <Carousel className="testimonial-carousel">
            <Carousel.Item>
              <div className="testimonial-item text-center">
                <p className="quote">
                  <i className="fas fa-quote-left"></i>
                  "Cuts By Adunni brought my dream outfit to life. I felt so
                  confident and beautiful!"{" "}
                  <i className="fas fa-quote-right"></i>
                </p>
                <h5 className="client-name mt-3">Ikobayo Tawakalitu</h5>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="testimonial-item text-center">
                <p className="quote">
                  <i className="fas fa-quote-left"></i>
                  "The damask dress I ordered was so beautiful. It made me stand
                  out at the event, and everyone kept asking where I got it
                  from. Thank you!"
                  <i className="fas fa-quote-right"></i>
                </p>
                <h5 className="client-name mt-3">Amode Masida</h5>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="testimonial-item text-center">
                <p className="quote">
                  <i className="fas fa-quote-left"></i>
                  "Excellent craftsmanship and attention to detail. My custom
                  material was perfect!" <i className="fas fa-quote-right"></i>
                </p>
                <h5 className="client-name mt-3">Agbaje Islamiya</h5>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
