import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // fetch role from localStorage
  const role = localStorage.getItem("role");

  const handleClear = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call API to handle login with email and password
    try {
        const response = await fetch(`http://localhost:5000/api/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({  email, password }),
        });
  
        if (response.ok) {
          const data = await response.json();
          const { authToken, user, role, loggedIn } = data;
  
          localStorage.setItem("authToken", authToken);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("role", role);
          localStorage.setItem("loggedIn", loggedIn);
          alert("Login successful!");
          handleClear();
          if (role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
          
        } else {
          alert("Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Error logging in:", error);
      } 

  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-4">
          <div className="card p-4">
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>
              <button type="submit" className="btn btn-warning w-100">
                Login
              </button>
            </form>
            <div className="text-center mt-3">
              <p>
                Don't have an account? <a href="/signup">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
