import React from 'react';
import { Link } from 'react-router-dom';  // Use Link from react-router-dom for navigation
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Chukzpaulz Photography</div>
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>  {/* Use Link for navigation */}
        <li><Link to="/portfolio">Portfolio</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
