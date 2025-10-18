'use client';

import { useState } from 'react';
import DealerChatbot from '../../components/dealer-connect/DealerChatbot';
import VehicleComparison from '../../components/dealer-connect/VehicleComparison';
import DealerList from '../../components/dealer-connect/DealerList';
import SavedCars from '../../components/dealer-connect/SavedCars';
import CarQuiz from '../../components/dealer-connect/CarQuiz';
import { mockVehicles } from '../../../../backend/src/data/vehicles';
import { mockDealers } from '../../../../backend/src/data/dealers';

export default function DealerConnectPage() {
  const [mode, setMode] = useState<'chat' | 'visual'>('visual');
  
  const comparisonVehicles = mockVehicles.slice(0, 3);
  const nearbyDealers = mockDealers;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">🤝 Dealer Connect</h1>
            <p className="text-lg text-gray-600">
              Find your perfect Toyota and connect with trusted dealers — your way.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMode('visual')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === 'visual'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Visual Mode
            </button>
            <button
              onClick={() => setMode('chat')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === 'chat'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Chat Mode
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {mode === 'chat' ? (
          <DealerChatbot />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                {/* Saved Cars Segment */}
                <SavedCars />
              </div>
              <div>
                {/* Car Quiz Segment */}
                <CarQuiz />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Nearby Toyota Dealers</h2>
              <DealerList dealers={nearbyDealers} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
