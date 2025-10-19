import React, { useMemo, useState } from 'react';
import type { Vehicle } from '../../types';
import VehicleComparison from './VehicleComparison';

const quiz = [
  {
    id: 'partySize',
    label: 'How many people do you usually drive with?',
    options: ['1-2', '3-5', '6+'],
  },
  {
    id: 'cargo',
    label: 'Do you need extra cargo space?',
    options: ['Yes, lots of space', 'A little space is fine', 'Not really'],
  },
  {
    id: 'body',
    label: 'What type of car body do you prefer?',
    options: ['Sedan / hatchback', 'SUV / crossover', 'Truck', 'Minivan'],
  },
  {
    id: 'efficiency',
    label: 'How important is fuel efficiency?',
    options: ['Very important', 'Somewhat important', 'Not important'],
  },
  {
    id: 'powertrain',
    label: 'Do you want hybrid/electric options?',
    options: ['Yes', 'No', 'Maybe'],
  },
];

// Simple local inventory to recommend from (could be replaced by API)
const inventory: Vehicle[] = [
  {
    id: 'camry-2026-le',
    make: 'Toyota',
    model: 'Camry',
    year: 2026,
    trim: 'LE',
    msrp: 29000,
    image: '/vehicles/camry-le.jpg',
    features: ['Hybrid', 'TSS 3.0', 'Apple CarPlay'],
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
    features: ['AWD', 'Hybrid option', 'TSS'],
    fuelEconomy: { city: 28, highway: 35 },
    category: 'suv',
  },
  {
    id: 'sienna-2025-xle',
    make: 'Toyota',
    model: 'Sienna',
    year: 2025,
    trim: 'XLE',
    msrp: 38500,
    image: '/vehicles/sienna.jpg',
    features: ['7-8 seats', 'Hybrid', 'Spacious'],
    fuelEconomy: { city: 36, highway: 36 },
    category: 'minivan',
  },
  {
    id: 'tacoma-2025-sr5',
    make: 'Toyota',
    model: 'Tacoma',
    year: 2025,
    trim: 'SR5',
    msrp: 35500,
    image: '/vehicles/tacoma.jpg',
    features: ['Towing', 'Off-road', 'Durable'],
    fuelEconomy: { city: 20, highway: 26 },
    category: 'truck',
  },
];

export default function CarQuiz() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Vehicle[]>([]);
  const [compareSelection, setCompareSelection] = useState<string[]>([]);

  const current = quiz[index];
  const progress = `${index + 1} / ${quiz.length}`;

  const canNext = Boolean(answers[current?.id]);
  const isLast = index === quiz.length - 1;

  const filtered = useMemo(() => {
    const scored = inventory.map((v) => {
      let score = 0;

      // body preference
      const body = answers.body;
      if (body) {
        if (body.includes('Sedan') && v.category === 'sedan') score += 3;
        if (body.includes('SUV') && v.category === 'suv') score += 3;
        if (body.includes('Truck') && v.category === 'truck') score += 3;
        if (body.includes('Minivan') && v.category === 'minivan') score += 3;
      }

      // party size
      const party = answers.partySize;
      if (party === '6+' && ['suv', 'minivan', 'truck'].includes(v.category)) score += 2;
      if (party === '3-5' && ['suv', 'minivan'].includes(v.category)) score += 1;
      if (party === '1-2' && v.category === 'sedan') score += 1;

      // cargo
      const cargo = answers.cargo;
      if (cargo === 'Yes, lots of space' && ['suv', 'minivan', 'truck'].includes(v.category)) score += 2;
      if (cargo === 'A little space is fine' && ['suv', 'sedan'].includes(v.category)) score += 1;

      // efficiency
      const efficiency = answers.efficiency;
      const isHybrid = v.features.some((f) => f.toLowerCase().includes('hybrid'));
      if (efficiency === 'Very important' && (v.fuelEconomy.city >= 30 || isHybrid)) score += 2;
      if (efficiency === 'Somewhat important' && (v.fuelEconomy.city >= 25 || isHybrid)) score += 1;

      // powertrain
      const powertrain = answers.powertrain;
      if (powertrain === 'Yes' && isHybrid) score += 2;
      if (powertrain === 'Maybe' && isHybrid) score += 1;

      return { v, score };
    });

    const sorted = scored.sort((a, b) => b.score - a.score).map((x) => x.v);
    const top = sorted.slice(0, 4);
    return top.length > 0 ? top : inventory.slice(0, 4);
  }, [answers]);

  const submitQuiz = () => {
    setResults(filtered);
  };

  const toggleCompare = (id: string) => {
    setCompareSelection((prev) => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const selectedForCompare = results.filter(v => compareSelection.includes(v.id));

  return (
  <div className="bg-white rounded shadow p-4 mb-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">What Car Is Right For You?</h2>
        <span className="text-sm text-gray-500">{progress}</span>
      </div>

      {/* one question at a time */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">{current.label}</label>
        <div className="flex flex-wrap gap-3">
          {current.options.map((opt) => (
            <button
              key={opt}
              onClick={() => setAnswers((a) => ({ ...a, [current.id]: opt }))}
              className={`px-3 py-2 rounded border text-sm ${
                answers[current.id] === opt ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-gray-50 border-gray-300'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          className="px-3 py-2 rounded bg-gray-100 disabled:opacity-50"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          Previous
        </button>
        <div className="flex gap-2">
          {!isLast && (
            <button
              className="px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
              onClick={() => setIndex((i) => Math.min(quiz.length - 1, i + 1))}
              disabled={!canNext}
            >
              Next
            </button>
          )}
          {isLast && (
            <button
              className="px-3 py-2 rounded bg-green-600 text-white disabled:opacity-50"
              onClick={submitQuiz}
              disabled={!canNext}
            >
              See Results
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Recommended for you</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map((car) => (
              <div key={car.id} className={`border rounded p-3 ${compareSelection.includes(car.id) ? 'border-blue-500' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{car.year} {car.make} {car.model}</div>
                  <label className="text-sm">
                    <input type="checkbox" className="mr-1" checked={compareSelection.includes(car.id)} onChange={() => toggleCompare(car.id)} />
                    Compare
                  </label>
                </div>
                <div className="text-sm text-gray-600 capitalize">{car.category}</div>
                <div className="text-sm">MSRP ${car.msrp.toLocaleString()}</div>
              </div>
            ))}
          </div>

          {/* show comparison chart when at least 2 are selected */}
          {selectedForCompare.length >= 2 && (
            <div className="mt-6">
              <VehicleComparison vehicles={selectedForCompare} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
