import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import Analytics from './Analytics';
import UploadModal from '../components/UploadModal';
import Notifications from '../components/Notifications';
import { Package, ShoppingCart, Zap, Eye } from 'lucide-react';

export default function Dashboard() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <Header
          onUploadClick={() => setIsUploadModalOpen(true)}
          onNotificationClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
        />

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-4 gap-6">
            <StatCard
              icon={Package}
              label="TOTAL ARTWORKS"
              value="48"
              change="0 new this month"
              trend={12}
            />
            <StatCard
              icon={ShoppingCart}
              label="TOTAL ORDERS"
              value="23"
              change="3 pending today"
              trend={5}
            />
            <StatCard
              icon={Zap}
              label="TOTAL REVENUE"
              value="₹2.1L"
              change="Best month this year"
              trend={-5}
            />
            <StatCard
              icon={Eye}
              label="PROFILE VIEWS"
              value="4,820"
              change="220 new this week"
              trend={32}
            />
          </div>

          <Analytics />
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
