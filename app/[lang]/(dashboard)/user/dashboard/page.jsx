'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // or your preferred toast library
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch('/api/user/profile', {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // Validate response status
                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
                }

                const data = await res.json();

                // Validate response structure
                if (!data?.data || typeof data.data !== 'object') {
                    throw new Error('Invalid user data structure');
                }

                // Validate required user fields
                const requiredFields = ['id', 'email', 'firstName', 'lastName',];
                const missingFields = requiredFields.filter(field => !data.data[field]);

                if (missingFields.length > 0) {
                    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
                }

                setUserData(data.data);
                setError(null);

            } catch (err) {
                console.error('Failed to load user data:', err);
                setError(err.message);

                // Handle specific error cases
                if (err.message.includes('401') || err.message.includes('403')) {
                    toast.error("Your session has expired. Please sign in again.");
                    router.push('/signin');
                } else if (err.message.includes('404')) {
                    toast.error("User account not found");
                    router.push('/signup');
                } else {
                    toast.error("Failed to load dashboard data");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="p-6 bg-white rounded-xl shadow-sm">
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                </div>
                {/* Add more skeleton loaders as needed */}
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-50 rounded-xl shadow-sm">
                <h3 className="text-lg font-medium text-red-800">Error Loading Dashboard</h3>
                <p className="mt-1 text-red-600">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="p-6 bg-yellow-50 rounded-xl shadow-sm">
                <h3 className="text-lg font-medium text-yellow-800">No User Data</h3>
                <p className="mt-1 text-yellow-600">Unable to load your account information.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="p-6 bg-white rounded-xl shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">
                    Welcome back, {userData.firstName + " " + userData.lastName || 'User'}!
                </h3>
                <p className="mt-1 text-gray-600">
                    {userData.email ? `Logged in as ${userData.email}` : 'Here\'s your dashboard'}
                </p>

                {/* Safe property access with fallbacks */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-600">Account Status</p>
                        <p className="font-medium">
                            {userData.isVerified ? 'Verified' : 'Pending Verification'}
                        </p>
                    </div>
                    {/* Add more dashboard cards */}
                </div>
            </div>
        </div>
    );
}