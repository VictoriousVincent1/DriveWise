'use client';

import { useState } from 'react';
import { AffordabilityTier } from '@/types';
import { formatCurrency, formatPercent } from '@/lib/utils';

interface AffordabilityCalculatorProps {
  tiers: AffordabilityTier[];
  recommended: AffordabilityTier;
  monthlyIncome: number;
  monthlyExpenses: number;
}

export default function AffordabilityCalculator({
  tiers,
  recommended,
  monthlyIncome,
  monthlyExpenses,
}: AffordabilityCalculatorProps) {
  const [selectedTier, setSelectedTier] = useState<AffordabilityTier>(recommended);

  const disposableIncome = monthlyIncome - monthlyExpenses;
  const budgetPercentage = (selectedTier.monthlyBudget / monthlyIncome) * 100;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Your Affordability Analysis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Monthly Income</p>
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(monthlyIncome)}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Monthly Expenses</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(monthlyExpenses)}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Disposable Income</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(disposableIncome)}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Choose Your Comfort Level</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tiers.map((tier) => (
              <button
                key={tier.tier}
                onClick={() => setSelectedTier(tier)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedTier.tier === tier.tier
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${recommended.tier === tier.tier ? 'ring-2 ring-green-400' : ''}`}
              >
                <div className="text-left">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold capitalize">{tier.tier}</h4>
                    {recommended.tier === tier.tier && (
                      <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mb-1">
                    {formatCurrency(tier.monthlyBudget)}<span className="text-sm text-gray-500">/mo</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatPercent((tier.monthlyBudget / monthlyIncome) * 100)} of income
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {selectedTier.tier.charAt(0).toUpperCase() + selectedTier.tier.slice(1)} Plan Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Monthly Budget</p>
              <p className="text-xl font-bold">{formatCurrency(selectedTier.monthlyBudget)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatPercent(budgetPercentage)} of your monthly income
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Recommended Down Payment</p>
              <p className="text-xl font-bold">{formatCurrency(selectedTier.downPayment)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Maximum Loan Amount</p>
              <p className="text-xl font-bold">{formatCurrency(selectedTier.maxLoanAmount)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Recommended Action</p>
              <p className="text-xl font-bold capitalize">{selectedTier.recommendedAction}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded border-l-4 border-blue-500">
            <p className="text-sm font-semibold text-gray-700 mb-1">Why this plan?</p>
            <p className="text-sm text-gray-600">{selectedTier.reasoning}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
