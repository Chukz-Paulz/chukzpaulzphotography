const express = require('express');
const multer = require('multer');
const cloudinary = require('./cloudinaryConfig');
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temporary storage

// Endpoint to handle image uploads
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file.path; // Path of the uploaded image
    const result = await cloudinary.uploader.upload(file, {
      folder: 'chukzpaulz_photography', // Folder in Cloudinary
    });

    res.json({ url: result.secure_url }); // Return the image URL
  } catch (error) {
    res.status(500).json({ error: 'Image upload failed!' });
  }
});