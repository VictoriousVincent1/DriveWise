'use client';

import type { Dealer } from '../../types';

interface DealerListProps {
  dealers: Dealer[];
}

export default function DealerList({ dealers }: DealerListProps) {
  return (
    <div className="space-y-4">
      {dealers.map((dealer) => (
        <div key={dealer.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold">{dealer.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold ml-1">{dealer.rating}</span>
                    <span className="text-gray-500 text-sm ml-2">• {dealer.distance} miles away</span>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600 space-y-1 mb-3">
                <p>{dealer.address}</p>
                <p>{dealer.city}, {dealer.state} {dealer.zipCode}</p>
                <p className="text-blue-600 font-medium">{dealer.phone}</p>
              </div>

              {dealer.specialOffers && dealer.specialOffers.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm font-semibold text-green-700 mb-1">🎉 Special Offers:</p>
                  <ul className="text-sm space-y-1">
                    {dealer.specialOffers.map((offer, idx) => (
                      <li key={idx} className="text-gray-700">
                        • {offer}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm">
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                  {dealer.inventory.length} vehicles in stock
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4 md:mt-0 md:ml-4 min-w-[200px]">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                Request Quote
              </button>
              <button className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 py-2 px-4 rounded-lg font-medium transition-colors">
                Schedule Test Drive
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">
                View Inventory
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
