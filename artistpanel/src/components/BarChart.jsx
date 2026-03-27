import React from 'react';

export default function BarChart({ title, data, showButtons = true }) {
  const maxValue = Math.max(...data);

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {showButtons && (
          <div className="flex space-x-2">
            {['Day', 'Week', 'Month'].map((period) => (
              <button
                key={period}
                className={`px-3 py-1 text-xs font-medium rounded transition ${
                  period === 'Day' ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-end justify-between h-32 space-x-2">
        {data.map((value, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center space-y-2">
            <div
              className="w-full bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t"
              style={{ height: `${(value / maxValue) * 100}%` }}
            ></div>
            <span className="text-xs text-gray-400">{'MTWFSS'[idx]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
