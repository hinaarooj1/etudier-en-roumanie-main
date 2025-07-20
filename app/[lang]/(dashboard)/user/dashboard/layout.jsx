'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar/Page';
import Header from '@/components/Header/Page';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([
    {
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
    },
  ]);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  const navItems = [
    { key: 'dashboard', link: "/user/dashboard" },
    { key: 'profile', link: "/user/dashboard/profile" },
    { key: 'appointments', link: "/user/dashboard/appointments" },
    { key: 'documents', link: "/user/dashboard/documents" },
    { key: 'settings', link: "/user/dashboard/settings" },
  ];

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!res.ok) {
        toast.error("Something went wrong while signing out.");
        return;
      }

      document.cookie = 'auth-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      window.location.href = '/signin';
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Set active tab based on current route
  useEffect(() => {
    const currentTab = navItems.find(item => pathname.startsWith(item.link))?.key || 'dashboard';
    setActiveTab(currentTab);
  }, [pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/user/profile', { credentials: 'include' });
        const user = await res.json();
        
        if (!res.ok) {
          toast.error("You are not authorized to view this page.");
          router.push('/signin');
          return;
        }

        setUserData(user?.data);
      } catch (err) {
        console.error('Failed to load user data', err);
        toast.error("Failed to load user data");
      }
    };

    fetchData();
  }, []);

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin h-10 w-10 rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
   <>
   
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} handleLogout={handleSignOut} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header activeTab={activeTab} userData={userData} notifications={notifications} />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
        
      </div>
    </div>
    <Toaster/>
    </>
  );
}