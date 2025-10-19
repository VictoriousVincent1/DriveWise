import React, { useState } from 'react';
import type { Vehicle } from '../../types';
import VehicleComparison from './VehicleComparison';

// Mock data for development and legacy imports
export const mockSavedCars: Vehicle[] = [
<<<<<<< HEAD
=======
  //examples
>>>>>>> fea63a6a403c7c830044ac8342b1be100e759891
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
  const [savedCars, setSavedCars] = useState<Vehicle[]>([]);
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [showAdjust, setShowAdjust] = useState(false);
  const [apiCars, setApiCars] = useState<Vehicle[]>([ // Add more Toyota vehicles for scrolling
    {
      id: 'corolla-2025-se',
      make: 'Toyota',
      model: 'Corolla',
      year: 2025,
      trim: 'SE',
      msrp: 24000,
      image: '/vehicles/corolla-se.jpg',
      features: ['Apple CarPlay', 'Toyota Safety Sense'],
      fuelEconomy: { city: 30, highway: 38 },
      category: 'sedan',
    },
    {
      id: 'highlander-2025-xle',
      make: 'Toyota',
      model: 'Highlander',
      year: 2025,
      trim: 'XLE',
      msrp: 41000,
      image: '/vehicles/highlander-xle.jpg',
      features: ['AWD', 'Third Row Seating', 'Hybrid'],
      fuelEconomy: { city: 36, highway: 35 },
      category: 'suv',
    },
    {
      id: 'tacoma-2025-trd',
      make: 'Toyota',
      model: 'Tacoma',
      year: 2025,
      trim: 'TRD Off-Road',
      msrp: 37000,
      image: '/vehicles/tacoma-trd.jpg',
      features: ['4WD', 'Tow Package', 'Off-Road Suspension'],
      fuelEconomy: { city: 19, highway: 24 },
      category: 'truck',
    },
    // ...existing apiCars fetched from API
  ]);
  const [loadingApi, setLoadingApi] = useState(false);

  // Fetch saved cars from API on mount
  React.useEffect(() => {
    const fetchSavedCars = async () => {
      try {
        const res = await fetch('/api/saved-cars');
        const data = await res.json();
        setSavedCars(data.cars || []);
      } catch {
        setSavedCars([]);
      }
    };
    fetchSavedCars();
  }, []);

  const fetchApiCars = async () => {
    setLoadingApi(true);
    try {
      const res = await fetch('/api/saved-cars');
      const data = await res.json();
      setApiCars(data.cars || []);
    } catch {
      setApiCars([]);
    } finally {
      setLoadingApi(false);
    }
  };

  const toggleSelect = (id: string | number) => {
    setSelected(sel => sel.includes(id) ? sel.filter(x => x !== id) : [...sel, id]);
  };

  const selectedCars = savedCars.filter(car => selected.includes(car.id));

  return (
  <div className="bg-white rounded shadow p-4 mb-6 h-full">
      <h2 className="text-lg font-bold mb-2">Your Saved Cars</h2>
      <button
        className="mb-4 px-3 py-2 bg-green-600 text-white rounded"
        onClick={() => { setShowAdjust(true); fetchApiCars(); }}
      >
        Add Cars
      </button>
      <div className="flex flex-wrap gap-4">
        {savedCars.map(car => (
          <div key={car.id} className={`border rounded p-2 w-48 ${selected.includes(car.id) ? 'border-blue-500' : 'border-gray-200'}`}
            onClick={() => toggleSelect(car.id)}>
            <img src={car.image} alt={car.model} className="w-full h-24 object-cover rounded mb-1" />
            <div className="font-semibold">{car.year} {car.make} {car.model}</div>
            <div className="text-sm text-gray-500">{car.trim}</div>
<<<<<<< HEAD
            <div className="text-sm">{car.msrp ? `$${car.msrp.toLocaleString()}` : ''}</div>
=======
            <div className="text-sm">{car.msrp != null ? `$${car.msrp.toLocaleString()}` : 'N/A'}</div>
>>>>>>> fea63a6a403c7c830044ac8342b1be100e759891
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
<<<<<<< HEAD
                      <td key={car.id} className="p-2 border">{car.msrp != null ? `$${car.msrp.toLocaleString()}` : '—'}</td>
=======
                      <td key={car.id} className="p-2 border">{car.msrp != null ? `$${car.msrp.toLocaleString()}` : 'N/A'}</td>
>>>>>>> fea63a6a403c7c830044ac8342b1be100e759891
                    ))}
                  </tr>
                  <tr>
                    <td className="p-2 border font-semibold">Fuel Economy</td>
                    {selectedCars.map(car => (
<<<<<<< HEAD
                      <td key={car.id} className="p-2 border">{car.fuelEconomy ? `${car.fuelEconomy.city}/${car.fuelEconomy.highway} mpg` : '—'}</td>
=======
                      <td key={car.id} className="p-2 border">
                        {car.fuelEconomy ? `${car.fuelEconomy.city}/${car.fuelEconomy.highway} mpg` : 'N/A'}
                      </td>
>>>>>>> fea63a6a403c7c830044ac8342b1be100e759891
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
<<<<<<< HEAD
                          {(car.features || []).map((f: string) => <li key={f}>{f}</li>)}
=======
                          {(car.features ?? []).map((f: string) => <li key={f}>{f}</li>)}
>>>>>>> fea63a6a403c7c830044ac8342b1be100e759891
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

      {/* Add Cars Card Popup (not blocking entire page) */}
      {showAdjust && (
        <div className="absolute right-0 top-0 mt-12 mr-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative border border-gray-200">
            <button className="absolute top-2 right-2 text-xl" onClick={() => setShowAdjust(false)}>&times;</button>
            <h3 className="text-lg font-bold mb-4">Add Cars to Your Saved List</h3>
            {loadingApi ? (
              <div>Loading cars...</div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {apiCars.length === 0 ? (
                  <div className="text-gray-500">No cars found.</div>
                ) : (
                  apiCars.map(car => (
                    <div key={car.id} className="border rounded p-2 flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{car.year} {car.make} {car.model}</div>
                        <div className="text-sm text-gray-500">{car.trim}</div>
                      </div>
                      <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={async () => {
                        setSavedCars(prev => [...prev, car]);
                        try {
                          const res = await fetch('/api/save-car', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ car }),
                          });
                        } catch {}
                      }}>Add</button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Also show the comparison chart inline at the bottom when 2+ cars are selected */}
      {selectedCars.length >= 2 && (
        <div className="mt-6">
          <VehicleComparison vehicles={selectedCars} />
        </div>
      )}
    </div>
  );
}
