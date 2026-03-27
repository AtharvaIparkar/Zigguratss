import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UploadModal from '../components/UploadModal';
import Notifications from '../components/Notifications';

export default function Refunds() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const stats = [
    { label: 'ACTIVE', value: '2', color: 'text-yellow-500' },
    { label: 'TOTAL AMOUNT', value: '₹22,300', color: 'text-yellow-500' },
    { label: 'AVG RESOLUTION', value: '4 days', color: 'text-yellow-500' },
    { label: 'RESOLUTION RATE', value: '98%', color: 'text-green-500' },
  ];

  const refunds = [
    {
      id: '#REF-112',
      order: '#ORD-2195',
      artwork: 'Forest Whispers',
      amount: '₹9,800',
      reason: 'Damage in transit',
      status: 'Processing',
      statusColor: 'text-yellow-400',
    },
    {
      id: '#REF-108',
      order: '#ORD-2180',
      artwork: 'Night Sky Series',
      amount: '₹12,500',
      reason: 'Wrong print size',
      status: 'Escalated',
      statusColor: 'text-blue-400',
    },
    {
      id: '#REF-099',
      order: '#ORD-2160',
      artwork: 'Sunrise Abstract',
      amount: '₹8,400',
      reason: 'Change of mind',
      status: 'Resolved',
      statusColor: 'text-green-400',
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
            <h1 className="text-3xl font-bold text-white">Refund Orders</h1>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mt-8 mb-8">
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

          {/* Refunds Table */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-yellow-500 uppercase tracking-wider">Refund ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-yellow-500 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-yellow-500 uppercase tracking-wider">Artwork</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-yellow-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-yellow-500 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-yellow-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {refunds.map((refund, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-800 hover:bg-gray-800 transition"
                  >
                    <td className="px-6 py-4 text-sm text-gray-300">{refund.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{refund.order}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{refund.artwork}</td>
                    <td className="px-6 py-4 text-sm text-yellow-500 font-semibold">{refund.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{refund.reason}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`font-semibold ${refund.statusColor}`}>
                        {refund.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
