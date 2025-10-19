"use client";
import { useEffect, useMemo, useState } from 'react';
import { austinDealers, AUSTIN_CENTER, milesBetween } from '@/lib/data/austinDealers';

type Props = {
  value?: string; // dealer id
  onChange?: (dealerId: string | null, meta?: any) => void;
  radiusMiles?: number;
  brands?: Array<'Toyota' | 'Lexus'>;
};

export default function DealerAutocomplete({ value, onChange, radiusMiles = 50, brands = ['Toyota', 'Lexus'] }: Props) {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(value ?? null);
  
  // Sync selectedId with value prop when it changes
  useEffect(() => {
    setSelectedId(value ?? null);
  }, [value]);
  
  // Serialize brands array to prevent infinite loop
  const brandsKey = brands.sort().join(',');

  const nearby = useMemo(() => {
    // In a real app, we'd geolocate the user; default to Austin center for now.
    const within = austinDealers
      .filter(d => brands.includes(d.brand))
      .filter(d => milesBetween(AUSTIN_CENTER, { lat: d.lat, lon: d.lon }) <= radiusMiles)
      .sort((a, b) => milesBetween(AUSTIN_CENTER, a) - milesBetween(AUSTIN_CENTER, b));
    return within;
  }, [radiusMiles, brandsKey]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return nearby;
    return nearby.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.city.toLowerCase().includes(q) ||
      d.zipCode.includes(q)
    );
  }, [query, nearby]);

  const select = (id: string) => {
    setSelectedId(id);
    setQuery('');
    const d = austinDealers.find(x => x.id === id) || null;
    onChange?.(id, d ? { zipCode: d.zipCode, name: d.name, city: d.city, state: d.state } : undefined);
  };

  const selected = selectedId ? austinDealers.find(d => d.id === selectedId) : null;

  return (
    <div>
      <label className="block mb-1">Dealership</label>
      {selected && !query ? (
        <div className="w-full border rounded px-2 py-1 bg-gray-50 flex justify-between items-center">
          <div>
            <div className="font-medium">{selected.name}</div>
            <div className="text-xs text-gray-600">{selected.city}, {selected.state} {selected.zipCode}</div>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedId(null);
              onChange?.(null);
            }}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Change
          </button>
        </div>
      ) : (
        <div className="relative">
          <input
            type="text"
            className="w-full border rounded px-2 py-1"
            placeholder="Search Toyota/Lexus near Austin"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-64 overflow-auto">
              {filtered.length === 0 ? (
                <div className="p-2 text-sm text-gray-500">No matches</div>
              ) : (
                filtered.map(d => (
                  <button key={d.id} type="button" onClick={() => select(d.id)} className="w-full text-left px-3 py-2 hover:bg-gray-50">
                    <div className="font-medium">{d.name}</div>
                    <div className="text-xs text-gray-600">{d.city}, {d.state} {d.zipCode} • {d.brand}</div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
