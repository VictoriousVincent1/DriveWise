'use client';

import { useState } from 'react';
import DealerChatbot from '../../components/dealer-connect/DealerChatbot';
import VehicleComparison from '../../components/dealer-connect/VehicleComparison';
import DealerList from '../../components/dealer-connect/DealerList';
import SavedCars from '../../components/dealer-connect/SavedCars';
import CarQuiz from '../../components/dealer-connect/CarQuiz';
// TODO: Replace with backend API calls
import { mockSavedCars as mockVehicles } from '../../components/dealer-connect/SavedCars';
const mockDealers = [
  {
    id: 1,
    name: 'Downtown Toyota',
    address: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipCode: '90210',
    phone: '(555) 123-4567',
    email: 'contact@downtowntoyota.com',
  location: '34.0522,-118.2437',
    rating: 4.7,
    distance: 3.2,
  inventory: mockVehicles,
    specialOffers: ['0.9% APR for 36 mo', 'Free maintenance for 2 years'],
  },
  {
    id: 2,
    name: 'Valley Toyota',
    address: '456 Elm Rd',
    city: 'Anytown',
    state: 'CA',
    zipCode: '90211',
    phone: '(555) 987-6543',
    email: 'info@valleytoyota.com',
  location: '34.1015,-118.3265',
    rating: 4.5,
    distance: 7.8,
  inventory: mockVehicles,
    specialOffers: ['$500 loyalty bonus'],
  },
];

export default function DealerConnectPage() {
  const [mode, setMode] = useState<'chat' | 'visual'>('visual');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const comparisonVehicles = mockVehicles.slice(0, 3);
  const nearbyDealers = mockDealers;

  // Function to initiate the Twilio call
  const initiateCall = async () => {
    if (!phoneNumber) {
      alert('Please enter your phone number.');
      return;
    }
    try {
      const response = await fetch('/api/voice-call/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      });
      if (!response.ok) throw new Error('Call initiation failed');
      alert('Call initiated!');
    } catch (err) {
      alert('Failed to initiate call.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">🤝 Dealer Connect</h1>
            <p className="text-lg text-gray-600">
              Find your perfect Toyota and connect with trusted dealers your way.
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


      {/* Phone Number Input and Call Dealer Button */}
      <div className="mb-6 flex flex-col md:flex-row items-end gap-4 justify-end">
        <div>
          <label htmlFor="phone-input" className="block text-sm font-medium text-gray-700 mb-1">Your Phone Number</label>
          <input
            id="phone-input"
            type="tel"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            placeholder="e.g. +15551234567"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={initiateCall}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition-colors"
        >
          📞 Call Dealer
        </button>
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
              <DealerList dealers={nearbyDealers as any} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
