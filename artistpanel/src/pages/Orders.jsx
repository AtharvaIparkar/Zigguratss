import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UploadModal from '../components/UploadModal';
import Notifications from '../components/Notifications';

export default function Orders() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const stats = [
    { label: 'TOTAL', value: '23', color: 'text-yellow-500' },
    { label: 'PENDING', value: '5', color: 'text-yellow-500' },
    { label: 'COMPLETED', value: '16', color: 'text-green-500' },
    { label: 'REFUND', value: '2', color: 'text-red-500' },
  ];

  const orders = [
    {
      id: '#ORD-2201',
      artwork: 'Golden Zenith',
      client: 'Priya Sharma',
      amount: '₹24,000',
      date: 'Mar 25, 2026',
      status: 'Pending',
      statusColor: 'text-yellow-400',
    },
    {
      id: '#ORD-2200',
      artwork: 'Desert Wind II',
      client: 'Rahul Mehta',
      amount: '₹31,000',
      date: 'Mar 22, 2026',
      status: 'Completed',
      statusColor: 'text-green-400',
    },
    {
      id: '#ORD-2198',
      artwork: 'Ocean of Silence',
      client: 'Ananya Gupta',
      amount: '₹18,500',
      date: 'Mar 19, 2026',
      status: 'Completed',
      statusColor: 'text-green-400',
    },
    {
      id: '#ORD-2195',
      artwork: 'Forest Whispers',
      client: 'Vikram Patel',
      amount: '₹9,800',
      date: 'Mar 10, 2026',
      status: 'Refund',
      statusColor: 'text-red-400',
    },
    {
      id: '#ORD-2190',
      artwork: 'Monsoon Abstract I',
      client: 'Kavita Nair',
      amount: '₹12,000',
      date: 'Feb 28, 2026',
      status: 'Completed',
      statusColor: 'text-green-400',
    },
    {
      id: '#ORD-2185',
      artwork: 'Night Sky Series',
      client: 'Arun Kapoor',
      amount: '₹22,500',
      date: 'Feb 20, 2026',
      status: 'Completed',
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
            <h1 className="text-3xl font-bold text-white">Order Enquiry</h1>
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

          {/* Orders Table */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-yellow-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-yellow-500 uppercase tracking-wider">Artwork</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-yellow-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-yellow-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-yellow-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-yellow-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-800 hover:bg-gray-800 transition"
                  >
                    <td className="px-6 py-4 text-sm text-gray-300">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{order.artwork}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{order.client}</td>
                    <td className="px-6 py-4 text-sm text-yellow-500 font-semibold">{order.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{order.date}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`font-semibold ${order.statusColor}`}>
                        {order.status}
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
