import React, { useState } from 'react';
import type { TradeInEstimate, Vehicle } from '../../types';

const initialVehicle: Partial<Vehicle> = {
  make: 'Toyota',
  model: '',
  year: 2020,
  trim: '',
  category: 'sedan',
};

function estimateTradeIn(vehicle: Partial<Vehicle>): TradeInEstimate {
  // Simple mock logic: base value by year/model, adjust for condition
  const base = 12000 + (vehicle.year ? (vehicle.year - 2015) * 1000 : 0);
  let condition: TradeInEstimate['condition'] = 'good';
  let value = base;
  if (vehicle.year && vehicle.year >= 2022) {
    condition = 'excellent';
    value += 3000;
  } else if (vehicle.year && vehicle.year <= 2016) {
    condition = 'fair';
    value -= 2000;
  }
  return {
    make: vehicle.make || '',
    model: vehicle.model || '',
    year: vehicle.year || 2020,
    mileage: 36000,
    condition,
    estimatedValue: value,
    note: 'Estimate based on year and model. Actual value may vary.',
  };
}

export default function TradeInInput({ onSave }: { onSave?: (vehicle: Vehicle, estimate: TradeInEstimate) => void }) {
  const [vehicle, setVehicle] = useState<Partial<Vehicle>>(initialVehicle);
  const [estimate, setEstimate] = useState<TradeInEstimate | null>(null);

  const handleChange = (field: keyof Vehicle, value: string | number) => {
    setVehicle((v) => ({ ...v, [field]: value }));
  };

  const handleEstimate = () => {
    const est = estimateTradeIn(vehicle);
    setEstimate(est);
    if (onSave && vehicle.make && vehicle.model && vehicle.year) {
      onSave(vehicle as Vehicle, est);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 mb-6">
      <h2 className="text-lg font-bold mb-2">Your Current Toyota (Trade-In)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Model</label>
          <input type="text" className="w-full border rounded px-2 py-1" value={vehicle.model || ''} onChange={e => handleChange('model', e.target.value)} placeholder="e.g. Camry" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Year</label>
          <input type="number" className="w-full border rounded px-2 py-1" value={vehicle.year || 2020} min={2000} max={2025} onChange={e => handleChange('year', Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Trim</label>
          <input type="text" className="w-full border rounded px-2 py-1" value={vehicle.trim || ''} onChange={e => handleChange('trim', e.target.value)} placeholder="e.g. LE" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select className="w-full border rounded px-2 py-1" value={vehicle.category || 'sedan'} onChange={e => handleChange('category', e.target.value)}>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="truck">Truck</option>
            <option value="minivan">Minivan</option>
            <option value="crossover">Crossover</option>
          </select>
        </div>
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleEstimate}>Estimate Trade-In Value</button>
      {estimate && (
        <div className="mt-4 p-3 bg-blue-50 rounded">
          <strong>Estimated Value:</strong> ${estimate.estimatedValue.toLocaleString()}<br />
          <span className="text-sm text-gray-600">Condition: {estimate.condition}</span><br />
          <span className="text-xs text-gray-500">{estimate.note}</span>
        </div>
      )}
    </div>
  );
}
