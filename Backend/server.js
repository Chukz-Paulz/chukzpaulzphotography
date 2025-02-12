const http = require('http'); // For HTTP server
const express = require('express'); // For routing and middleware
const path = require('path'); // For path operations
const multer = require('multer'); // For handling file uploads
const fs = require('fs'); // For filesystem operations
const cloudinary = require('./cloudinaryConfig'); // Cloudinary configuration
const cors = require('cors'); // Import cors middleware


// Create the Express app
const app = express();

app.use(cors());

// Middleware for parsing JSON (if needed for your API)
app.use(express.json());

// Define allowed image formats and max size
const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

// Setup Multer for temporary file storage
const upload = multer({
  dest: 'uploads/', // Temporary storage folder
  fileFilter: (req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type, only JPEG, JPG, and PNG are allowed'), false);
    }
    cb(null, true);
  },
  limits: { fileSize: MAX_SIZE },
});

// Define the upload route
app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const filePath = req.file.path;

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'chukzpaulz_photography', // Cloudinary folder
    });

    // Cleanup: Remove the temporary file
    fs.unlinkSync(filePath);

    res.status(200).json({ url: result.secure_url }); // Return the image URL
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Image upload failed!' });
  }
});

// Serve static files (optional, for a frontend app or documentation)
app.use('/static', express.static(path.join(__dirname, 'public')));

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

