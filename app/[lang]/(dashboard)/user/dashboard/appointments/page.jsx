'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, ClockIcon, Cross2Icon, Pencil2Icon, InfoCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { parse, format } from "date-fns";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function AppointmentsDashboard() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const router = useRouter();

    const fetchData = async () => {
        try {
            // Fetch user data
            const userRes = await fetch('/api/user/profile', {
                credentials: 'include',
            });

            if (!userRes.ok) throw new Error("Failed to fetch user data");
            const userData = await userRes.json();
            setUserData(userData.data);

            // Fetch appointments using both ID and email for redundancy
            const appointmentsRes = await fetch(`/api/reservations?userId=${userData.data.id}&email=${userData.data.email}`);
            if (!appointmentsRes.ok) throw new Error("Failed to fetch appointments");

            const appointmentsData = await appointmentsRes.json();
            setAppointments(appointmentsData.data);

        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        fetchData();
    }, []);

    const handleCancel = async (token) => {
        try {
            setisLoading(true)
            const response = await fetch('/api/reservations/manage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    action: "cancel",

                    newTime: null,
                }),
            });

            if (!response.ok) {
                toast.error("Failed to cancel the appointment");
            };

            toast.success("Appointment cancelled successfully");

            fetchData();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setisLoading(false)

        }
    };

    const handleReschedule = (manageToken) => {
        router.push(`/manage-appointment/${manageToken}`);
    };
    const isAppointmentPast = (appointment) => {
        try {
            // Remove "st", "nd", "rd", "th" from date string to make it parseable
            const cleanDateStr = appointment.date.replace(/(\d+)(st|nd|rd|th)/, "$1");
            const parsedDate = parse(cleanDateStr, "MMMM d, yyyy", new Date());

            // Split time into hours and minutes
            const [hour, minute] = appointment.time.split(":").map(Number);
            parsedDate.setHours(hour);
            parsedDate.setMinutes(minute);

            return parsedDate < new Date();
        } catch (err) {
            console.error("Date parsing failed:", err);
            return false;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "PPP"); // e.g. "January 1st, 2023"
    };

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-sm text-gray-500">Loading your appointments...</p>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="p-6 text-center">
                <h3 className="text-lg font-medium">No user data available</h3>
                <p className="text-muted-foreground">Please sign in to view appointments</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Your Appointments</h1>
                <Button onClick={() => router.push('/schedule')}>Book New</Button>
            </div>

            {appointments.length === 0 ? (
                <Card>
                    <CardHeader>
                        <CardTitle>No appointments found</CardTitle>
                        <CardDescription>
                            You don't have any upcoming appointments. Book one now!
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button onClick={() => router.push('/schedule')}>Book Appointment</Button>
                    </CardFooter>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {appointments.map((appointment) => (
                        <Card
                            key={appointment.id}
                            className="transition-all hover:shadow-lg border border-gray-200 rounded-xl"
                        >
                            <CardHeader className="pb-3 border-b">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg font-semibold text-gray-800">{appointment.service}</CardTitle>
                                    </div>
                                    <Badge
                                        variant={
                                            appointment.status === 'CANCELLED'
                                                ? 'destructive'
                                                : appointment.status === 'CONFIRMED'
                                                    ? 'secondary'
                                                    : 'default'
                                        }
                                        className="uppercase tracking-wide text-xs py-1 px-2"
                                    >
                                        {appointment.status}
                                    </Badge>
                                </div>
                                <CardDescription className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                                    <span>{formatDate(appointment.date)}</span>
                                </CardDescription>
                                <CardDescription className="mt-1 text-sm text-gray-600 flex items-center gap-2">
                                    <ClockIcon className="h-4 w-4 text-gray-400" />
                                    <span>{appointment.time}</span>
                                </CardDescription>
                                {
                                    appointment.reason ? <CardDescription className="mt-1 text-sm text-gray-600 flex items-center gap-2">
                                        <InfoCircledIcon className="h-4 w-4 text-gray-400" />
                                        <span>{appointment.reason}</span>
                                    </CardDescription> : ""
                                }
                            </CardHeader>

                            <CardFooter className="flex justify-end p-4 gap-2">
                                <DropdownMenu >
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            disabled={isLoading || appointment.status === 'CANCELLED' || isAppointmentPast(appointment) || appointment.status === 'COMPLETED'}
                                            variant="ghost"
                                            size="sm"
                                            className="border border-gray-300 hover:bg-gray-100"
                                        >
                                            {isLoading ? "Updating..." : "Actions"}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="rounded-md bg-white shadow-lg">
                                        <DropdownMenuItem
                                            onClick={() => handleReschedule(appointment.manageToken)}
                                            className="cursor-pointer text-sm"
                                            disabled={appointment.status === 'CANCELLED' || isAppointmentPast(appointment)}
                                        >
                                            <Pencil2Icon className="mr-2 h-4 w-4" />
                                            Reschedule
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => handleCancel(appointment.manageToken)}
                                            className="cursor-pointer text-sm text-red-600"
                                            disabled={appointment.status === 'CANCELLED' || isAppointmentPast(appointment)}
                                        >
                                            <Cross2Icon className="mr-2 h-4 w-4" />
                                            {appointment.status === 'CANCELLED' ? 'Cancelled' : 'Cancel'}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardFooter>
                        </Card>

                    ))}
                </div>
            )}
        </div>
    );
}