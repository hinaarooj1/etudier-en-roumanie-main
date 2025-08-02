"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import useSWR from "swr";
import axios from "axios";

// Fetcher function for SWR
const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export default function AdminAppointmentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Adjust based on your grid layout (3 columns x 2 rows)
  const reasonRef = useRef('');
  const [updatingId, setUpdatingId] = useState(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  // Use SWR to fetch paginated data
  const { data, error, isLoading } = useSWR(
    `/api/reservations/admin?page=${currentPage}&limit=${pageSize}`,
    fetcher,
    { keepPreviousData: true }
  );

  const appointments = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const updateAppointmentStatus = async (id, status, reason = "") => {
    try {
      setUpdatingId(id);
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

      // Revalidate the data to refresh the list
      mutate(`/api/reservations/admin?page=${currentPage}&limit=${pageSize}`);
      
      toast.success(`Appointment marked as ${status.toLowerCase()}`);
    } catch (error) {
      toast.error(error.message || "Could not update appointment");
    } finally {
      setUpdatingId(null);
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
    reasonRef.current = "";
    setCancelModalOpen(true);
  };

  const confirmCancel = () => {
    updateAppointmentStatus(selectedAppointmentId, "CANCELLED", reasonRef.current);
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
          {isLoading ? (
            <div className="text-center py-4">Loading appointments...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">
              Error loading appointments: {error.message}
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-4">No appointments found</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
                            onClick={() => updateAppointmentStatus(appointment.id, "COMPLETED")}
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

              {/* Pagination controls */}
              <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1 || isLoading}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || isLoading}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Modal
        isOpen={cancelModalOpen}
        onClose={() => {
          setCancelModalOpen(false);
          reasonRef.current = '';
        }}
        onConfirm={confirmCancel}
      >
        <h2 className="text-lg font-semibold mb-4">Cancel Appointment</h2>
        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="reason">
          Reason (optional)
        </label>
        <textarea
          id="reason"
          className="w-full border rounded p-2"
          rows={4}
          onChange={(e) => reasonRef.current = e.target.value}
          placeholder="Enter cancellation reason here..."
        />
      </Modal>
    </div>
  );
}