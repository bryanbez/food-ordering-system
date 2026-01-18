"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  User,
  Home,
  UtensilsCrossed,
  ShoppingCart,
  Settings,
  LogOut,
} from "lucide-react";
import useUserIdStore from "@/app/api/store/userId";
import { useCart } from "@/app/hooks/useCart";

const Navbar = () => {
  const pathname = usePathname();
  const { cartCount } = useCart();

  const links = [
    { name: "Home", href: "/", icon: Home },
    { name: "Foods", href: "/foods", icon: UtensilsCrossed },
    {
      name: "Your Cart",
      href: "/cart",
      icon: ShoppingCart,
      count: cartCount,
    },
  ];

  const userId = useUserIdStore((state) => state.userId);

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 px-4 md:px-8">
      <div className="h-full flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo / Welcome Text */}
        <div className="flex-shrink-0 mr-4">
          <Link href="/">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600">
              FoodOS
            </h2>
          </Link>
        </div>

        {/* Center Navigation (Icons) */}
        <nav className="flex items-center gap-2 md:gap-6 bg-gray-50/50 px-4 py-2 rounded-full border border-gray-100">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`p-2.5 rounded-full transition-all duration-300 relative group ${
                  isActive
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                    : "text-gray-400 hover:bg-white hover:text-orange-500"
                }`}
                title={link.name}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {link.count !== undefined && link.count > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full ring-2 ring-white">
                    {link.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 md:gap-6">
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700">
            <Bell size={20} />
            <span>{userId}</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          <div className="flex items-center gap-4 pl-3 md:pl-6 border-l border-gray-200">
            <div className="relative group">
              <button className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-orange-500 transition-all duration-300">
                <User size={20} className="text-gray-600" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-gray-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                <div className="px-3 py-2 border-b border-gray-100 mb-2">
                  <p className="text-sm font-semibold text-gray-800">
                    John Doe
                  </p>
                  <p className="text-xs text-green-500">Online</p>
                </div>

                <Link
                  href="/settings"
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <Settings size={16} />
                  Settings
                </Link>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-1">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
