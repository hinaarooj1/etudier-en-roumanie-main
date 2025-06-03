// components/TimeSlots.js
"use client";
import { useState ,useEffect} from 'react';
export default function TimeSlots({  onTimeSelect,selectedDate }) { 
   
    const timeSlots = [
      '09:00', '10:00', '11:00', '12:00', 
      '13:00', '14:00', '15:00', '16:00'
    ];
    
    const [selectedTime, setSelectedTime] = useState(null);
   
  
    if (!selectedDate) return null;
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Available Times:</h3>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map(time => (
            <button
              key={time}
              onClick={() => {
                setSelectedTime(time);
                onTimeSelect(time);
              }}
              className={`p-2 border rounded ${selectedTime === time ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    );
  }