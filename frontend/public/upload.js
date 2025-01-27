document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.getElementById("uploadForm");
    const fileInput = document.getElementById("fileInput");
    const uploadResult = document.getElementById("uploadResult");
  
    uploadForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent form submission from reloading the page
  
      const file = fileInput.files[0];
      if (!file) {
        uploadResult.innerHTML = "<p>Please select a file to upload.</p>";
        return;
      }
  
      const formData = new FormData();
      formData.append("image", file);
  
      try {
        const response = await fetch("http://127.0.0.1:5001/upload", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          const result = await response.json();
          uploadResult.innerHTML = `<p>Image uploaded successfully: <a href="${result.imageUrl}" target="_blank">View Image</a></p>`;
        } else {
          const error = await response.json();
          uploadResult.innerHTML = `<p>Error: ${error.message}</p>`;
        }
      } catch (error) {
        console.error("Upload failed:", error);
        uploadResult.innerHTML = "<p>An error occurred during the upload. Please try again.</p>";
      }
    });
  });
  