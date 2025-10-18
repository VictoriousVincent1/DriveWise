'use client';

import { useState } from 'react';
import { TradeInEstimate } from '@/types';
import { formatCurrency, estimateTradeInDepreciation, validateVIN } from '@/lib/utils';

export default function TradeInCalculator() {
  const [step, setStep] = useState<'input' | 'result'>('input');
  const [formData, setFormData] = useState({
    vin: '',
    year: new Date().getFullYear() - 3,
    make: 'Toyota',
    model: 'Camry',
    mileage: 36000,
    condition: 'good' as 'excellent' | 'good' | 'fair' | 'poor',
  });
  const [estimate, setEstimate] = useState<TradeInEstimate | null>(null);

  const handleCalculate = () => {
    // Simulate trade-in calculation
    const msrp = 28000; // Example MSRP
    const age = new Date().getFullYear() - formData.year;
    
    const estimatedValue = estimateTradeInDepreciation(
      msrp,
      age,
      formData.mileage,
      formData.condition
    );
    
    const tradeInValue = Math.round(estimatedValue * 0.90); // Dealers typically offer 90% of market
    const privatePartyValue = Math.round(estimatedValue * 1.05); // Private party typically 5% more
    
    const newEstimate: TradeInEstimate = {
      vin: formData.vin || 'Not provided',
      year: formData.year,
      make: formData.make,
      model: formData.model,
      mileage: formData.mileage,
      condition: formData.condition,
      estimatedValue,
      tradeInValue,
      privatePartyValue,
      recommendation: tradeInValue > 5000 ? 'trade-in' : 'sell-private',
      reasoning:
        tradeInValue > 5000
          ? 'Trade-in offers convenience and immediate credit toward your new vehicle. The dealer\'s offer is competitive.'
          : 'Selling privately could net you more money, though it requires more effort. Consider the time vs. value trade-off.',
      impactOnNewPurchase: {
        reducedDownPayment: tradeInValue,
        reducedMonthlyPayment: Math.round(tradeInValue / 60), // Spread over 60 months
      },
    };
    
    setEstimate(newEstimate);
    setStep('result');
  };

  const handleReset = () => {
    setStep('input');
    setEstimate(null);
  };

  if (step === 'result' && estimate) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Trade-In Estimate</h2>
          <button
            onClick={handleReset}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Calculate Another
          </button>
        </div>

        <div className="space-y-6">
          {/* Vehicle Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Vehicle Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Vehicle:</span>
                <p className="font-medium">
                  {estimate.year} {estimate.make} {estimate.model}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Mileage:</span>
                <p className="font-medium">{estimate.mileage.toLocaleString()} miles</p>
              </div>
              <div>
                <span className="text-gray-600">Condition:</span>
                <p className="font-medium capitalize">{estimate.condition}</p>
              </div>
              {estimate.vin !== 'Not provided' && (
                <div>
                  <span className="text-gray-600">VIN:</span>
                  <p className="font-medium font-mono text-xs">{estimate.vin}</p>
                </div>
              )}
            </div>
          </div>

          {/* Valuation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Trade-In Value</p>
              <p className="text-3xl font-bold text-blue-600">{formatCurrency(estimate.tradeInValue)}</p>
              <p className="text-xs text-gray-500 mt-1">What dealer will offer</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
              <p className="text-sm text-gray-600 mb-1">Private Party Value</p>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(estimate.privatePartyValue)}</p>
              <p className="text-xs text-gray-500 mt-1">If you sell yourself</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Market Value</p>
              <p className="text-3xl font-bold text-purple-600">{formatCurrency(estimate.estimatedValue)}</p>
              <p className="text-xs text-gray-500 mt-1">Average market price</p>
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2">💡 Our Recommendation</h3>
            <p className="text-lg mb-2 capitalize">
              <strong>{estimate.recommendation.replace('-', ' ')}</strong>
            </p>
            <p className="text-sm opacity-90">{estimate.reasoning}</p>
          </div>

          {/* Impact on New Purchase */}
          {estimate.impactOnNewPurchase && (
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-4 text-yellow-900">
                📊 Impact on Your New Toyota Purchase
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-yellow-800 mb-1">Reduced Down Payment Needed</p>
                  <p className="text-2xl font-bold text-yellow-900">
                    {formatCurrency(estimate.impactOnNewPurchase.reducedDownPayment)}
                  </p>
                  <p className="text-xs text-yellow-700 mt-1">
                    Your trade-in can cover this much of your down payment
                  </p>
                </div>
                <div>
                  <p className="text-sm text-yellow-800 mb-1">Lower Monthly Payment</p>
                  <p className="text-2xl font-bold text-yellow-900">
                    -{formatCurrency(estimate.impactOnNewPurchase.reducedMonthlyPayment)}/mo
                  </p>
                  <p className="text-xs text-yellow-700 mt-1">
                    Approximate reduction on a 60-month loan
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Comparison */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-4">Trade-In vs. Private Sale</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🤝</span>
                <div className="flex-1">
                  <p className="font-semibold">Trade-In Benefits</p>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>✓ Instant credit toward new vehicle</li>
                    <li>✓ No need to list, show, or negotiate</li>
                    <li>✓ Tax savings in most states</li>
                    <li>✓ One-stop transaction</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💰</span>
                <div className="flex-1">
                  <p className="font-semibold">Private Sale Benefits</p>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>✓ Potentially {formatCurrency(estimate.privatePartyValue - estimate.tradeInValue)} more</li>
                    <li>✓ More control over sale price</li>
                    <li>✗ Takes time and effort</li>
                    <li>✗ Safety concerns meeting strangers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
              Get Official Appraisal
            </button>
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors">
              Apply Trade-In to Quote
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Smart Trade-In Calculator</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            VIN (Optional - for more accurate estimate)
          </label>
          <input
            type="text"
            value={formData.vin}
            onChange={(e) => setFormData({ ...formData, vin: e.target.value.toUpperCase() })}
            placeholder="Enter 17-character VIN"
            maxLength={17}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formData.vin && !validateVIN(formData.vin) && formData.vin.length === 17 && (
            <p className="text-sm text-red-600 mt-1">Invalid VIN format</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Year</label>
            <select
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Make</label>
            <select
              value={formData.make}
              onChange={(e) => setFormData({ ...formData, make: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Toyota</option>
              <option>Honda</option>
              <option>Ford</option>
              <option>Chevrolet</option>
              <option>Nissan</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Model</label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Mileage: {formData.mileage.toLocaleString()} miles
            </label>
            <input
              type="range"
              min="0"
              max="200000"
              step="1000"
              value={formData.mileage}
              onChange={(e) => setFormData({ ...formData, mileage: Number(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">Vehicle Condition</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(['excellent', 'good', 'fair', 'poor'] as const).map((condition) => (
              <button
                key={condition}
                onClick={() => setFormData({ ...formData, condition })}
                className={`p-4 rounded-lg border-2 transition-all capitalize ${
                  formData.condition === condition
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {condition}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            • Excellent: Like new, minimal wear
            <br />
            • Good: Well maintained, some wear
            <br />
            • Fair: Noticeable wear, needs minor repairs
            <br />
            • Poor: Significant damage or mechanical issues
          </p>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Calculate Trade-In Value
        </button>
      </div>
    </div>
  );
}
