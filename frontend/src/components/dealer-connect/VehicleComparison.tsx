'use client';

import type { Dealer, Vehicle, FinanceOption } from '../../types';
import { formatCurrency } from '../../lib/utils';

interface VehicleComparisonProps {
  vehicles: Vehicle[];
  dealers?: Dealer[];
}

export default function VehicleComparison({ vehicles, dealers }: VehicleComparisonProps) {
  if (vehicles.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">No vehicles to compare. Add vehicles to get started!</p>
      </div>
    );
  }

  const mockFinancingOptions: { [key: string]: { lease: number; loan: number } } = {
    'camry-2024-xle': { lease: 429, loan: 498 },
    'camry-2024-se': { lease: 389, loan: 458 },
    'rav4-2024-xle': { lease: 479, loan: 548 },
    'corolla-2024-xse': { lease: 329, loan: 388 },
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-50 p-4 border-b">
        <h2 className="text-2xl font-bold">Vehicle Comparison</h2>
        <p className="text-sm text-gray-600 mt-1">Compare side-by-side to find your perfect match</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left font-semibold text-sm">Feature</th>
              {vehicles.map((vehicle) => (
                <th key={vehicle.id} className="p-4 text-center min-w-[200px]">
                  <div className="space-y-2">
                    <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-4xl"></span>
                    </div>
                    <div>
                      <p className="font-bold">{vehicle.year} {vehicle.model}</p>
                      <p className="text-sm text-gray-600">{vehicle.trim}</p>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b bg-blue-50">
              <td className="p-4 font-semibold">MSRP</td>
              {vehicles.map((vehicle) => (
                <td key={vehicle.id} className="p-4 text-center">
                  <span className="text-xl font-bold text-blue-600">
                    {formatCurrency(vehicle.msrp ?? 0)}
                  </span>
                </td>
              ))}
            </tr>

            <tr className="border-b">
              <td className="p-4 font-semibold">Est. Lease Payment</td>
              {vehicles.map((vehicle) => (
                <td key={vehicle.id} className="p-4 text-center">
                  <div>
                    <span className="text-lg font-bold">
                      {formatCurrency(mockFinancingOptions[vehicle.id]?.lease || 399)}
                    </span>
                    <span className="text-sm text-gray-500">/mo</span>
                    <p className="text-xs text-gray-500 mt-1">36 months, $2,999 down</p>
                  </div>
                </td>
              ))}
            </tr>

            <tr className="border-b bg-gray-50">
              <td className="p-4 font-semibold">Est. Loan Payment</td>
              {vehicles.map((vehicle) => (
                <td key={vehicle.id} className="p-4 text-center">
                  <div>
                    <span className="text-lg font-bold">
                      {formatCurrency(mockFinancingOptions[vehicle.id]?.loan || 499)}
                    </span>
                    <span className="text-sm text-gray-500">/mo</span>
                    <p className="text-xs text-gray-500 mt-1">60 months @ 6.5% APR</p>
                  </div>
                </td>
              ))}
            </tr>

            <tr className="border-b">
              <td className="p-4 font-semibold">Category</td>
              {vehicles.map((vehicle) => (
                <td key={vehicle.id} className="p-4 text-center capitalize">
                  {vehicle.category}
                </td>
              ))}
            </tr>

            <tr className="border-b bg-gray-50">
              <td className="p-4 font-semibold">Fuel Economy</td>
              {vehicles.map((vehicle) => (
                <td key={vehicle.id} className="p-4 text-center">
                  {vehicle.category === 'electric' ? (
                    <span>252 mi range</span>
                  ) : (
                    <span>{vehicle.fuelEconomy?.city ?? '-'} / {vehicle.fuelEconomy?.highway ?? '-'} mpg</span>
                  )}
                </td>
              ))}
            </tr>

            <tr className="border-b">
              <td className="p-4 font-semibold">Key Features</td>
              {vehicles.map((vehicle) => (
                <td key={vehicle.id} className="p-4">
                  <ul className="text-sm space-y-1">
                    {(vehicle.features ?? []).slice(0, 4).map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center justify-center">
                        <span className="text-green-500 mr-1">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            <tr className="border-b bg-gray-50">
              <td className="p-4 font-semibold">Nearby Dealers</td>
              {vehicles.map((vehicle) => (
                <td key={vehicle.id} className="p-4 text-center">
                  <span className="text-blue-600 font-semibold">
                    {Math.floor(Math.random() * 3) + 2} dealers
                  </span>
                  <p className="text-xs text-gray-500 mt-1">Within 10 miles</p>
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4"></td>
              {vehicles.map((vehicle) => (
                <td key={vehicle.id} className="p-4 text-center">
                  <div className="space-y-2">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                      Get Quote
                    </button>
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">
                      Test Drive
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
