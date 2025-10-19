'use client';

import { useState, useEffect } from 'react';
import AffordabilityCalculator from '../../components/finance-fit/AffordabilityCalculator';
import PaymentSimulator from '../../components/finance-fit/PaymentSimulator';
import { calculateAffordability } from '../../lib/mockData/banking';
import type { AffordabilityTier, BankingData } from '../../types';

export default function FinanceFitPage() {
  const [loading, setLoading] = useState(true);
  const [affordabilityData, setAffordabilityData] = useState<{
    tiers: AffordabilityTier[];
    recommended: AffordabilityTier;
    bankingData: BankingData;
  } | null>(null);

  useEffect(() => {
    // Simulate fetching user data
    const fetchData = async () => {
      const data = await calculateAffordability('acc_123456789', 720);
      setAffordabilityData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading your financial profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">💰 Finance Fit</h1>
        <p className="text-lg text-gray-600">
          Discover what you can afford based on your real financial data. 
          Powered by Capital One's Nessie API.
        </p>
      </div>

      <div className="space-y-8">
        {affordabilityData && (
          <AffordabilityCalculator
            tiers={affordabilityData.tiers}
            recommended={affordabilityData.recommended}
            monthlyIncome={affordabilityData.bankingData.averageMonthlyIncome}
            monthlyExpenses={affordabilityData.bankingData.averageMonthlyExpenses}
          />
        )}

        <PaymentSimulator defaultCreditScore={720} />
      </div>
    </div>
  );
}
