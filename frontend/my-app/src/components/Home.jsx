import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

// Import multiple images
import heroImage1 from '../assets/DSC_2474c1-SM-Web.jpg';
import heroImage2 from '../assets/photo2.jpg';
import heroImage3 from '../assets/photo3.jpg';
import heroImage4 from '../assets/photo6.jpg';
import heroImage5 from '../assets/photo5.jpg';

const images = [heroImage1, heroImage2, heroImage3, heroImage4, heroImage5];  // Add more images if needed

const Home = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic slideshow every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5 seconds interval
    return () => clearInterval(timer);
  }, []);

  const handleExploreClick = () => {
    navigate('/portfolio');
  };

  // Manual controls
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="hero" style={{ backgroundImage: `url(${images[currentIndex]})` }}>
      <div className="content">
        <h1>Chukzpaulz Photography</h1>
        <p>Book a photoshoot, view your gallery, and create lasting memories.</p>
        <button className="btn-explore" onClick={handleExploreClick}>
          Explore Portfolio
        </button>
      </div>

      {/* Navigation Arrows */}
      <button className="nav-arrow left" onClick={prevSlide}>&#10094;</button>
      <button className="nav-arrow right" onClick={nextSlide}>&#10095;</button>

      {/* Dots for slide indicators */}
      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Home;
