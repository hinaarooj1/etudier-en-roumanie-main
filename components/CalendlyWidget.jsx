"use client";
// components/Calendar.js
import { useState } from 'react';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  
  // June 2025 data
  const daysInMonth = 30;
  const startingDay = 0; // June 1, 2025 is Sunday
  const weeks = [];
  
  let days = [];
  // Add empty cells for days before the 1st
  for (let i = 0; i < startingDay; i++) {
    days.push(<td key={`empty-${i}`}></td>);
  }
  
  // Add day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const isSelected = selectedDate === day;
    days.push(
      <td 
        key={day} 
        onClick={() => setSelectedDate(day)}
        className={`p-2 text-center ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 cursor-pointer'}`}
      >
        {day}
      </td>
    );
    
    // Start new row after 7 days
    if ((day + startingDay) % 7 === 0 || day === daysInMonth) {
      weeks.push(<tr key={`week-${weeks.length}`}>{days}</tr>);
      days = [];
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">June 2025</h2>
      <table className="w-full">
        <thead>
          <tr>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <th key={day} className="p-2 text-center">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{weeks}</tbody>
      </table>
    </div>
  );
}