import React from 'react';

export default function ProgressBar({ label, percentage, color = 'from-yellow-500 to-yellow-400' }) {
  const colorMap = {
    'from-yellow-500 to-yellow-400': '#F59E0B',
    'from-cyan-500 to-cyan-400': '#06B6D4',
    'from-blue-500 to-blue-400': '#3B82F6',
    'from-pink-500 to-pink-400': '#EC4899'
  };

  return (
    <div className="flex flex-col">
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      <p className="text-3xl font-bold text-white mb-3">{percentage}%</p>
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${percentage}%`, backgroundColor: colorMap[color] }}
        ></div>
      </div>
    </div>
  );
}
