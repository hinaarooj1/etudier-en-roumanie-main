'use client';
import { Bell, ChevronDown, Search, User } from 'lucide-react';

export default function Header({ activeTab, userData, notifications }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          {/* <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="py-2 pl-10 pr-4 text-sm bg-gray-100 border-transparent rounded-lg focus:border-gray-300 focus:bg-white focus:ring-0"
              placeholder="Search..."
            />
          </div> */}
          {/* <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 relative">
            <Bell className="w-5 h-5" />
            {notifications?.length > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button> */}
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
            <span className="ml-2 text-sm font-medium text-gray-700">{userData.firstName +" "+userData.lastName}</span>
            {/* <ChevronDown className="w-4 h-4 ml-1 text-gray-500" /> */}
          </div>
        </div>
      </div>
    </header>
  );
}
