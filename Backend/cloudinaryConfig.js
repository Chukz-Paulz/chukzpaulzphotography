// /Backend/app/config/cloudinaryConfig.js

const cloudinary = require('cloudinary').v2; // Use cloudinary's v2 API for simplicity
require('dotenv').config(); // For reading .env file to store sensitive data like API keys

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
