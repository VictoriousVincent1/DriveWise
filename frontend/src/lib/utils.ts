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
