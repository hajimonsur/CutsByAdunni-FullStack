"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";

const EditPortfolioPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [portfolio, setPortfolio] = useState({
    title: "",
    description: "",
    images: [],
    category: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const cloudName = import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/portfolio/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch portfolio item");
        const data = await response.json();
        setPortfolio(data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setMessage("Error loading portfolio item");
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("upload_preset", uploadPreset);
    formData.append("file", file);

    const resourceType = file.type.startsWith("video") ? "video" : "image";

    try {
      setUploading(true);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("File upload failed");

      const data = await response.json();
      setPortfolio((prevPortfolio) => ({
        ...prevPortfolio,
        images: [...prevPortfolio.images, data.secure_url],
      }));
      setUploading(false);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Error uploading file");
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/api/portfolio/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(portfolio),
      });

      if (!response.ok) throw new Error("Failed to update portfolio item");

      setMessage("Portfolio item updated successfully");
      navigate(`/portfolio`);
    } catch (error) {
      console.error(error.message);
      setMessage("Error updating portfolio item");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPortfolio((prevPortfolio) => ({
      ...prevPortfolio,
      [name]: value,
    }));
  };

  const handleRemoveImage = (imageToRemove) => {
    setPortfolio((prevPortfolio) => ({
      ...prevPortfolio,
      images: prevPortfolio.images.filter((image) => image !== imageToRemove),
    }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <h1>Edit Portfolio Item</h1>

      {message && (
        <Alert variant={message.includes("Error") ? "danger" : "success"}>
          {message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={portfolio.title}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="description" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={4}
            value={portfolio.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="images" className="mt-3">
          <Form.Label>Upload Images or Videos</Form.Label>
          <Form.Control
            type="file"
            accept="image/*,video/*"
            onChange={handleFileUpload}
          />
          {uploading && <p>Uploading...</p>}
          <div className="mt-2">
            {portfolio.images.map((image, index) => {
              const isVideo = image.endsWith(".mp4");
              return (
                <div
                  key={index}
                  style={{ display: "inline-block", marginRight: "10px" }}
                >
                  {isVideo ? (
                    <video
                      src={image}
                      controls
                      style={{
                        width: "100px",
                        height: "100px",
                      }}
                    />
                  ) : (
                    <img
                      src={image}
                      alt={`Portfolio ${index}`}
                      style={{
                        width: "100px",
                        height: "100px",
                      }}
                    />
                  )}
                  <Button
                    variant="danger"
                    size="sm"
                    className="mt-2"
                    onClick={() => handleRemoveImage(image)}
                  >
                    X
                  </Button>
                </div>
              );
            })}
          </div>
        </Form.Group>

        <Form.Group controlId="category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={portfolio.category}
            onChange={handleInputChange}
          >
            <option>Select Category</option>
            <option value="casual">Casual</option>
            <option value="traditional">Traditional</option>
            <option value="bridal">Bridal</option>
            <option value="formal">Formal</option>
            <option value="others">Other</option>
          </Form.Control>
        </Form.Group>

        <Button variant="warning" type="submit" className="mt-4 mb-4">
          Update Portfolio
        </Button>
      </Form>
    </Container>
  );
};

export default EditPortfolioPage;
