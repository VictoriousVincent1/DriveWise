import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Financial calculation utilities
export function calculateMonthlyPayment(
  principal: number,
  apr: number,
  termMonths: number
): number {
  const monthlyRate = apr / 100 / 12;
  if (monthlyRate === 0) return principal / termMonths;
  
  const payment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1);
  
  return Math.round(payment * 100) / 100;
}

export function calculateTotalInterest(
  monthlyPayment: number,
  termMonths: number,
  principal: number
): number {
  return Math.round((monthlyPayment * termMonths - principal) * 100) / 100;
}

export function calculateLeasePayment(
  msrp: number,
  residualPercent: number,
  apr: number,
  termMonths: number,
  downPayment: number = 0
): number {
  const residualValue = msrp * (residualPercent / 100);
  const depreciation = (msrp - residualValue - downPayment) / termMonths;
  const financeCharge = ((msrp - downPayment + residualValue) * (apr / 100)) / 12;
  
  return Math.round((depreciation + financeCharge) * 100) / 100;
}

export function getAffordabilityTier(
  monthlyIncome: number,
  monthlyExpenses: number
): 'conservative' | 'moderate' | 'aggressive' {
  const disposableIncome = monthlyIncome - monthlyExpenses;
  const ratio = disposableIncome / monthlyIncome;
  
  if (ratio < 0.2) return 'conservative';
  if (ratio < 0.4) return 'moderate';
  return 'aggressive';
}

export function calculateAffordableAmount(
  monthlyIncome: number,
  tier: 'conservative' | 'moderate' | 'aggressive'
): number {
  const percentages = {
    conservative: 0.15,
    moderate: 0.20,
    aggressive: 0.25,
  };
  
  return Math.round(monthlyIncome * percentages[tier] * 100) / 100;
}

export function getAPRFromCreditScore(creditScore: number): number {
  if (creditScore >= 750) return 4.5;
  if (creditScore >= 700) return 6.5;
  if (creditScore >= 650) return 9.0;
  return 13.0;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyDetailed(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function calculateCreditScoreImpact(
  currentScore: number,
  improvement: number,
  loanAmount: number,
  termMonths: number
): { newAPR: number; oldAPR: number; monthlySavings: number; totalSavings: number } {
  const oldAPR = getAPRFromCreditScore(currentScore);
  const newAPR = getAPRFromCreditScore(currentScore + improvement);
  
  const oldPayment = calculateMonthlyPayment(loanAmount, oldAPR, termMonths);
  const newPayment = calculateMonthlyPayment(loanAmount, newAPR, termMonths);
  
  const monthlySavings = oldPayment - newPayment;
  const totalSavings = monthlySavings * termMonths;
  
  return {
    newAPR,
    oldAPR,
    monthlySavings: Math.round(monthlySavings * 100) / 100,
    totalSavings: Math.round(totalSavings * 100) / 100,
  };
}

export function estimateTradeInDepreciation(
  msrp: number,
  age: number,
  mileage: number,
  condition: 'excellent' | 'good' | 'fair' | 'poor'
): number {
  // Basic depreciation calculation
  let value = msrp;
  
  // Age-based depreciation (approximately 15-20% per year)
  const ageDepreciation = [0, 0.20, 0.35, 0.50, 0.60, 0.68, 0.74];
  const depreciationRate = ageDepreciation[Math.min(age, 6)] || 0.80;
  value *= (1 - depreciationRate);
  
  // Mileage adjustment (average 12,000 miles/year)
  const expectedMileage = age * 12000;
  const mileageDiff = mileage - expectedMileage;
  if (mileageDiff > 0) {
    // Penalize high mileage
    value *= (1 - (mileageDiff / 100000) * 0.1);
  } else {
    // Reward low mileage
    value *= (1 + (Math.abs(mileageDiff) / 100000) * 0.05);
  }
  
  // Condition adjustment
  const conditionMultipliers = {
    excellent: 1.1,
    good: 1.0,
    fair: 0.85,
    poor: 0.70,
  };
  value *= conditionMultipliers[condition];
  
  return Math.round(value);
}

export function generateVIN(): string {
  // Generate a mock VIN for testing
  const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';
  let vin = '';
  for (let i = 0; i < 17; i++) {
    vin += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return vin;
}

export function validateVIN(vin: string): boolean {
  // Basic VIN validation
  return /^[A-HJ-NPR-Z0-9]{17}$/i.test(vin);
}

export function getDaysUntil(date: Date): number {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
