import React from 'react';
import { ShoppingCart, Image, Award, User } from 'lucide-react';

export default function ActivityTimeline() {
  const activities = [
    {
      type: 'order',
      title: 'New Order',
      amount: '₹24,000',
      description: '"Golden Zenith" print - Priya Sharma, Delhi',
      time: 'Today 10:30 AM',
      icon: ShoppingCart,
    },
    {
      type: 'upload',
      title: 'Artwork Uploaded',
      description: '"Monsoon Abstract III" live on gallery',
      time: 'Today 08:15 AM',
      icon: Image,
    },
    {
      type: 'award',
      title: 'Award Confirmed',
      description: 'Best Contemporary Artist - Lalit Kala Akademi',
      time: 'Yesterday 2:18 PM',
      icon: Award,
    },
    {
      type: 'profile',
      title: 'Profile Featured',
      description: 'Zigguratss homepage feature - 800+ views',
      time: 'Jun 21, 9:34 AM',
      icon: User,
    },
  ];

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Activity Timeline</h3>

      <div className="space-y-4">
        {activities.map((activity, idx) => (
          <div key={idx} className="flex space-x-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                <activity.icon size={18} className="text-black" />
              </div>
              {idx < activities.length - 1 && <div className="w-0.5 h-8 bg-gray-700 mt-2"></div>}
            </div>

            <div className="flex-1 pt-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-white">{activity.title}</p>
                  {activity.amount && <p className="text-sm font-bold text-yellow-400">{activity.amount}</p>}
                  <p className="text-sm text-gray-400">{activity.description}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
