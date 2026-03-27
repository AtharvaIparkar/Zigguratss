import React, { useState } from 'react';

export default function LineChart({ title, value, data, lineColor = 'from-yellow-500 to-yellow-400', chartType = 'line' }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;

  const colorMap = {
    'from-yellow-500 to-yellow-400': { bar: '#F59E0B', line: '#F59E0B', shadow: 'rgba(245, 158, 11, 0.3)' },
    'from-purple-500 to-purple-400': { bar: '#A855F7', line: '#A855F7', shadow: 'rgba(168, 85, 247, 0.3)' },
    'from-cyan-500 to-cyan-400': { bar: '#06B6D4', line: '#06B6D4', shadow: 'rgba(6, 182, 212, 0.3)' },
  };

  const colors = colorMap[lineColor] || { bar: '#F59E0B', line: '#F59E0B', shadow: 'rgba(245, 158, 11, 0.3)' };
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Line chart rendering
  if (chartType === 'line') {
    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * 100;
      const y = 100 - ((val - minValue) / range) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 flex-1">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-gray-400 text-sm mb-2">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
        </div>

        <div className="relative h-40 mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`grad-${title}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: colors.line, stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: colors.line, stopOpacity: 0 }} />
              </linearGradient>
            </defs>

            <polyline
              points={points}
              fill={`url(#grad-${title})`}
              stroke={colors.line}
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
            />

            {data.map((val, idx) => {
              const x = (idx / (data.length - 1)) * 100;
              const y = 100 - ((val - minValue) / range) * 100;
              return (
                <circle
                  key={idx}
                  cx={x}
                  cy={y}
                  r="1.2"
                  fill={colors.line}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}

            {hoveredIndex !== null && (
              <>
                <line
                  x1={(hoveredIndex / (data.length - 1)) * 100}
                  y1="0"
                  x2={(hoveredIndex / (data.length - 1)) * 100}
                  y2="100"
                  stroke={colors.line}
                  strokeWidth="1"
                  opacity="0.5"
                  vectorEffect="non-scaling-stroke"
                  strokeDasharray="5,5"
                />
              </>
            )}
          </svg>

          <div className="absolute inset-0 flex">
            {data.map((val, idx) => (
              <div
                key={idx}
                className="flex-1 cursor-pointer relative group"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {hoveredIndex === idx && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap border border-gray-700">
                    {days[idx]}: {val}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-500">
          {days.slice(0, data.length).map((day, idx) => (
            <span key={idx}>{day}</span>
          ))}
        </div>
      </div>
    );
  }

  // Bar chart rendering
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 flex-1">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-gray-400 text-sm mb-2">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>

      <div className="relative h-40 flex items-end justify-between gap-2 mb-6">
        {data.map((val, idx) => {
          const height = (val / maxValue) * 100;
          return (
            <div key={idx} className="flex-1 flex flex-col items-center relative group">
              <div
                className="w-full rounded-t transition-all hover:opacity-80 cursor-pointer relative"
                style={{
                  height: `${height}%`,
                  backgroundColor: colors.bar,
                  boxShadow: `0 0 20px ${colors.shadow}`,
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {hoveredIndex === idx && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap border border-gray-700">
                    {val}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between text-xs text-gray-500">
        {days.slice(0, data.length).map((day, idx) => (
          <span key={idx}>{day}</span>
        ))}
      </div>
    </div>
  );
}
