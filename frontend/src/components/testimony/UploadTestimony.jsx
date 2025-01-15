import { useState } from "react";
import "./UploadTestimony.css";

const UploadTestimony = () => {
  const [name, setName] = useState("");
  const [testimony, setTestimony] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleClear = () => {
    setName("");
    setTestimony("");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/api/testimony`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ name, testimony }),
      });

      if (response.ok) {
        alert("Testimony uploaded successfully!");
        handleClear();
      } else {
        alert("Failed to upload testimony.");
      }
    } catch (error) {
      console.error("Error uploading testimony:", error);
      alert("Error uploading testimony.");
    }
  };

  return (
    <div className="upload-testimony-container">
      <div className="form-card">
        <h2>Share Your Experience</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="testimony">Your Testimony</label>
            <textarea
              id="testimony"
              value={testimony}
              onChange={(e) => setTestimony(e.target.value)}
              placeholder="Share your thoughts..."
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Submit Testimony
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadTestimony;
