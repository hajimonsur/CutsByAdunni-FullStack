import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const EditPortfolioPage = () => {
  const { id } = useParams(); // Get the portfolio item id from the URL params
  const navigate = useNavigate(); 

  const [portfolio, setPortfolio] = useState({
    title: '',
    description: '',
    images: [],
    category: '',

  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch the existing portfolio item data to pre-populate the form
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/portfolio/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio item');
        }
        const data = await response.json();
        setPortfolio(data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setMessage('Error loading portfolio item');
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/api/portfolio/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(portfolio),
      });

      if (!response.ok) {
        throw new Error('Failed to update portfolio item');
      }

      setMessage('Portfolio item updated successfully');
      navigate(`/portfolio/${id}`); // Redirect to the project details page after successful edit
    } catch (error) {
      console.error(error.message);
      setMessage('Error updating portfolio item');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPortfolio((prevPortfolio) => ({
      ...prevPortfolio,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setPortfolio((prevPortfolio) => ({
      ...prevPortfolio,
      images: e.target.value.split(','), // Assuming images are entered as comma-separated URLs
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1>Edit Portfolio Item</h1>

      {message && <Alert variant={message.includes('Error') ? 'danger' : 'success'}>{message}</Alert>}

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
          <Form.Label>Images (comma separated URLs)</Form.Label>
          <Form.Control
            type="text"
            name="images"
            value={portfolio.images.join(',')}
            onChange={handleImageChange}
          />
        </Form.Group>

        <Form.Group controlId="category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={portfolio.category}
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            <option value="design">Design</option>
            <option value="development">Development</option>
            <option value="marketing">Marketing</option>
            <option value="other">Other</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Update Portfolio
        </Button>
      </Form>
    </Container>
  );
};

export default EditPortfolioPage;
