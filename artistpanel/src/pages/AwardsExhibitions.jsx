import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UploadModal from '../components/UploadModal';
import Notifications from '../components/Notifications';

export default function AwardsExhibitions() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const stats = [
    { label: 'AWARDS WON', value: '7', color: 'text-yellow-500' },
    { label: 'EXHIBITIONS', value: '14', color: 'text-yellow-500' },
    { label: 'UPCOMING', value: '3', color: 'text-yellow-500' },
    { label: 'ACTIVE YEAR', value: '2026', color: 'text-green-500' },
  ];

  const awards = [
    {
      id: 1,
      title: 'Best Contemporary Artist',
      organization: 'Lalit Kala Akademi - New Delhi',
      year: '2025',
      image: '🏆',
      color: 'from-yellow-500 to-amber-600',
    },
    {
      id: 2,
      title: 'Golden Palette Award',
      organization: 'India Art Summit - Mumbai',
      year: '2024',
      image: '💎',
      color: 'from-yellow-200 to-yellow-400',
    },
    {
      id: 3,
      title: 'Emerging Artist Excellence',
      organization: 'NGMA Residency Programme - Bengaluru',
      year: '2023',
      image: '🎨',
      color: 'from-orange-400 to-orange-600',
    },
  ];

  const exhibitions = [
    {
      id: 1,
      title: 'India Art Fair 2026',
      location: 'NSIC Complex, New Delhi - Apr 12-16, 2026',
      image: '🎯',
      status: 'Confirmed',
      statusColor: 'text-green-400',
      color: 'from-green-900 to-green-600',
    },
    {
      id: 2,
      title: 'Venice Biennale Pavilion',
      location: 'Giardini, Venice, Italy - Jun-Nov 2026',
      image: '✈️',
      status: 'Application Open',
      statusColor: 'text-blue-400',
      color: 'from-blue-900 to-blue-600',
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
            <h1 className="text-3xl font-bold text-white">Awards & Exhibitions</h1>
            <p className="text-gray-400 text-sm mt-2">Your artistic legacy — awards, solo shows and upcoming exhibitions.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mt-8 mb-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center hover:border-gray-700 transition"
              >
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-gray-400 text-xs uppercase tracking-widest mt-2">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Awards Section */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Awards</h2>
            <div className="space-y-4 mb-8">
              {awards.map((award) => (
                <div
                  key={award.id}
                  className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition flex items-start space-x-4"
                >
                  <div
                    className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${award.color} rounded-lg flex items-center justify-center text-3xl`}
                  >
                    {award.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-yellow-500">{award.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{award.organization}</p>
                    <div className="flex items-center mt-3">
                      <span className="px-3 py-1 bg-yellow-900 bg-opacity-50 text-yellow-400 text-xs rounded-full border border-yellow-700">
                        {award.year}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exhibitions Section */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Upcoming Exhibitions</h2>
            <div className="space-y-4">
              {exhibitions.map((exhibition) => (
                <div
                  key={exhibition.id}
                  className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition flex items-start space-x-4"
                >
                  <div
                    className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${exhibition.color} rounded-lg flex items-center justify-center text-3xl`}
                  >
                    {exhibition.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-green-400">{exhibition.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{exhibition.location}</p>
                    <div className="flex items-center mt-3">
                      <span className={`px-3 py-1 bg-gray-800 text-xs rounded-full border border-gray-700 ${exhibition.statusColor}`}>
                        {exhibition.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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
