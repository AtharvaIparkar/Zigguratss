import React from 'react';

export default function ArtworkCard({ image, title, price, artist }) {
  const gradients = [
    'from-purple-600 via-purple-500 to-pink-500',
    'from-blue-600 via-blue-500 to-cyan-500',
    'from-orange-600 via-orange-500 to-yellow-500',
    'from-green-600 via-green-500 to-emerald-500'
  ];

  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <div className="relative group cursor-pointer">
      <div className={`aspect-square bg-gradient-to-br ${randomGradient} rounded-lg overflow-hidden border border-gray-700 flex items-center justify-center`}>
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div></div>
        )}
      </div>
      <div className="absolute top-3 right-3 bg-gray-800 text-gray-100 px-3 py-1 rounded text-sm font-semibold border border-gray-600">
        {price}
      </div>
      <p className="text-white font-semibold mt-3">{title}</p>
      {artist && <p className="text-gray-400 text-xs mt-1">{artist}</p>}
    </div>
  );
}
