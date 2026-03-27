import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Grid, User, Image, ShoppingCart, MessageSquare, RefreshCw, BookOpen, LogOut, ChevronRight } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { icon: Grid, label: 'Dashboard', path: '/' },
    { icon: User, label: 'My Profile', path: '/profile' },
    { icon: Image, label: 'Artwork', path: '/artwork' },
    { icon: ShoppingCart, label: 'Order Enquiry', path: '/orders' },
    { icon: MessageSquare, label: 'Awards & Exhibitions', path: '/awards-exhibitions' },
    { icon: RefreshCw, label: 'Refunds', path: '/refunds' },
    { icon: BookOpen, label: 'Blog', path: '/blog' },
  ];

  return (
    <aside className="w-72 bg-black text-white h-screen flex flex-col overflow-y-auto">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
            <span className="text-white font-bold">Z</span>
          </div>
          <div>
            <p className="text-sm font-semibold">ZIGGURATSS</p>
            <p className="text-xs text-gray-400">ARTIST PLATFORM</p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
          <div className="flex items-start space-x-3 mb-3">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 border border-gray-700">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white">Aria Serrano</p>
              <p className="text-xs text-gray-400">aria@zigguratss.art</p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-1 bg-gray-800 px-2 py-1 rounded w-fit border border-gray-700">
            <span className="text-xs font-semibold text-gray-300">PREMIUM ARTIST</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6">
        <h3 className="text-xs uppercase text-gray-500 tracking-widest px-4 mb-4">Main Menu</h3>
        <div className="space-y-2">
          {menuItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={idx}
                to={item.path}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-gray-800 text-white border border-gray-700'
                    : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {isActive && <ChevronRight size={18} />}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-900 text-gray-300 rounded-lg hover:bg-gray-800 transition border border-gray-700">
          <LogOut size={18} />
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
}
