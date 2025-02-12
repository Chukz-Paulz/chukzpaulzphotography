import { useState, useEffect } from "react";
import "../styles/Portfolio.css";

const Portfolio = () => {
  const [photos, setPhotos] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // Fetch genres
    fetch("http://127.0.0.1:5000/genres")
      .then((res) => res.json())
      .then((data) => setGenres(data));

    // Fetch all images
    fetch("http://127.0.0.1:5000/get_images")
      .then((res) => res.json())
      .then((data) => setPhotos(data));
  }, []);

  return (
    <div className="portfolio">
      <h2>Our Portfolio</h2>

      {genres.map((genre) => (
        <div key={genre}>
          <h3>{genre}</h3>
          <div className="gallery">
            {photos
              .filter((photo) => photo.genre === genre)
              .map((photo, index) => (
                <img src={photo.url} alt={`Gallery ${index}`} key={index} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Portfolio;
