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
      const formattedDate = selectedDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',  // <-- add year here
      }); 
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...reservationData,
          date: formattedDate,
          time: selectedTime
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setIsloading(false);
      }
    } catch (error) {
      setIsloading(false)
      toast.error('Error submitting reservation');
    } finally {
      setIsloading(false)

    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md my-10 mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Reservation Confirmed!</h2>
        <p>
          Thank you for your reservation. We'll see you on {selectedDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric'
          })} at {selectedTime}.
        </p>

        <p className="mt-2">A confirmation email has been sent with management options.</p>
      </div>
    );
  }

  return (
    <div className='mb-6'>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold ">Make a Reservation</h1></div>
      <div className="flex mx-auto p-4 justify-center gap-8 flex-wrap">

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

      <div className='max-w-md mx-auto '>
      </div>
    </div>
  );
}