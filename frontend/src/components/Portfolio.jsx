import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const images = [
    '/assets/photo1.jpg',
    '/assets/photo2.jpg',
    '/assets/photo3.jpg',
    '/assets/photo4.jpg',
  ];

  return (
    <div className="portfolio">
      <h2>Our Portfolio</h2>
      <div className="gallery">
        {images.map((image, index) => (
          <img src={image} alt={`Gallery ${index}`} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;