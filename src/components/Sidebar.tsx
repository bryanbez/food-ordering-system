"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  UtensilsCrossed,
  ShoppingCart,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/", icon: Home },
    { name: "Foods", href: "/foods", icon: UtensilsCrossed },
    { name: "Your Cart", href: "/cart", icon: ShoppingCart },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-[15%] h-screen bg-gray-900 text-white flex flex-col justify-between fixed left-0 top-0 z-50 shadow-xl border-r border-gray-800">
      <div>
        <div className="p-6 border-b border-gray-800 flex items-center justify-center">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
            FoodOS
          </h1>
        </div>
        <nav className="mt-8 px-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}>
                <Icon
                  size={20}
                  className={`${
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } transition-colors`}
                />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 group">
          <LogOut
            size={20}
            className="text-gray-400 group-hover:text-red-500 transition-colors"
          />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
