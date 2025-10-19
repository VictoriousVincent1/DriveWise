
'use client';

import { useState, useEffect } from 'react';
import AffordabilityCalculator from '../../components/finance-fit/AffordabilityCalculator';
import { calculateMonthlyPayment, calculateTotalInterest, formatCurrency } from '../../lib/utils';
import { calculateAffordability } from '../../lib/mockData/banking';

export default function FinanceFitPage() {
  const [loading, setLoading] = useState(true);
  const [affordabilityData, setAffordabilityData] = useState<Awaited<ReturnType<typeof calculateAffordability>> | null>(null);

  // Scenario tool states
  const [vehiclePrice, setVehiclePrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(6000);
  const [creditScore, setCreditScore] = useState(720);
  const [termMonths, setTermMonths] = useState(60);
  const [extraPayment, setExtraPayment] = useState(0);

  // APR logic based on credit score
  const getAPR = (score: number) => {
    if (score >= 750) return 4.5;
    if (score >= 700) return 6.5;
    if (score >= 650) return 9.0;
    return 13.0;
  };
  const apr = getAPR(creditScore);

  // Loan calculations
  const loanAmount = vehiclePrice - downPayment;
  const monthlyPayment = calculateMonthlyPayment(loanAmount, apr, termMonths) + extraPayment;
  const totalInterest = calculateTotalInterest(monthlyPayment, termMonths, loanAmount);
  const totalCost = monthlyPayment * termMonths;
  const savingsWithExtra = extraPayment > 0 ? Math.round(extraPayment * termMonths) : 0;

  useEffect(() => {
    // Simulate fetching user data
    const fetchData = async () => {
      const data = await calculateAffordability('acc_123456789', creditScore);
      setAffordabilityData(data);
      setLoading(false);
    };
    fetchData();
  }, [creditScore]);

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
        <h1 className="text-4xl font-bold mb-4">Finance Fit</h1>
        <p className="text-lg text-gray-600">
          Discover what you can afford based on your real financial data.<br />
          Powered by Capital One's Nessie API (or mock data).
        </p>
      </div>

      {/* Trade-In removed: available in Trade-In page */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Scenario Tools */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Scenario Tools</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Vehicle Price: {formatCurrency(vehiclePrice)}</label>
              <input type="range" min="15000" max="80000" step="1000" value={vehiclePrice} onChange={e => setVehiclePrice(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
              <div className="flex justify-between text-xs text-gray-500 mt-1"><span>$15K</span><span>$80K</span></div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Down Payment: {formatCurrency(downPayment)}</label>
              <input type="range" min="0" max={vehiclePrice * 0.5} step="500" value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
              <div className="flex justify-between text-xs text-gray-500 mt-1"><span>$0</span><span>{formatCurrency(vehiclePrice * 0.5)}</span></div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Credit Score: {creditScore}</label>
              <input type="range" min="500" max="850" step="10" value={creditScore} onChange={e => setCreditScore(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
              <div className="flex justify-between text-xs text-gray-500 mt-1"><span>500</span><span>850</span></div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Loan Term: {termMonths} months ({(termMonths / 12).toFixed(1)} years)</label>
              <input type="range" min="24" max="84" step="12" value={termMonths} onChange={e => setTermMonths(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
              <div className="flex justify-between text-xs text-gray-500 mt-1"><span>2 yrs</span><span>7 yrs</span></div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Extra Monthly Payment: {formatCurrency(extraPayment)}</label>
              <input type="range" min="0" max="1000" step="50" value={extraPayment} onChange={e => setExtraPayment(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
              <div className="flex justify-between text-xs text-gray-500 mt-1"><span>$0</span><span>$1,000</span></div>
            </div>
          </div>
        </div>

        {/* Results & Impact */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Long-Term Cost Impact</h2>
          <div className="space-y-4">
            <div>
              <span className="text-sm text-gray-600">Monthly Payment</span>
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(monthlyPayment)}</div>
            </div>
            <div>
              <span className="text-sm text-gray-600">Total Interest Paid</span>
              <div className="text-xl font-bold text-red-600">{formatCurrency(totalInterest)}</div>
            </div>
            <div>
              <span className="text-sm text-gray-600">Total Cost (Loan + Interest)</span>
              <div className="text-xl font-bold">{formatCurrency(totalCost)}</div>
            </div>
            <div>
              <span className="text-sm text-gray-600">Savings from Extra Payments</span>
              <div className="text-xl font-bold text-green-600">{formatCurrency(savingsWithExtra)}</div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600">APR (based on credit score)</span>
              <div className="text-lg font-bold">{apr}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Affordability Calculator (still available) */}
      <div className="mt-12">
        {affordabilityData && (
          <AffordabilityCalculator
            tiers={affordabilityData.tiers}
            recommended={affordabilityData.recommended}
            monthlyIncome={affordabilityData.bankingData.averageMonthlyIncome}
            monthlyExpenses={affordabilityData.bankingData.averageMonthlyExpenses}
          />
        )}
      </div>
    </div>
  );
}
