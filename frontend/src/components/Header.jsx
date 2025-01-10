import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NavComp() {
  const navigate = useNavigate();
  // State to track user authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("loggedIn") === "true");
  }, []);

  // Simulate logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    // Additional logic to clear auth token or session
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" style={{ background: "#F5C518" }} sticky="top">
      <Container fluid className="container">
        <Navbar.Brand href="/">
          <Image
            src="./images/newlogo.png"
            alt="CutByAdunni Logo"
            width={90}
            height={60}
          />
        </Navbar.Brand>{" "}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/order">Order</Nav.Link>
            <Nav.Link href="/portfolio">Portfolio</Nav.Link>
          </Nav>

          {isLoggedIn ? (
            <Nav.Link onClick={handleLogout} className="px-3">
              Logout
            </Nav.Link>
          ) : (
            <>
              <Nav.Link href="/login" className="px-3">
                Login
              </Nav.Link>
              <Nav.Link href="/signup">SignUp</Nav.Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavComp;
