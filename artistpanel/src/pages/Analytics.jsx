import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import LineChart from '../components/LineChart';
import ArtworkBarChart from '../components/ArtworkBarChart';
import ProgressBar from '../components/ProgressBar';
import ArtworkCard from '../components/ArtworkCard';

export default function Analytics() {
  const [period, setPeriod] = useState('Week');
  const [showDropdown, setShowDropdown] = useState(false);

  const chartData = {
    Day: {
      profileVisitors: [450, 520, 480, 610, 550, 720, 680, 750, 820, 890, 950, 1000],
      artworkVisitors: [200, 280, 320, 380, 420, 500, 550, 620, 680, 750, 800, 850],
    },
    Week: {
      profileVisitors: [700, 850, 800, 950, 900, 1100, 1000],
      artworkVisitors: [400, 600, 600, 650, 800, 1000, 800],
    },
    Month: {
      profileVisitors: [3200, 3500, 3800, 4200, 4100, 4500],
      artworkVisitors: [1800, 2100, 2300, 2600, 2400, 2900],
    },
  };

  const getProfileValue = () => {
    const values = {
      Day: '7,620',
      Week: '7,620',
      Month: '25,300',
    };
    return values[period];
  };

  const getArtworkValue = () => {
    const values = {
      Day: '5,365',
      Week: '5,365',
      Month: '14,200',
    };
    return values[period];
  };

  const artworks = [
    { 
      title: 'Prateeksha', 
      price: '₹45,500',
      artist: 'Mrinal Dutt',
      image: 'https://zigguratss.com/assets/upload/art/zigguratss_e913aae60d132b089ebc20bd243cb6f2.jpeg'
    },
    { 
      title: 'Makhan Chor 3', 
      price: '₹52,000',
      artist: 'Mrinal Dutt',
      image: null
    },
    { 
      title: 'Nandi Beckons', 
      price: '₹50,700',
      artist: 'Contemporary Artist',
      image: null
    },
    { 
      title: 'Krishna Raas', 
      price: '₹58,500',
      artist: 'Emerging Artist',
      image: null
    },
  ];

  return (
    <div className="space-y-8 pb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 border-l-4 border-gray-400 pl-4">
          <h2 className="text-3xl font-bold text-white">Analytics Overview</h2>
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-400 text-gray-300 rounded-lg hover:bg-gray-900 transition font-semibold"
          >
            <span>{period}</span>
            <ChevronDown size={18} />
          </button>
          {showDropdown && (
            <div className="absolute top-full right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden z-10 w-32">
              {['Day', 'Week', 'Month'].map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPeriod(p);
                    setShowDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 transition ${
                    period === p
                      ? 'bg-gray-800 text-white border-l-2 border-gray-400'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <LineChart
          title="Profile Visitors"
          value={getProfileValue()}
          data={chartData[period].profileVisitors}
          lineColor="from-yellow-500 to-yellow-400"
          chartType="line"
        />
        <ArtworkBarChart
          title="Artwork Visitors"
          value={getArtworkValue()}
          data={chartData[period].artworkVisitors}
        />
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="grid grid-cols-4 gap-6">
          <ProgressBar label="Profile Completion" percentage={87} color="from-yellow-500 to-yellow-400" />
          <ProgressBar label="Artwork Approval Rate" percentage={96} color="from-cyan-500 to-cyan-400" />
          <ProgressBar label="Response Rate" percentage={78} color="from-blue-500 to-blue-400" />
          <ProgressBar label="Customer Satisfaction" percentage={94} color="from-pink-500 to-pink-400" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 border-l-4 border-gray-400 pl-4">
            <h3 className="text-2xl font-bold text-white">Recent Artworks</h3>
          </div>
          <button className="px-4 py-2 border border-gray-400 text-gray-300 rounded-lg hover:bg-gray-900 transition font-semibold">
            View All Artworks
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {artworks.map((artwork, idx) => (
            <ArtworkCard
              key={idx}
              title={artwork.title}
              price={artwork.price}
              artist={artwork.artist}
              image={artwork.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
