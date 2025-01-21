import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Carousel,
} from "react-bootstrap"; // Import Bootstrap components

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // State for modal
  const [currentIndex, setCurrentIndex] = useState(0); // State for carousel index
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/portfolio/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch project details");
        }
        const data = await response.json();
        setProject(data);
        console.log(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProjectDetail();
  }, [id]);

  // Open modal for image or video
  const openModal = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Handle carousel slide change
  const handleSelect = (selectedIndex, e) => {
    setCurrentIndex(selectedIndex);
  };

  if (!project) return <div>Loading...</div>;

  return (
    <Container fluid="md" style={{ paddingTop: "50px", paddingBottom: "50px" }}>
      {/* Project Title */}
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">{project.title}</h1>
        </Col>
      </Row>

      {/* Side-by-Side Layout: Image and Description */}
      <Row className="mb-4 align-items-center">
        <Col md={6}>
          <Carousel indicators={false} controls={true}>
            {/* Carousel items: images and videos */}
            {project.images &&
              project.images.length > 0 &&
              project.images.map((url, index) => (
                <Carousel.Item key={index}>
                  {url.endsWith(".mp4") ? (
                    <video
                      className="d-block w-100"
                      controls
                      style={{
                        height: "70vh",
                        objectFit: "contain",
                        borderRadius: "10px",
                      }}
                    >
                      <source src={url} />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      className="d-block w-100"
                      src={url}
                      alt={`Project Image ${index + 1}`}
                      style={{
                        height: "70vh",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                      onClick={() => openModal(index)} // Open modal when clicked
                    />
                  )}
                </Carousel.Item>
              ))}

            {/* Carousel items: videos */}
            {project.videos &&
              project.videos.length > 0 &&
              project.videos.map((url, index) => (
                <Carousel.Item key={index}>
                  <video
                    className="d-block w-100"
                    controls
                    style={{
                      height: "70vh",
                      objectFit: "contain",
                      borderRadius: "10px",
                    }}
                  >
                    <source src={url} />
                    Your browser does not support the video tag.
                  </video>
                </Carousel.Item>
              ))}
          </Carousel>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-lg p-4 rounded">
            <Card.Body>
              <Card.Text>{project.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for image or video carousel */}
      <Modal show={modalOpen} onHide={closeModal} size="lg" centered>
        <Modal.Body>
          <Carousel activeIndex={currentIndex} onSelect={handleSelect}>
            {/* Carousel items: images and videos for modal */}
            {project.images &&
              project.images.length > 0 &&
              project.images.map((url, index) => (
                <Carousel.Item key={index}>
                  {url.endsWith(".mp4") ? (
                    <video
                      className="d-block w-100"
                      controls
                      style={{
                        maxHeight: "80vh",
                        objectFit: "contain",
                        width: "100%",
                        borderRadius: "10px",
                      }}
                    >
                      <source src={url} />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      className="d-block w-100"
                      src={url}
                      alt={`Project Image ${index + 1}`}
                      style={{
                        maxHeight: "80vh",
                        objectFit: "contain",
                        width: "100%",
                        borderRadius: "10px",
                      }}
                    />
                  )}
                </Carousel.Item>
              ))}

            {/* Carousel items: videos for modal */}
            {project.videos &&
              project.videos.length > 0 &&
              project.videos.map((url, index) => (
                <Carousel.Item key={index}>
                  <video
                    className="d-block w-100"
                    controls
                    style={{
                      maxHeight: "80vh",
                      objectFit: "contain",
                      width: "100%",
                      borderRadius: "10px",
                    }}
                  >
                    <source src={url} />
                    Your browser does not support the video tag.
                  </video>
                </Carousel.Item>
              ))}
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProjectDetailPage;