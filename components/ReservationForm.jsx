// components/ReservationForm.js
"use client";
import { useState } from 'react';

export default function ReservationForm({ date, time, onSubmit ,isloading}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ date, time, name, email  });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <h3 className="text-lg font-semibold">Reservation Details</h3>
      <p>Date: {date} at {time}</p>
      
      <div>
        <label className="block mb-1">Name</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label className="block mb-1">Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      
      
      <button 
      disabled={isloading}
        type="submit" 
        style={{ backgroundColor: isloading ? '#ccc' : '#007bff' }}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Confirm Reservation
      </button>
    </form>
  );
}