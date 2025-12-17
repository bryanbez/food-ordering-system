"use client";

import { Bell, User, Settings as SettingsIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500">What are you craving today?</p>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        <div className="flex items-center gap-4 pl-6 border-l border-gray-200">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-gray-800">John Doe</p>
            <p className="text-xs text-green-500 font-medium">Online</p>
          </div>

          <div className="relative group">
            <button className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-orange-500 transition-all duration-300">
              <User size={20} className="text-gray-600" />
            </button>
            <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-gray-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <SettingsIcon size={16} />
                Profile Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
