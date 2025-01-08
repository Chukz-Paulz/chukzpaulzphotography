import React, { useState, useEffect } from 'react';
import axios from '../utils/api';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios.get('/photos/user')
      .then((response) => setPhotos(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Your Photos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {photos.map((photo) => (
          <div key={photo.id} className="relative">
            <img src={photo.url} alt={photo.name} className="rounded shadow" />
            <p className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">{photo.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;