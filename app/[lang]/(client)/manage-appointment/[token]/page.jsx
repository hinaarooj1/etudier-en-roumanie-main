'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Calendar from '@/components/Calendar';
import TimeSlots from '@/components/TimeSlots';
import { use } from 'react';
import { toast } from 'sonner';

function Loader() {
    return (
        <div className="flex justify-center items-center h-48">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-4 text-blue-600 font-semibold">Loading appointment...</span>
        </div>
    );
}

export default function ManageAppointment({ params }) {
    const { token } = use(params);
    const router = useRouter();
    const [reservation, setReservation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [action, setAction] = useState('');
    const [expired, setExpired] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Format date with year
    const formatDateWithYear = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Determine if the confirm button should be disabled
    const isButtonDisabled = expired || !action ||
        (action === 'reschedule' && (!selectedDate || !selectedTime));

    useEffect(() => {
        if (!token) {
            setError('No token provided');
            setLoading(false);
            return;
        }

        const fetchReservation = async () => {
            try {
                const response = await fetch(`/api/reservations/manage?token=${token}`);
                const data = await response.json();

                if (response.ok) {
                    setReservation(data.reservation);
                    setSelectedDate(new Date(data.reservation.date));

                    const now = new Date();
                    const appointmentDateTime = new Date(`${data.reservation.date} ${data.reservation.time}`);

                    if (now > appointmentDateTime) {
                        setExpired(true);
                    }
                } else {
                    setError(data.error || 'Failed to load reservation');
                }
            } catch (err) {
                setError('Failed to connect to server');
            } finally {
                setLoading(false);
            }
        };

        fetchReservation();
    }, [token]);

    const handleSubmit = async () => {
        if (expired) {
            setError('This link has expired. You can no longer modify the appointment.');
            return;
        }

        if (!action) {
            setError('Please select an action');
            return;
        }

        if (action === 'reschedule' && (!selectedDate || !selectedTime)) {
            setError('Please select a new date and time');
            return;
        }

        try {
            setisLoading(true); 
            const response = await fetch('/api/reservations/manage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    action,
                    newDate: selectedDate?.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'  // Added year here for the API
                    }),
                    newTime: selectedTime,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSubmitted(true);

                toast.success(data.message);
                setSuccessMessage(data.message);
                router.push('/');
            } else {
                setError(data.error || 'Failed to process request');
            }
        } catch (err) {
            toast.error("Something went wrong while processing your request.");
            setError('Failed to connect to server');
        } finally {
            setisLoading(false);
        }
    };

    if (loading) return <Loader />;
    if (!reservation) return <div className='my-6 text-center'>Reservation not found</div>;

    if (expired) {
        return (
            <div className="max-w-md mx-auto p-4 my-6 text-center">
                <h1 className="text-2xl font-bold mb-4">Appointment Link Expired</h1>
                <p className="">
                    Unfortunately, your appointment date/time has already passed, so you can no longer modify or cancel it.
                </p>
            </div>
        );
    }

    if (isSubmitted) {
        return (
            <div className="max-w-md my-10 mx-auto p-4 text-center">
                <h2 className="text-2xl font-bold mb-4">{successMessage}!</h2>
                 

                <p className="mt-2">A confirmation email has been sent with management options.</p>
            </div>
        );
    }
    return (
        <div className="mx-auto p-4">
            <h1 className="text-2xl text-center font-bold mb-6">Manage Your Appointment</h1>

            <div className="flex flex-col md:flex-row gap-8 mx-auto justify-center items-start sdsds">
                {/* First Column - Current Appointment + Actions */}
                <div className="flex-1" style={{ maxWidth: "400px" }}>
                    <div className="mb-6 p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">Current Appointment</h2>
                        <p className="mb-1">Date: {formatDateWithYear(reservation.date)}</p>
                        <p className="mb-4">Time: {reservation.time}</p>

                        <h2 className="text-lg font-semibold mb-2">Select Action</h2>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="action"
                                    value="cancel"
                                    checked={action === 'cancel'}
                                    onChange={() => {
                                        setAction('cancel');
                                        setError('');
                                    }}
                                    className="mr-2"
                                />
                                Cancel Appointment
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="action"
                                    value="reschedule"
                                    checked={action === 'reschedule'}
                                    onChange={() => {
                                        setAction('reschedule');
                                        setError('');
                                    }}
                                    className="mr-2"
                                />
                                Reschedule Appointment
                            </label>
                        </div>
                    </div>
                </div>

                {/* Second Column - Calendar */}
                {action === 'reschedule' && (
                    <div style={{ maxWidth: "max-content" }} className="flex-1 p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Select New Date</h2>
                        <Calendar
                            selectedDate={selectedDate}
                            setSelectedDate={(date) => {
                                setSelectedDate(date);
                                setSelectedTime('');
                                setError('');
                            }}
                        />
                    </div>
                )}

                {/* Third Column - Available Times */}
                {action === 'reschedule' && selectedDate && (
                    <div style={{ maxWidth: "max-content" }} className="flex-1 p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Available Times</h2>
                        <TimeSlots
                            selectedDate={selectedDate}
                            onTimeSelect={(time) => {
                                setSelectedTime(time);
                                setError('');
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <div className="my-6 mx-auto text-center">
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <button
                    onClick={handleSubmit}
                    disabled={isButtonDisabled || isLoading}
                    className={`px-4 py-2 rounded text-white ${isButtonDisabled || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                >
                    {isLoading ? 'Processing...' : 'Confirm Changes'}
                </button>
            </div>
        </div>
    );
}