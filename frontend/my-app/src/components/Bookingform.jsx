import { useState } from "react";
import axios from "axios";
import process from 'process'
import '../styles/Bookingform.css';

const API_BASE_URL = process.env.REACT_APP_API_URL; 

function BookingForm() {
  const [formData, setFormData] = useState({
    location: "",
    date: "",
    name: "",
    email: "",
    phone: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/book`, {
        location: formData.location,
        date: formData.date,
        user_details: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
      });
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="booking-form-container">
  <h2>Book Photoshoot/Coverage</h2>
  <form onSubmit={handleSubmit}>
    <label>Location:</label>
    <input type="text" name="location" value={formData.location} onChange={handleChange} required />

    <label>Date:</label>
    <input type="date" name="date" value={formData.date} onChange={handleChange} required />

    <label>Name:</label>
    <input type="text" name="name" value={formData.name} onChange={handleChange} required />

    <label>Email:</label>
    <input type="email" name="email" value={formData.email} onChange={handleChange} required />

    <label>Phone:</label>
    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

    <button type="submit">Submit</button>
  </form>

  {responseMessage && (
    <p className={`response-message ${responseMessage.includes("successful") ? 'success' : 'error'}`}>
      {responseMessage}
    </p>
  )}
</div>

  );
}

export default BookingForm;
