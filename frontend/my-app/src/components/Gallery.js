import { useState, useEffect } from 'react';
import axios from '../utils/api';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get('/get_images?genre=user')
      .then((response) => setPhotos(response.data))
      .catch((error) => {
        console.error(error);
        setError("Failed to load images. Please try again later.");
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Your Photos</h1>
      {error && <p className="text-red-500">{error}</p>}
      {photos.length === 0 && !error ? (
        <p>No photos available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {photos.map((photo) => (
            <div key={photo.url} className="relative">
              <img src={photo.url} alt={photo.genre} className="rounded shadow" />
              <p className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
                {photo.genre}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
