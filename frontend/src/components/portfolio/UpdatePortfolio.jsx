import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdatePortfolio = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const [media, setMedia] = useState([]); // Store media URLs

  const cloudName = import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET;
  const apiUrl = import.meta.env.VITE_API_URL;

  // Handle file input change to upload media
  const handleFileChange = async (e) => {
    const files = e.target.files;
  
    if (files.length > 0) {
      try {
        // For each file, upload to Cloudinary and update the media state immediately
        for (let file of files) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", `${uploadPreset}`);
  
          const resourceType = file.type.startsWith("video")
            ? "video"
            : "image";
  
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
            {
              method: "POST",
              body: formData,
            }
          );
  
          if (response.ok) {
            const data = await response.json();
            console.log(`Uploaded ${file.name}: ${data.secure_url}`); // Debugging the URL
  
            // Immediately update the media state with the new URL
            setMedia((prevMedia) => [...prevMedia, data.secure_url]);
          } else {
            console.error("Failed to upload file:", file.name);
          }
        }
      } catch (error) {
        console.error("Error uploading files to Cloudinary:", error);
      }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/api/portfolio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          title,
          description,
          category,
          images: media,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Portfolio updated successfully!");
      } else {
        setError(
          data.message || "An error occurred while updating the portfolio."
        );
      }
    } catch (error) {
      console.error(error.message);
      setError("An error occurred while submitting the portfolio.");
    }

    setTitle("");
    setDescription("");
    setCategory("");
    setMedia([]);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Update Portfolio</h1>

          <Form className="shadow p-4 rounded bg-light" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                className="shadow-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="textarea">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Write your description here..."
                className="shadow-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            {/* Media Upload */}
            <Form.Group className="mb-3">
              <Form.Label>Upload Media (Images & Videos)</Form.Label>
              <Form.Control type="file" multiple onChange={handleFileChange} />
            </Form.Group>

            {/* Display Uploaded Media */}
            <div className="mb-3">
              <h5>Uploaded Media:</h5>
              <div className="d-flex flex-wrap">
                {media.map((url, index) => (
                  <div key={index} className="me-3 mb-3">
                    {url.endsWith(".mp4") || url.endsWith(".mov") ? (
                      <video width="150" height="150" controls>
                        <source src={url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={url}
                        alt={`uploaded-media-${index}`}
                        width="150"
                        height="150"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Category Selection */}
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label="Select category"
                className="shadow-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Select Category</option>
                <option value="casual">Casual</option>
                <option value="traditional">Traditional</option>
                <option value="bridal">Bridal</option>
                <option value="formal">Formal</option>
                <option value="others">Other</option>
              </Form.Select>
            </Form.Group>

            {/* Submit Button */}
            <div className="d-grid">
              <Button
                variant="warning"
                type="submit"
                className="shadow-sm py-2"
              >
                Submit
              </Button>
            </div>
          </Form>

          {/* Error Message */}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default UpdatePortfolio;
