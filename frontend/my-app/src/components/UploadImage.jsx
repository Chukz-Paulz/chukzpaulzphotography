import { useState, useEffect } from "react";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [genre, setGenre] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch existing genres from the backend
    fetch("http://127.0.0.1:5000/genres")
      .then((res) => res.json())
      .then((data) => setGenres(data))
      .catch((err) => console.error("Failed to load genres:", err));
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("genre", newGenre || genre); // Use newGenre if provided

    try {
      const response = await fetch("http://127.0.0.1:5000/upload_image", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`Image uploaded successfully: <a href="${result.url}" target="_blank">View Image</a>`);
        setFile(null);
        setNewGenre("");
        setGenre("");
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage("An error occurred during the upload. Please try again.");
    }
  };

  return (
    <div className="upload-section">
      <h2>Upload Image</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <div>
          <label>Select Image:</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        <div>
          <label>Choose Existing Genre:</label>
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">Select Genre</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Or Add New Genre:</label>
          <input
            type="text"
            placeholder="Enter New Genre"
            value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)}
          />
        </div>

        <button type="submit">Upload</button>
      </form>

      {message && (
        <p
          className="upload-message"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
    </div>
  );
};

export default UploadImage;
