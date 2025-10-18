// App-wide constants
export const APP_NAME = 'ToyotaPath';
export const APP_TAGLINE = 'Your Smart Companion for Car Financing & Ownership';

// API Configuration
export const NESSIE_API_BASE_URL = process.env.NEXT_PUBLIC_NESSIE_API_URL || 'http://api.nessieisreal.com';
export const NESSIE_API_KEY = process.env.NESSIE_API_KEY || '';

// Toyota Models Data
export const TOYOTA_MODELS = [
  { id: 'camry-2024', name: 'Camry', category: 'sedan', startingPrice: 26420 },
  { id: 'corolla-2024', name: 'Corolla', category: 'sedan', startingPrice: 21550 },
  { id: 'rav4-2024', name: 'RAV4', category: 'suv', startingPrice: 28475 },
  { id: 'highlander-2024', name: 'Highlander', category: 'suv', startingPrice: 37935 },
  { id: 'tacoma-2024', name: 'Tacoma', category: 'truck', startingPrice: 28600 },
  { id: 'tundra-2024', name: 'Tundra', category: 'truck', startingPrice: 39965 },
  { id: 'prius-2024', name: 'Prius', category: 'hybrid', startingPrice: 28545 },
  { id: 'bz4x-2024', name: 'bZ4X', category: 'electric', startingPrice: 42000 },
];

// Credit Score Ranges
export const CREDIT_SCORE_RANGES = {
  EXCELLENT: { min: 750, max: 850, label: 'Excellent', aprRange: [3.5, 5.5] },
  GOOD: { min: 700, max: 749, label: 'Good', aprRange: [5.5, 7.5] },
  FAIR: { min: 650, max: 699, label: 'Fair', aprRange: [7.5, 10.5] },
  POOR: { min: 300, max: 649, label: 'Poor', aprRange: [10.5, 15.5] },
};

// Financing Terms (in months)
export const LOAN_TERMS = [36, 48, 60, 72, 84];
export const LEASE_TERMS = [24, 36, 48];

// Affordability Tiers
export const AFFORDABILITY_TIERS = {
  CONSERVATIVE: 0.15, // 15% of monthly income
  MODERATE: 0.20, // 20% of monthly income
  AGGRESSIVE: 0.25, // 25% of monthly income
};

// Financial Education Topics
export const FINANCIAL_TOPICS = [
  {
    id: 'apr',
    title: 'What is APR?',
    description: 'Annual Percentage Rate (APR) represents the yearly cost of a loan including interest and fees.',
    example: 'A 5% APR means you pay 5% of your loan amount in interest per year.',
  },
  {
    id: 'residual-value',
    title: 'Understanding Residual Value',
    description: 'Residual value is the estimated worth of a leased vehicle at the end of the lease term.',
    example: 'Higher residual values typically mean lower monthly lease payments.',
  },
  {
    id: 'lease-vs-buy',
    title: 'Lease vs. Buy: Which is Right for You?',
    description: 'Leasing offers lower monthly payments but no ownership. Buying costs more upfront but builds equity.',
    example: 'Lease if you want a new car every 2-3 years. Buy if you plan to keep the car long-term.',
  },
  {
    id: 'down-payment',
    title: 'The Power of Down Payments',
    description: 'A larger down payment reduces your loan amount, monthly payments, and total interest paid.',
    example: 'Putting 20% down on a $30,000 car saves you about $1,500 in interest over a 5-year loan.',
  },
  {
    id: 'credit-score-impact',
    title: 'How Credit Scores Affect Your Rate',
    description: 'Your credit score directly impacts your APR. Higher scores mean lower interest rates.',
    example: 'Improving your score from 650 to 720 could save you $50-100 per month on a $30,000 loan.',
  },
];

// Service Intervals (in miles)
export const SERVICE_INTERVALS = {
  OIL_CHANGE: 5000,
  TIRE_ROTATION: 5000,
  AIR_FILTER: 15000,
  CABIN_FILTER: 15000,
  BRAKE_INSPECTION: 15000,
  TRANSMISSION_FLUID: 30000,
  COOLANT_FLUSH: 30000,
  SPARK_PLUGS: 60000,
  TIMING_BELT: 100000,
};
