"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reasonRef = useRef('');
  const [updatingId, setUpdatingId] = useState(null);

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/reservations/admin');

        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }

        const data = await response.json();
        setAppointments(data.data || []);
        setError(null);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);
  const updateAppointmentStatus = async (id, status, reason = "") => {
    try {
      const response = await fetch(`/api/reservations/admin/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, reason }),
      });

      if (!response.ok) {
        toast.error(`Failed to update appointment`);

        throw new Error("Failed to update appointment");
      }

      const updatedResponse = await fetch('/api/reservations/admin');
      const updatedData = await updatedResponse.json();
      setAppointments(updatedData.data || []);

      toast.success(`Appointment marked as ${status.toLowerCase()}`);
    } catch (error) {
      toast.error(error.message || "Could not update appointment");
    }
  };
  function Modal({ isOpen, onClose, onConfirm, children }) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
          {children}
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={onConfirm}>Confirm</Button>
          </div>
        </div>
      </div>
    );
  }
  const openCancelModal = (id) => {
    setSelectedAppointmentId(id);
    setCancelReason("");
    setCancelModalOpen(true);
  };

  // Confirm cancellation from modal
  const confirmCancel = () => {

    setUpdatingId(selectedAppointmentId);
    updateAppointmentStatus(selectedAppointmentId, "CANCELLED", reasonRef.current).finally(() => {
      setUpdatingId(null);
      setCancelModalOpen(false);
    });
    setCancelModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Appointments Management</CardTitle>
          <CardDescription>View and manage all appointments</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading appointments...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">
              Error loading appointments: {error}
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-4">No appointments found</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="p-4">
                  <div className="flex flex-col md:flex-col gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{appointment.name}</h3>
                        <Badge
                          variant={
                            appointment.status === 'COMPLETED'
                              ? 'default'
                              : appointment.status === 'CANCELLED'
                                ? 'destructive'
                                : 'secondary'
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{appointment.email}</p>
                      <p className="text-sm">
                        {format(new Date(appointment.date), "PPP")} at {appointment.time}
                      </p>
                      {appointment.phone && (
                        <p className="text-sm">Phone: {appointment.phone}</p>
                      )}
                    </div>

                    {appointment.status !== 'COMPLETED' && appointment.status !== 'CANCELLED' && (
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setUpdatingId(appointment.id);
                            updateAppointmentStatus(appointment.id, "COMPLETED").finally(() => setUpdatingId(null));
                          }}
                          disabled={updatingId === appointment.id}
                        >
                          {updatingId === appointment.id ? "Updating..." : "Mark Completed"}
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => openCancelModal(appointment.id)}
                          disabled={updatingId === appointment.id}
                        >
                          {updatingId === appointment.id ? "Updating..." : "Cancel"}
                        </Button>

                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

          )}
        </CardContent>
      </Card>
      <Modal
        isOpen={cancelModalOpen}
        onClose={() => {
          setCancelModalOpen(false);
          setCancelReason(''); // Reset reason when closing
        }}
        onConfirm={() => {
          confirmCancel(cancelReason);
          setCancelReason(''); // Reset reason after confirmation
        }}
      >
        <h2 className="text-lg font-semibold mb-4">Cancel Appointment</h2>
        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="reason">
          Reason (optional)
        </label>
        <textarea
          id="reason"
          className="w-full border rounded p-2"
          rows={4}
          defaultValue={cancelReason}
          onChange={(e) => reasonRef.current = e.target.value}
          placeholder="Enter cancellation reason here..."
        />
      </Modal>
    </div>
  );
}