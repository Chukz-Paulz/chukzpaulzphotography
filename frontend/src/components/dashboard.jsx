import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

function Dashboard() {
  const [closeData, setCloseData] = useState({
    location: "",
    date: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCloseData({ ...closeData, [name]: value });
  };

  const handleCloseDay = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/close_day`, closeData);
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleCloseDay}>
        <label>
          Location:
          <input type="text" name="location" value={closeData.location} onChange={handleChange} required />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={closeData.date} onChange={handleChange} required />
        </label>
        <button type="submit">Close Day</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default Dashboard;
