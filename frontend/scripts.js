document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
  
    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      if (data.url) {
        document.getElementById('uploadResult').innerHTML = `
          <p>Image uploaded successfully!</p>
          <img src="${data.url}" alt="Uploaded Image" />
        `;
      } else {
        document.getElementById('uploadResult').innerHTML = '<p>Upload failed!</p>';
      }
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  });