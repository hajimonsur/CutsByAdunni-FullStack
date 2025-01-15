import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const AdminTestimony = () => {
  const [testimony, setTestimony] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTestimony, setSelectedTestimony] = useState(null);
  const apiurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTestimony = async () => {
      try {
        const response = await fetch(`${apiurl}/api/testimony`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await response.json();
        setTestimony(data);
      } catch (error) {
        console.error("Error fetching testimony:", error);
      }
    };

    fetchTestimony();
  }, []);

  const handleViewReview = (testimony) => {
    setSelectedTestimony(testimony);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTestimony(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiurl}/api/testimony/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (response.ok) {
        // Remove the deleted testimony from the list in the UI
        setTestimony(testimony.filter((item) => item._id !== id));
        alert("Testimonial deleted successfully");
        handleCloseModal(); // Close the modal after deletion
      } else {
        alert("Failed to delete testimonial");
      }
    } catch (error) {
      console.error("Error deleting testimony:", error);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Client Reviews</h1>
      <div className="row">
        {testimony.map((testimony) => (
          <div key={testimony._id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm border-0 rounded">
              <div className="card-body">
                <h5 className="card-title">{testimony.name}</h5>
                <p className="card-text text-muted">{testimony.testimony}</p>
                <Button
                  variant="warning"
                  className="mr-2"
                  onClick={() => handleViewReview(testimony)}
                >
                  View Review
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for viewing selected review */}
      {selectedTestimony && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Review by {selectedTestimony.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Review:</h5>
            <p>{selectedTestimony.testimony}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => handleDelete(selectedTestimony._id)}>
              Delete
            </Button>
            <Button variant="warning" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default AdminTestimony;
