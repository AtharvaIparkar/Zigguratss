import React from 'react';
import { Bell, Upload } from 'lucide-react';

export default function Header({ onUploadClick, onNotificationClick }) {
  return (
    <header className="bg-black border-b border-gray-800 px-8 py-6 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">ZIGGURATSS</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back, Aria · Your creative universe awaits</p>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={onNotificationClick}
          className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center text-gray-300 hover:bg-gray-800 transition relative"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button
          onClick={onUploadClick}
          className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition flex items-center space-x-2 border border-gray-700"
        >
          <Upload size={18} />
          <span>Upload</span>
        </button>
      </div>
    </header>
  );
}
