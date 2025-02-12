import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Home from './components/Home';  
import Portfolio from './components/Portfolio';
import BookingForm from './components/BookingForm';
import Dashboard from './components/Dashboard';
import './styles/app.css';  

function App() {
  return (
    <Router>
      <Navbar />  {/* Navbar appears on every page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/bookingform" element={<BookingForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
