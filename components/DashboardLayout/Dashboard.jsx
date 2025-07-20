"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Home,
    User,
    Calendar,
    FileText,
    Settings,
    LogOut,
    Bell,
    ChevronDown,
    Search
} from 'lucide-react';

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [notifications, setNotifications] = useState([{
        id: 1,
        title: 'New document uploaded',
        message: 'Your visa application has been received',
        time: '2 hours ago',
    },
    {
        id: 2,
        title: 'Appointment confirmed',
        message: 'Your interview is scheduled for Friday',
        time: '1 day ago',
    },
    {
        id: 3,
        title: 'Profile Updated',
        message: 'Your profile info has been successfully saved',
        time: '3 days ago',
    },]);
    const [userData, setUserData] = useState({
        id: 'user_123',
        name: 'Sofiane Aloui',
        email: 'sofiane@example.com',
        avatar: '',
    });
    const router = useRouter();

    // Sample data for charts
    const appointmentsData = [
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 300 },
        { name: 'Mar', value: 600 },
        { name: 'Apr', value: 800 },
        { name: 'May', value: 500 },
        { name: 'Jun', value: 900 },
    ];

    const documentStatusData = [
        { name: 'Completed', value: 400 },
        { name: 'Pending', value: 300 },
        { name: 'Rejected', value: 200 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    useEffect(() => {
        // Fetch user data and notifications
        const fetchData = async () => {
            try {
                // Replace with actual API calls
                const userResponse = await fetch('/api/user/profile');
                const user = await userResponse.json();
                setUserData({ user });

                const notificationsResponse = await fetch('/api/notifications');
                const notifs = await notificationsResponse.json();
                setNotifications(notifs);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        // Clear session and redirect
        document.cookie = 'auth-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        router.push('/signin');
    };

    if (!userData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-64 bg-white border-r border-gray-200">
                    <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
                        <h1 className="text-xl font-bold text-white">Client Portal</h1>
                    </div>
                    <div className="flex flex-col flex-grow px-4 py-4 overflow-y-auto">
                        <nav className="flex-1 space-y-2">
                            <button
                                onClick={() => setActiveTab('dashboard')}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full ${activeTab === 'dashboard' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <Home className="w-5 h-5 mr-3" />
                                Dashboard
                            </button>
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full ${activeTab === 'profile' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <User className="w-5 h-5 mr-3" />
                                My Profile
                            </button>
                            <button
                                onClick={() => setActiveTab('appointments')}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full ${activeTab === 'appointments' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <Calendar className="w-5 h-5 mr-3" />
                                Appointments
                            </button>
                            <button
                                onClick={() => setActiveTab('documents')}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full ${activeTab === 'documents' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <FileText className="w-5 h-5 mr-3" />
                                My Documents
                            </button>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full ${activeTab === 'settings' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <Settings className="w-5 h-5 mr-3" />
                                Settings
                            </button>
                        </nav>
                        <div className="mt-auto">
                            <button
                                onClick={handleLogout}
                                className="flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-lg w-full hover:bg-red-50"
                            >
                                <LogOut className="w-5 h-5 mr-3" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Top Navigation */}
                <header className="bg-white shadow-sm">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                            </h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Search className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="w-full py-2 pl-10 pr-4 text-sm bg-gray-100 border-transparent rounded-lg focus:border-gray-300 focus:bg-white focus:ring-0"
                                    placeholder="Search..."
                                />
                            </div>
                            <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
                                <Bell className="w-5 h-5" />
                                {notifications.length > 0 && (
                                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                                )}
                            </button>
                            <div className="flex items-center">
                                <div className="w-8 h-8 overflow-hidden bg-blue-100 rounded-full">
                                    {userData.avatar ? (
                                        <img src={userData.avatar} alt="User" className="object-cover w-full h-full" />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full text-blue-600">
                                            <User className="w-5 h-5" />
                                        </div>
                                    )}
                                </div>
                                <span className="ml-2 text-sm font-medium text-gray-700">{userData.name}</span>
                                <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    {activeTab === 'dashboard' && (
                        <div className="space-y-6">
                            {/* Welcome Card */}
                            <div className="p-6 bg-white rounded-xl shadow-sm">
                                <h3 className="text-lg font-medium text-gray-900">Welcome back, {userData.name}!</h3>
                                <p className="mt-1 text-gray-600">Here's what's happening with your account today.</p>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                <div className="p-6 bg-white rounded-xl shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Upcoming Appointments</p>
                                            <p className="mt-1 text-2xl font-semibold text-gray-900">3</p>
                                        </div>
                                        <div className="p-3 bg-blue-100 rounded-lg">
                                            <Calendar className="w-6 h-6 text-blue-600" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-white rounded-xl shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Pending Documents</p>
                                            <p className="mt-1 text-2xl font-semibold text-gray-900">2</p>
                                        </div>
                                        <div className="p-3 bg-green-100 rounded-lg">
                                            <FileText className="w-6 h-6 text-green-600" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-white rounded-xl shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Completed Tasks</p>
                                            <p className="mt-1 text-2xl font-semibold text-gray-900">5</p>
                                        </div>
                                        <div className="p-3 bg-purple-100 rounded-lg">
                                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-white rounded-xl shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Messages</p>
                                            <p className="mt-1 text-2xl font-semibold text-gray-900">4</p>
                                        </div>
                                        <div className="p-3 bg-yellow-100 rounded-lg">
                                            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            {/* Recent Activity */}
                            <div className="p-6 bg-white rounded-xl shadow-sm">
                                <h4 className="text-lg font-medium text-gray-900">Recent Activity</h4>
                                <div className="mt-4 space-y-4">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                            <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
                                                <Bell className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-900">New document uploaded</p>
                                                <p className="mt-1 text-sm text-gray-500">Your visa application has been received</p>
                                                <p className="mt-1 text-xs text-gray-400">2 hours ago</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div className="p-6 bg-white rounded-xl shadow-sm">
                            <h3 className="text-lg font-medium text-gray-900">My Profile</h3>
                            {/* Profile form would go here */}
                        </div>
                    )}

                    {activeTab === 'appointments' && (
                        <div className="p-6 bg-white rounded-xl shadow-sm">
                            <h3 className="text-lg font-medium text-gray-900">My Appointments</h3>
                            {/* Appointments list would go here */}
                        </div>
                    )}

                    {activeTab === 'documents' && (
                        <div className="p-6 bg-white rounded-xl shadow-sm">
                            <h3 className="text-lg font-medium text-gray-900">My Documents</h3>
                            {/* Documents list would go here */}
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="p-6 bg-white rounded-xl shadow-sm">
                            <h3 className="text-lg font-medium text-gray-900">Settings</h3>
                            {/* Settings form would go here */}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;