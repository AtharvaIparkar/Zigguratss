import React, { useState } from 'react';

export default function ArtworkBarChart({ title, value, data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const maxValue = Math.max(...data);
  
  // Determine days based on data length
  const getDaysLabel = () => {
    if (data.length === 12) {
      return ['12am', '2am', '4am', '6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'];
    } else if (data.length === 6) {
      return ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];
    } else {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    }
  };

  const days = getDaysLabel();

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-gray-400 text-sm mb-2">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>

      <div className="relative h-48 flex items-end justify-between gap-3 mb-8 px-2">
        {data.map((val, idx) => {
          const height = (val / maxValue) * 100;
          return (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center relative"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="w-full rounded-lg transition-all cursor-pointer relative group"
                style={{
                  height: `${height}%`,
                  background: 'linear-gradient(135deg, #A855F7 0%, #D946EF 100%)',
                  boxShadow: hoveredIndex === idx ? '0 0 25px rgba(168, 85, 247, 0.6)' : '0 0 15px rgba(168, 85, 247, 0.3)',
                  minHeight: '20px',
                }}
              >
                {hoveredIndex === idx && (
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap border border-purple-500 shadow-lg z-10">
                    <div className="font-semibold">{val}</div>
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-400 mt-3 font-medium">{days[idx]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
