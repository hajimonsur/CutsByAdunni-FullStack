import React from "react";
import { Widget } from "@uploadcare/react-widget";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

const UpdatePortfolio = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);

  const pubKey = import.meta.env.VITE_REACT_APP_UPLOADCARE_PUBLIC_KEY;
  const apiUrl = import.meta.env.VITE_API_URL;

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
          images,
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
    setImages([]);
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

            <div className="mb-3">
              <label
                htmlFor="uploadcareUploader"
                className="form-label d-block mb-2"
              >
                Upload Images
              </label>
              <Widget
                publicKey={pubKey}
                multiple={false} // Disable multiple file selection
                onChange={(fileInfo) => {
                  // Extract the URL for the single uploaded file
                  const url = fileInfo.cdnUrl;

                  // Update state with the single image URL
                  setImages([url]); // Use an array to stay consistent if your state expects multiple images
                }}
              />
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label="Default select example"
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
        </div>
      </div>
    </div>
  );
};

export default UpdatePortfolio;
