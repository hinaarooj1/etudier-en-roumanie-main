'use client';
import { useState, useEffect } from 'react';
import { Home, User, Calendar, FileText, Settings, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import NextLink from "next/link";

export default function Sidebar({ handleLogout }) {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('dashboard');

    const navItems = [
        { key: 'dashboard', label: 'Dashboard', icon: Home, link: "/user/dashboard" },
        { key: 'profile', label: 'My Profile', icon: User, link: "/user/dashboard/profile" },
        { key: 'appointments', label: 'Appointments', icon: Calendar, link: "/user/dashboard/appointments" },
        // { key: 'documents', label: 'My Documents', icon: FileText, link: "/user/dashboard/documents" },
        { key: 'password', label: 'Change Password', icon: Settings, link: "/user/dashboard/password" },
    ];

    // Set active tab based on current route
    useEffect(() => {
        // Remove locale prefix and trailing slashes for consistent matching
        const normalizedPath = pathname.replace(/^\/[a-z]{2}/, '').replace(/\/+$/, '');
        
        // Find the most specific matching route
        let currentTab = 'dashboard';
        let maxMatchLength = 0;
        
        navItems.forEach(item => {
            const normalizedLink = item.link.replace(/\/+$/, '');
            if (normalizedPath.startsWith(normalizedLink) && normalizedLink.length > maxMatchLength) {
                currentTab = item.key;
                maxMatchLength = normalizedLink.length;
            }
        });
        
        setActiveTab(currentTab);
    }, [pathname]);

    return (
        <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-64 bg-white border-r border-gray-200">
                <div className="flex items-center justify-center h-16 px-4">
                    <NextLink className="flex justify-start items-center gap-1" href="/" passHref>
                        <img
                            style={{ width: "120px", height: "auto" }}
                            src="/bg_dark_logo.png"
                            alt="Logo"
                        />
                    </NextLink>
                </div>
                <div className="flex flex-col flex-grow px-4 py-4 overflow-y-auto">
                    <nav className="flex-1 space-y-2">
                        {navItems.map(({ key, label, icon: Icon, link }) => (
                            <NextLink 
                                href={link}
                                key={key}
                                passHref
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full ${
                                    activeTab === key 
                                        ? 'bg-blue-100 text-blue-600' 
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                                onClick={() => setActiveTab(key)}
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                {label}
                            </NextLink>
                        ))}
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
    );
}