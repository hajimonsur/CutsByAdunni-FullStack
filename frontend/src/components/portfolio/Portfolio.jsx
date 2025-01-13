import { Card, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const PortfolioPage = () => {
  const styles = {
    section: {
      padding: '50px 20px',
      backgroundColor: '#F7F7F7',
      color: 'Black',
    },
    portfolioCard: {
      maxWidth: '350px',
      margin: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease',
    },
    cardImage: {
      borderRadius: '10px',
      height: '250px',
      objectFit: 'cover',
    },
    hoverCard: {
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
      },
    },
  };

  const [portfolioList, setPortfolioList] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/portfolio`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch portfolio items');
        }

        const data = await response.json();
        setPortfolioList(data); // Assuming the backend returns an array of portfolio items
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPortfolioItems();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '50px 20px', backgroundColor: '#F7F7F7', color: 'Black' }}>
        <h1>Our Portfolio</h1>
        <p>
          Discover the artistry of CutsByAdunni. Here are some of our most loved creations tailored for our clients.
        </p>
      </section>

      {/* Portfolio Section */}
      <section style={styles.section}>
        <h2 className="text-center">Our Creations</h2>
        <div className="d-flex flex-wrap justify-content-center mt-4">
          {portfolioList.map((item, index) => (
            <Card key={index} style={{ ...styles.portfolioCard, ...styles.hoverCard }}>
              <Card.Img
                variant="top"
                src={item.images[0]}
                alt={item.title}
                style={styles.cardImage}
              />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Button variant="warning" href={item.projectLink} target="_blank">
                  View Project
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '50px 20px', background: '#F7F7F7', color: 'Black' }}>
        <h2 className="text-center">What Our Clients Say</h2>
        <div className="d-flex flex-wrap justify-content-around mt-4">
          {/* Testimonials Cards */}
          {[
            {
              name: 'Ikobayo Tawakalitu',
              testimonial: "Cuts By Adunni brought my dream outfit to life. I felt so confident and beautiful!",
            },
            {
              name: 'Agbaje Islamiya',
              testimonial: "Excellent craftsmanship and attention to detail. My custom material was perfect!",
            },
            {
              name: 'Amode Yusuf',
              testimonial: "The damask dress I ordered was so beautiful. It made me stand out at the event, and everyone kept asking where I got it from. Thank you!",
            },
          ].map((client, index) => (
            <Card key={index} style={{ width: '300px', margin: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              <Card.Body>
                <h5 className="card-title">{client.name}</h5>
                <p className="card-text">"{client.testimonial}"</p>
              </Card.Body>
            </Card>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section style={styles.section}>
        <h2 className="text-center">Our Achievements</h2>
        <ul style={{ maxWidth: '600px', margin: '20px auto', listStyle: 'none' }}>
          <li style={{ marginBottom: '10px' }}>🎉 Over 500 satisfied returning clients.</li>
          <li style={{ marginBottom: '10px' }}>🌍 Featured in "Top Tailors in Lagos."</li>
          <li style={{ marginBottom: '10px' }}>🏆 Awarded "Best Tailor of the Year 2024."</li>
        </ul>
      </section>

      {/* Contact Section */}
      <section style={{ padding: '50px 20px', backgroundColor: '#F7F7F7', color: 'Black', textAlign: 'center' }}>
        <h2>Ready to Create Your Unique Outfit?</h2>
        <p>
          Contact us today to begin your journey with Cuts By Adunni. Let’s make your dream design a reality!
        </p>
        <Button variant="warning" size="lg" href="/contact" style={{ marginTop: '20px' }}>
          Contact Us
        </Button>
      </section>
    </div>
  );
};

export default PortfolioPage;
