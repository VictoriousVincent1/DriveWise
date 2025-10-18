import React, { useState } from 'react';

// Define Vehicle type locally for frontend
interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  msrp: number;
  image: string;
  features: string[];
  fuelEconomy: { city: number; highway: number };
  category: 'sedan' | 'suv' | 'truck' | 'hybrid' | 'electric' | 'sports' | 'minivan' | 'crossover';
}

// Dummy data for now; replace with real saved cars from user state or backend
const mockSavedCars: Vehicle[] = [
  // Example vehicles
  {
    id: 'camry-2026-le',
    make: 'Toyota',
    model: 'Camry',
    year: 2026,
    trim: 'LE',
    msrp: 29000,
    image: '/vehicles/camry-le.jpg',
    features: ['All-Hybrid Powertrain', '232 HP', 'Toyota Safety Sense 3.0'],
    fuelEconomy: { city: 52, highway: 49 },
    category: 'sedan',
  },
  {
    id: 'rav4-2025-xle',
    make: 'Toyota',
    model: 'RAV4',
    year: 2025,
    trim: 'XLE',
    msrp: 32000,
    image: '/vehicles/rav4-xle.jpg',
    features: ['AWD', 'Toyota Safety Sense', 'Apple CarPlay'],
    fuelEconomy: { city: 28, highway: 35 },
    category: 'suv',
  },
];

export default function SavedCars() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const toggleSelect = (id: string) => {
    setSelected(sel => sel.includes(id) ? sel.filter(x => x !== id) : [...sel, id]);
  };

  const selectedCars = mockSavedCars.filter(car => selected.includes(car.id));

  return (
    <div className="bg-white rounded shadow p-4 mb-6">
      <h2 className="text-lg font-bold mb-2">Your Saved Cars</h2>
      <div className="flex flex-wrap gap-4">
        {mockSavedCars.map(car => (
          <div key={car.id} className={`border rounded p-2 w-48 ${selected.includes(car.id) ? 'border-blue-500' : 'border-gray-200'}`}
            onClick={() => toggleSelect(car.id)}>
            <img src={car.image} alt={car.model} className="w-full h-24 object-cover rounded mb-1" />
            <div className="font-semibold">{car.year} {car.make} {car.model}</div>
            <div className="text-sm text-gray-500">{car.trim}</div>
            <div className="text-sm">${car.msrp.toLocaleString()}</div>
            <input type="checkbox" checked={selected.includes(car.id)} readOnly className="mt-1" /> Select
          </div>
        ))}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
        disabled={selected.length < 2}
        onClick={() => setShowCompare(true)}
      >
        Compare Selected
      </button>
      {showCompare && selectedCars.length >= 2 && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
            <button className="absolute top-2 right-2 text-xl" onClick={() => setShowCompare(false)}>&times;</button>
            <h3 className="text-lg font-bold mb-4">Compare Cars</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border">
                <thead>
                  <tr>
                    <th className="p-2 border">Feature</th>
                    {selectedCars.map(car => (
                      <th key={car.id} className="p-2 border">{car.year} {car.make} {car.model}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border font-semibold">MSRP</td>
                    {selectedCars.map(car => (
                      <td key={car.id} className="p-2 border">${car.msrp.toLocaleString()}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-2 border font-semibold">Fuel Economy</td>
                    {selectedCars.map(car => (
                      <td key={car.id} className="p-2 border">{car.fuelEconomy.city}/{car.fuelEconomy.highway} mpg</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-2 border font-semibold">Category</td>
                    {selectedCars.map(car => (
                      <td key={car.id} className="p-2 border">{car.category}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-2 border font-semibold">Features</td>
                    {selectedCars.map(car => (
                      <td key={car.id} className="p-2 border">
                        <ul className="list-disc ml-4">
                          {car.features.map((f: string) => <li key={f}>{f}</li>)}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Budget fit logic placeholder */}
            <div className="mt-4">
              <h4 className="font-semibold mb-1">Budget Fit</h4>
              <p className="text-sm text-gray-600">(Show where each car falls in your budget here...)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
