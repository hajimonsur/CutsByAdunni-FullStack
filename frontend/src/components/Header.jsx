import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function NavComp() {
  const navigate = useNavigate();

  // State to track user authentication and role
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState(""); // Track user's role

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("loggedIn") === "true";
    setIsLoggedIn(isUserLoggedIn);

    if (isUserLoggedIn) {
      const user = localStorage.getItem("user");
      const role = localStorage.getItem("role");
      setUserRole(role);

      setUserName(user ? JSON.parse(user).username : "");
    }
  }, []);

  // Simulate logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    // Clear user session and navigate to login
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
            src="https://res.cloudinary.com/dtcjgwt8p/image/upload/v1738074026/ednj0qmxzxo7i1tkc1hu.png"
            alt="CutByAdunni Logo"
            width={90}
            height={60}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {userRole === "admin" ? (
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/portfolio">
                Portfolio
              </Nav.Link>
              <Nav.Link as={Link} to="/admin">
                Dashboard
              </Nav.Link>
            </Nav>
          ) : (
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/portfolio">
                Portfolio
              </Nav.Link>
              <Nav.Link as={Link} to="/order">
                Order
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
            </Nav>
          )}

          {isLoggedIn ? (
            <>
              <Nav.Link href="/profile" className="px-3">
                Welcome, {userName || "Profile"}
              </Nav.Link>
              <Nav.Link onClick={handleLogout} className="px-3">
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login" className="px-3">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">SignUp</Nav.Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavComp;
