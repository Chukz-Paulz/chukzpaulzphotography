import { useState, useEffect } from "react";
import axios from "axios";
import process from 'process';
import UploadImage from "./UploadImage"; // Import UploadImage
import '../styles/Dashboard.css';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const [closeData, setCloseData] = useState({ location: "", date: "" });
  const [responseMessage, setResponseMessage] = useState("");
  const [statistics, setStatistics] = useState({
    totalBookings: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/statistics`);
      setStatistics(response.data);
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCloseData({ ...closeData, [name]: value });
  };

  const handleCloseDay = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/close_day`, closeData);
      setResponseMessage(response.data.message);
      fetchStatistics();
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

      {/* Form to Close Day */}
      <form onSubmit={handleCloseDay}>
        <input
          type="text"
          name="location"
          value={closeData.location}
          onChange={handleChange}
          placeholder="Enter Location"
          required
        />
        <input
          type="date"
          name="date"
          value={closeData.date}
          onChange={handleChange}
          required
        />
        <button type="submit">Close Day</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}

      {/* Statistics Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <h2>Total Bookings</h2>
          <p>{statistics.totalBookings}</p>
        </div>
        <div className="stat-card">
          <h2>Users</h2>
          <p>{statistics.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h2>Revenue</h2>
          <p>₦{statistics.totalRevenue}</p>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="upload-section">
        <h2>Upload New Image</h2>
        <UploadImage />  {/* Embedding UploadImage here */}
      </div>
    </div>
  );
};

export default Dashboard;
