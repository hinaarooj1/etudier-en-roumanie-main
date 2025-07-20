// components/TimeSlots.js
"use client";
import { useState, useEffect } from 'react';

export default function TimeSlots({ onTimeSelect, selectedDate }) {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [allSlots, setAllSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to get local date string
  const getLocalDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (!selectedDate) {
      setAvailableSlots([]);
      setAllSlots([]);
      setSelectedTime(null);
      return;
    }

    const fetchTimeSlots = async () => {
      setLoading(true);
      setError(null);
      setSelectedTime(null); // Clear selected time when loading new slots
      onTimeSelect(null); // Notify parent that selection is cleared
      
      try {
        const dateStr = getLocalDateString(selectedDate);
        const res = await fetch(`/api/time-slots?date=${dateStr}`);

        if (!res.ok) {
          throw new Error('Failed to fetch time slots');
        }

        const data = await res.json();
        setAvailableSlots(data.availableSlots);
        setAllSlots(data.allSlots);
      } catch (err) {
        setError(err.message || 'Unknown error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeSlots();
  }, [selectedDate]);

  if (!selectedDate) return null;

  return (
    <div className="mt-6" style={{ minWidth: '300px' }}>
      <h3 className="text-lg font-semibold mb-3">Available Times:</h3>

      {loading && (
        <div className="flex flex-col items-center justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
          <p>Loading time slots...</p>
        </div>
      )}

      {error && <p className="text-red-500 mb-3">{error}</p>}

      {!loading && (
        <div className="grid grid-cols-3 gap-2">
          {allSlots.map(time => {
            const isAvailable = availableSlots.includes(time);
            const isSelected = selectedTime === time;

            return (
              <button
                key={time}
                onClick={() => {
                  if (!isAvailable) return;
                  setSelectedTime(time);
                  onTimeSelect(time);
                }}
                className={`p-2 border rounded transition-colors ${
                  isSelected
                    ? 'bg-blue-500 text-white'
                    : isAvailable
                      ? 'hover:bg-gray-100'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!isAvailable}
              >
                {time}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}