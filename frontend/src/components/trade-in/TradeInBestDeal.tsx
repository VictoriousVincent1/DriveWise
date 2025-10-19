import React from 'react';
import type { TradeInEstimate } from '../../types';
import { formatCurrency } from '../../lib/utils';

interface Props {
  tradeIn: TradeInEstimate | null;
  downPayment: number;
  vehiclePrice: number;
  loanTerm: number;
  apr: number;
}

export default function TradeInBestDeal({ tradeIn, downPayment, vehiclePrice, loanTerm, apr }: Props) {
  if (!tradeIn) return null;
  // Factor trade-in into down payment
  const totalDown = downPayment + tradeIn.estimatedValue;
  const loanAmount = vehiclePrice - totalDown;
  const monthlyPayment = loanAmount > 0 ? Math.round(((loanAmount * (apr / 100 / 12)) / (1 - Math.pow(1 + apr / 100 / 12, -loanTerm))) * 100) / 100 : 0;
  const totalCost = monthlyPayment * loanTerm + totalDown;

  return (
    <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded mt-4">
      <h3 className="text-lg font-bold mb-2">Best Deal Scenario</h3>
      <div className="space-y-2">
        <div>
          <span className="text-sm text-gray-600">Trade-In Value</span>
          <span className="ml-2 font-bold text-green-700">{formatCurrency(tradeIn.estimatedValue)}</span>
        </div>
        <div>
          <span className="text-sm text-gray-600">Total Down Payment (Trade-In + Cash)</span>
          <span className="ml-2 font-bold">{formatCurrency(totalDown)}</span>
        </div>
        <div>
          <span className="text-sm text-gray-600">Loan Amount</span>
          <span className="ml-2 font-bold">{formatCurrency(loanAmount)}</span>
        </div>
        <div>
          <span className="text-sm text-gray-600">Monthly Payment</span>
          <span className="ml-2 font-bold text-blue-600">{formatCurrency(monthlyPayment)}</span>
        </div>
        <div>
          <span className="text-sm text-gray-600">Total Cost (All-In)</span>
          <span className="ml-2 font-bold">{formatCurrency(totalCost)}</span>
        </div>
      </div>
    </div>
  );
}
