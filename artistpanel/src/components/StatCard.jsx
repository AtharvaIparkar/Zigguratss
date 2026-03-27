import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function StatCard({ icon: Icon, label, value, change, trend }) {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
            <Icon size={24} className="text-gray-400" />
          </div>
          <span className="text-gray-400 text-sm">{label}</span>
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-1 rounded ${trend > 0 ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-white mb-2">{value}</p>
      {change && <p className="text-xs text-gray-400">{change}</p>}
    </div>
  );
}
