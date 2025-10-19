// Basic currency/percent formatters and loan calculations for the frontend

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function calculateMonthlyPayment(principal: number, aprPercent: number, termMonths: number): number {
  const r = aprPercent / 100 / 12;
  if (r === 0) return Math.round((principal / termMonths) * 100) / 100;
  const payment = (principal * r) / (1 - Math.pow(1 + r, -termMonths));
  return Math.round(payment * 100) / 100;
}

export function calculateTotalInterest(monthlyPayment: number, termMonths: number, principal: number): number {
  const totalPaid = monthlyPayment * termMonths;
  return Math.max(0, Math.round((totalPaid - principal) * 100) / 100);
}

// Trade-in helpers
export function estimateTradeInDepreciation(msrp: number, ageYears: number, mileage: number, condition: 'excellent' | 'good' | 'fair' | 'poor'): number {
  // Simple model: base depreciation 15% first year, 10% thereafter; mileage impact; condition modifier
  let value = msrp * Math.pow(0.85, Math.min(1, ageYears)) * Math.pow(0.90, Math.max(0, ageYears - 1));
  // mileage: subtract $0.05 per mile over 12k/year baseline
  const expectedMiles = ageYears * 12000;
  const extraMiles = Math.max(0, mileage - expectedMiles);
  value -= extraMiles * 0.05;
  // condition modifier
  const conditionFactor = { excellent: 1.05, good: 1.0, fair: 0.9, poor: 0.75 }[condition];
  value *= conditionFactor;
  return Math.max(1000, Math.round(value));
}

export function validateVIN(vin: string): boolean {
  // Basic VIN format check: 17 alphanumeric characters, excluding I, O, Q
  return /^[A-HJ-NPR-Z0-9]{17}$/i.test(vin);
}

// Ownership helpers
export function getDaysUntil(date: Date): number {
  const start = new Date();
  // Normalize to midnight to avoid DST/timezone wiggles in diff
  start.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.ceil((target.getTime() - start.getTime()) / msPerDay);
}

export function formatDate(date: Date): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch {
    return String(date);
  }
}
