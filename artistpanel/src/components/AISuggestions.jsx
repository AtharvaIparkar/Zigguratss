import React from 'react';
import { Lightbulb, TrendingUp, Zap, Eye } from 'lucide-react';

export default function AISuggestions() {
  const suggestions = [
    {
      type: 'TRENDING',
      title: 'Abstract gold-leaf compositions are surging in Delhi galleries this season.',
      description: 'Consider uploading your latest series.',
      icon: TrendingUp,
    },
    {
      type: 'PRICE TIP',
      title: '"Desert Wind" is underpriced by ~23% vs similar works.',
      description: 'A price adjustment could increase revenue by ₹7,000.',
      icon: Zap,
    },
    {
      type: 'EXHIBITION',
      title: 'India Art Fair 2026 applications close in 12 days — 3 of your works qualify for submission.',
      icon: Eye,
    },
    {
      type: 'INSIGHT',
      title: 'Your Saturday uploads get 2.4x more views. Schedule your next piece for Saturday morning.',
      icon: Lightbulb,
    },
  ];

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
          <Lightbulb size={18} className="text-black" />
        </div>
        <h3 className="text-xl font-semibold text-white">AI Suggestions</h3>
        <span className="text-xs text-gray-400 ml-auto">Zigguratss AI</span>
      </div>

      <div className="space-y-3">
        {suggestions.map((item, idx) => (
          <div key={idx} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex space-x-3">
              <div className="w-6 h-6 rounded bg-yellow-500 flex-shrink-0 flex items-center justify-center">
                <item.icon size={14} className="text-black" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-1">{item.type}</p>
                <p className="text-sm text-gray-200 mb-1">{item.title}</p>
                {item.description && <p className="text-xs text-gray-400">{item.description}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
