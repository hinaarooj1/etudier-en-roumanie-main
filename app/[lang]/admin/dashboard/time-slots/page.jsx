// app/admin/time-slots/disabled/page.js
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DisabledSlotsManager() {
  const [disabledSlots, setDisabledSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({
    date: new Date().toISOString().split('T')[0],
    startTime: '12:00',
    endTime: '13:00',
    isRecurring: false,
    reason: 'Lunch break'
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDisabledSlots = async () => {
      try {
        const response = await fetch('/api/time-slots/disabled');
        const data = await response.json();
        setDisabledSlots(data);
      } catch (error) {
        console.error('Failed to fetch disabled slots:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDisabledSlots();
  }, []);

  const handleAddDisabledSlot = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/time-slots/disabled', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSlot),
      });
      if (!response.ok) throw new Error('Failed to add disabled slot');
      const addedSlot = await response.json();
      setDisabledSlots([...disabledSlots, addedSlot]);
      setNewSlot({
        date: new Date().toISOString().split('T')[0],
        startTime: '12:00',
        endTime: '13:00',
        isRecurring: false,
        reason: ''
      });
      alert('Disabled slot added successfully!');
    } catch (error) {
      console.error('Error adding disabled slot:', error);
      alert('Failed to add disabled slot');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/time-slots/disabled?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete disabled slot');
      setDisabledSlots(disabledSlots.filter(slot => slot.id !== id));
    } catch (error) {
      console.error('Error deleting disabled slot:', error);
      alert('Failed to delete disabled slot');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Disabled Time Slots</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Add Disabled Slot</h2>
          <form onSubmit={handleAddDisabledSlot} className="space-y-4">
            <div>
              <label className="block mb-1">Date:</label>
              <input
                type="date"
                value={newSlot.date}
                onChange={(e) => setNewSlot({...newSlot, date: e.target.value})}
                className="w-full p-2 border rounded"
                disabled={newSlot.isRecurring}
                required={!newSlot.isRecurring}
              />
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newSlot.isRecurring}
                  onChange={(e) => setNewSlot({...newSlot, isRecurring: e.target.checked})}
                  className="p-2 border rounded"
                />
                <span>Recurring (weekly)</span>
              </label>
            </div>
            {newSlot.isRecurring && (
              <div>
                <label className="block mb-1">Day of Week:</label>
                <select
                  value={newSlot.dayOfWeek || 0}
                  onChange={(e) => setNewSlot({...newSlot, dayOfWeek: Number(e.target.value)})}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value={0}>Sunday</option>
                  <option value={1}>Monday</option>
                  <option value={2}>Tuesday</option>
                  <option value={3}>Wednesday</option>
                  <option value={4}>Thursday</option>
                  <option value={5}>Friday</option>
                  <option value={6}>Saturday</option>
                </select>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Start Time:</label>
                <input
                  type="time"
                  value={newSlot.startTime}
                  onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">End Time:</label>
                <input
                  type="time"
                  value={newSlot.endTime}
                  onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block mb-1">Reason (optional):</label>
              <input
                type="text"
                value={newSlot.reason || ''}
                onChange={(e) => setNewSlot({...newSlot, reason: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="E.g., Maintenance, Lunch break"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Disabled Slot
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Current Disabled Slots</h2>
          {disabledSlots.length === 0 ? (
            <p>No disabled slots configured</p>
          ) : (
            <div className="space-y-2">
              {disabledSlots.map((slot) => (
                <div key={slot.id} className="border p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium">
                      {slot.isRecurring 
                        ? `Every ${getDayName(slot.dayOfWeek || 0)}` 
                        : new Date(slot.date).toLocaleDateString()}
                    </p>
                    <p>
                      {slot.startTime} - {slot.endTime}
                      {slot.reason && ` (${slot.reason})`}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(slot.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getDayName(dayOfWeek) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayOfWeek];
}