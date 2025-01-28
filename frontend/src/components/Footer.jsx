import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      style={{
        background: '#121212',
        color: '#fff',
        textAlign: 'center',
        padding: '20px 0',
        position: 'relative',
        width: '100%',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Footer Text */}
      <p style={{ marginBottom: '10px' }}>&copy; 2025 CutByAdunni. All rights reserved.</p>

      {/* Social Media Icons */}
      <div style={{ marginBottom: '15px' }}>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#fff',
            margin: '0 10px',
            fontSize: '24px',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#1877F2')}
          onMouseLeave={(e) => (e.target.style.color = '#fff')}
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.instagram.com/adunni_dunnki"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#fff',
            margin: '0 10px',
            fontSize: '24px',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#E4405F')}
          onMouseLeave={(e) => (e.target.style.color = '#fff')}
        >
          <FaInstagram />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#fff',
            margin: '0 10px',
            fontSize: '24px',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#1DA1F2')}
          onMouseLeave={(e) => (e.target.style.color = '#fff')}
        >
          <FaTwitter />
        </a>
       
      </div>

      {/* Footer Text (Mobile friendly) */}
      <p
        style={{
          fontSize: '14px',
          opacity: 0.7,
          marginTop: '10px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        Designed and developed by XHINA Tech
      </p>
    </footer>
  );
};

export default Footer;
