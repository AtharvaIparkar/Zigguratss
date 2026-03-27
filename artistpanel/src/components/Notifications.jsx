import React from 'react';
import { Bell, X } from 'lucide-react';

export default function Notifications({ isOpen, onClose }) {
  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'New Order Received',
      message: 'You have received a new order for "Golden Horizon"',
      time: '5 minutes ago',
      icon: '🛒',
      read: false,
    },
    {
      id: 2,
      type: 'upload',
      title: 'Artwork Approved',
      message: '"Prateeksha" has been approved and is now live',
      time: '2 hours ago',
      icon: '✅',
      read: false,
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message',
      message: 'A buyer is interested in your artwork',
      time: '1 day ago',
      icon: '💬',
      read: true,
    },
    {
      id: 4,
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of ₹45,500 has been processed',
      time: '3 days ago',
      icon: '💰',
      read: true,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-screen w-96 bg-gray-900 border-l border-gray-800 shadow-2xl z-40">
      <div className="flex items-center justify-between p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Bell size={24} />
          <span>Notifications</span>
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition"
        >
          <X size={24} />
        </button>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-80px)]">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-4 border-b border-gray-800 cursor-pointer hover:bg-gray-800 transition ${
              !notif.read ? 'bg-gray-800 bg-opacity-50' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <span className="text-2xl">{notif.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">{notif.title}</h3>
                  {!notif.read && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">{notif.message}</p>
                <p className="text-xs text-gray-500 mt-2">{notif.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-800 bg-gray-900">
        <button className="w-full px-4 py-2 text-center text-sm text-gray-300 hover:text-white transition">
          View All Notifications
        </button>
      </div>
    </div>
  );
}
