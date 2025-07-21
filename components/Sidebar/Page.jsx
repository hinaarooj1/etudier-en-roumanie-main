'use client';
import { useState, useEffect } from 'react';
import { Home, User, Calendar, FileText, Settings, LogOut, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import NextLink from "next/link";

export default function Sidebar({ handleLogout }) {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <>
            {/* Mobile menu button */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className={`${mobileMenuOpen?"non":""} p-2 padding-putr rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none`}
                >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Sidebar - now shown on mobile when menu is open */}
            <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex md:flex-shrink-0 fixed inset-0 z-40 md:relative`}>
                <div className="flex flex-col w-64 bg-white zee-index border-r border-gray-200 h-full">
                    <div className="flex items-center justify-between h-16 px-4">
                        <NextLink className="flex justify-start items-center gap-1" href="/" passHref>
                            <img
                                style={{ width: "120px", height: "auto" }}
                                src="/bg_dark_logo.png"
                                alt="Logo"
                            />
                        </NextLink>
                        <button 
                            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X className="h-6 w-6" />
                        </button>
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
                                    onClick={() => {
                                        setActiveTab(key);
                                        setMobileMenuOpen(false);
                                    }}
                                >
                                    <Icon className="w-5 h-5 mr-3" />
                                    {label}
                                </NextLink>
                            ))}
                        </nav>
                        <div className="mt-auto">
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMobileMenuOpen(false);
                                }}
                                className="flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-lg w-full hover:bg-red-50"
                            >
                                <LogOut className="w-5 h-5 mr-3" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Overlay for mobile */}
                <div 
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setMobileMenuOpen(false)}
                />
            </div>
        </>
    );
}