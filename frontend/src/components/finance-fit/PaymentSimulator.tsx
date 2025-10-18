'use client';

import { useState } from 'react';
import { calculateMonthlyPayment, formatCurrency, formatPercent, calculateTotalInterest } from '@/lib/utils';

interface PaymentSimulatorProps {
  defaultPrice?: number;
  defaultCreditScore?: number;
}

export default function PaymentSimulator({
  defaultPrice = 30000,
  defaultCreditScore = 700,
}: PaymentSimulatorProps) {
  const [vehiclePrice, setVehiclePrice] = useState(defaultPrice);
  const [downPayment, setDownPayment] = useState(Math.round(defaultPrice * 0.2));
  const [creditScore, setCreditScore] = useState(defaultCreditScore);
  const [termMonths, setTermMonths] = useState(60);
  const [apr, setAPR] = useState(6.5);

  const loanAmount = vehiclePrice - downPayment;
  const monthlyPayment = calculateMonthlyPayment(loanAmount, apr, termMonths);
  const totalInterest = calculateTotalInterest(monthlyPayment, termMonths, loanAmount);
  const totalCost = monthlyPayment * termMonths;

  const handleCreditScoreChange = (score: number) => {
    setCreditScore(score);
    // Auto-adjust APR based on credit score
    if (score >= 750) setAPR(4.5);
    else if (score >= 700) setAPR(6.5);
    else if (score >= 650) setAPR(9.0);
    else setAPR(13.0);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Interactive Payment Simulator</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Vehicle Price: {formatCurrency(vehiclePrice)}
            </label>
            <input
              type="range"
              min="15000"
              max="80000"
              step="1000"
              value={vehiclePrice}
              onChange={(e) => setVehiclePrice(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$15K</span>
              <span>$80K</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Down Payment: {formatCurrency(downPayment)} ({formatPercent((downPayment / vehiclePrice) * 100)})
            </label>
            <input
              type="range"
              min="0"
              max={vehiclePrice * 0.5}
              step="500"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$0</span>
              <span>{formatCurrency(vehiclePrice * 0.5)}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Credit Score: {creditScore}
            </label>
            <input
              type="range"
              min="500"
              max="850"
              step="10"
              value={creditScore}
              onChange={(e) => handleCreditScoreChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>500</span>
              <span>850</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {creditScore >= 750 && '✨ Excellent - Best rates available'}
              {creditScore >= 700 && creditScore < 750 && '👍 Good - Competitive rates'}
              {creditScore >= 650 && creditScore < 700 && '⚠️ Fair - Higher rates'}
              {creditScore < 650 && '❗ Poor - Limited options'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Loan Term: {termMonths} months ({termMonths / 12} years)
            </label>
            <div className="flex gap-2">
              {[36, 48, 60, 72, 84].map((term) => (
                <button
                  key={term}
                  onClick={() => setTermMonths(term)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    termMonths === term
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {term}mo
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              APR: {formatPercent(apr)}
            </label>
            <input
              type="range"
              min="2"
              max="20"
              step="0.1"
              value={apr}
              onChange={(e) => setAPR(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>2%</span>
              <span>20%</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg">
            <p className="text-sm opacity-90 mb-1">Your Monthly Payment</p>
            <p className="text-4xl font-bold">{formatCurrency(monthlyPayment)}</p>
            <p className="text-sm opacity-75 mt-2">
              Based on {formatCurrency(loanAmount)} financed
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Total Loan Amount</p>
              <p className="text-xl font-bold">{formatCurrency(loanAmount)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Total Interest</p>
              <p className="text-xl font-bold text-red-600">{formatCurrency(totalInterest)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Total Cost</p>
              <p className="text-xl font-bold">{formatCurrency(totalCost)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Down Payment</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(downPayment)}</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <p className="text-sm font-semibold text-yellow-800 mb-2">💡 Money-Saving Tip</p>
            <p className="text-sm text-yellow-700">
              Paying an extra ${Math.round(monthlyPayment * 0.1)}/month could save you approximately{' '}
              {formatCurrency(totalInterest * 0.15)} in interest and shorten your loan by{' '}
              {Math.round(termMonths * 0.15)} months!
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-sm font-semibold text-blue-800 mb-2">📊 Credit Score Impact</p>
            <p className="text-sm text-blue-700">
              Improving your credit score to 750+ could lower your APR to 4.5%, saving you{' '}
              {formatCurrency(
                calculateMonthlyPayment(loanAmount, apr, termMonths) -
                  calculateMonthlyPayment(loanAmount, 4.5, termMonths)
              )}
              /month!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
