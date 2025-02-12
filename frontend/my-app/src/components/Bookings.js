import { useEffect, useState } from 'react';
import axios from '../utils/api';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/bookings')
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Bookings</h1>
      <table className="w-full mt-6 border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="border px-4 py-2">{booking.name}</td>
              <td className="border px-4 py-2">{booking.date}</td>
              <td className="border px-4 py-2">{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;