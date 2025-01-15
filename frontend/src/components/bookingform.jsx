import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

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
    <div>
      <h2>Book a Photoshoot</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Location:
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </label>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <button type="submit">Submit</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default BookingForm;
