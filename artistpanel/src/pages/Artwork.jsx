import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UploadModal from '../components/UploadModal';
import Notifications from '../components/Notifications';
import { Plus } from 'lucide-react';

export default function Artwork() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const stats = [
    { label: 'TOTAL WORKS', value: '48', color: 'text-yellow-500' },
    { label: 'FOR SALE', value: '12', color: 'text-yellow-500' },
    { label: 'SOLD', value: '8', color: 'text-yellow-500' },
    { label: 'AVG RATING', value: '4.8 ⭐', color: 'text-green-500' },
  ];

  const artworks = [
  {
    id: 1,
    title: 'Golden Zenith',
    price: '124,000',
    views: '1,540 views',
    inquiries: '3 inquiries',
    image: 'https://zigguratss.com/assets/upload/art/zigguratss_e913aae60d132b089ebc20bd243cb6f2.jpeg',   
  },
  {
    id: 2,
    title: 'Ocean of Silence',
    price: '118,500',
    views: '890 views',
    inquiries: '1 inquiry',
    image: 'https://zigguratss.com/assets/upload/art/zigguratss_a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6.jpeg',
  },
  {
    id: 3,
    title: 'Desert Wind II',
    price: '131,000',
    views: '2,310 views',
    inquiries: '5 inquiries',
    image: 'https://zigguratss.com/assets/upload/art/zigguratss_b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7.jpeg',
  },
  {
    id: 4,
    title: 'Monsoon Abstract III',
    price: '114,200',
    views: '340 views',
    inquiries: 'New',
    image: 'https://zigguratss.com/assets/upload/art/zigguratss_c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8.jpeg',
  },
  {
    id: 5,
    title: 'Forest Whispers',
    price: '110,800',
    views: '560 views',
    inquiries: '2 inquiries',
    image: 'https://zigguratss.com/assets/upload/art/zigguratss_d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9.jpeg',
  },
];

  return (
    <div className="flex h-screen bg-black">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <Header
          onUploadClick={() => setIsUploadModalOpen(true)}
          onNotificationClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
        />

        <div className="p-8">
          <div>
            <h1 className="text-2xl font-bold text-white">My Artwork Collection</h1>
            <p className="text-gray-400 text-xs mt-1">Manage, showcase and price your uploaded pieces. Hover for quick actions.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-3 mt-6 mb-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center hover:border-gray-700 transition"
              >
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-gray-400 text-xs uppercase tracking-widest mt-2">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Artwork Grid */}
          <div className="grid grid-cols-3 gap-4">
            {artworks.map((artwork) => (
              <div
                key={artwork.id}
                className="group bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition cursor-pointer"
              >
                <div className="h-40 bg-gray-800 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 hidden bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <span className="text-6xl">🎨</span>
                  </div>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </div>

                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm">{artwork.title}</h3>
                  <p className="text-yellow-500 font-bold text-lg mt-2">₹{artwork.price}</p>
                  <div className="mt-3 space-y-1 text-xs text-gray-400">
                    <p>{artwork.views}</p>
                    <p>{artwork.inquiries}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Add New Artwork Card */}
            <div
              onClick={() => setIsUploadModalOpen(true)}
              className="group bg-gray-900 border border-gray-800 border-dashed rounded-lg overflow-hidden hover:border-yellow-500 hover:bg-gray-800 transition cursor-pointer flex items-center justify-center h-64"
            >
              <div className="text-center">
                <Plus size={48} className="text-yellow-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-yellow-500 font-semibold">Upload New</p>
                <p className="text-gray-400 text-xs mt-1">Add a new piece</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />

      <Notifications
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
}
