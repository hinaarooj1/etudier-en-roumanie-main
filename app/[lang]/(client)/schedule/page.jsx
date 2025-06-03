'use client'
import { useState } from 'react';
import Calendar from "@/components/Calendar";
import TimeSlots from '@/components/TimeSlots';
import ReservationForm from '@/components/ReservationForm';

export default function Reservations() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isloading, setIsloading] = useState(false);

  // Convert Date object to string when passing to Calendar
  const calendarSelectedDate = selectedDate ? new Date(selectedDate) : null;

  const handleSubmit = async (reservationData) => {
    try {
      setIsloading(true)
      console.log('selectedDate: ', selectedDate);
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...reservationData,
          date: selectedDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric'
          }),
          time: selectedTime
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setIsloading(false);
      }
    } catch (error) {
      setIsloading(false)
      console.error('Error submitting reservation:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Reservation Confirmed!</h2>
        <p>
          Thank you for your reservation. We'll see you on {selectedDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric'
          })} at {selectedTime}.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Make a Reservation</h1>

      <Calendar
        selectedDate={calendarSelectedDate}
        setSelectedDate={setSelectedDate}
      />

      <TimeSlots
        selectedDate={selectedDate}
        onTimeSelect={setSelectedTime}
      />

      {selectedDate && selectedTime && (
        <ReservationForm
          date={selectedDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric'
          })}
          isloading={isloading}
          time={selectedTime}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}