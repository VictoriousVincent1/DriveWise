// App-wide constants
export const APP_NAME = 'ToyotaPath';
export const APP_TAGLINE = 'Your Smart Companion for Car Financing & Ownership';

// API Configuration
export const NESSIE_API_BASE_URL = process.env.NEXT_PUBLIC_NESSIE_API_URL || 'http://api.nessieisreal.com';
export const NESSIE_API_KEY = process.env.NESSIE_API_KEY || '';

// Toyota & Lexus Models Data
export const TOYOTA_MODELS = [
  // Toyota Sedans
  { id: 'corolla-2024', name: 'Corolla', category: 'sedan', startingPrice: 21550 },
  { id: 'camry-2024', name: 'Camry', category: 'sedan', startingPrice: 26420 },
  { id: 'avalon-2024', name: 'Avalon', category: 'sedan', startingPrice: 37850 },
  { id: 'crown-2024', name: 'Crown', category: 'sedan', startingPrice: 52350 },
  
  // Toyota SUVs
  { id: 'rav4-2024', name: 'RAV4', category: 'suv', startingPrice: 28475 },
  { id: 'highlander-2024', name: 'Highlander', category: 'suv', startingPrice: 42665 },
  { id: '4runner-2024', name: '4Runner', category: 'suv', startingPrice: 42295 },
  { id: 'sequoia-2024', name: 'Sequoia', category: 'suv', startingPrice: 70765 },
  { id: 'land-cruiser-2024', name: 'Land Cruiser', category: 'suv', startingPrice: 58300 },
  
  // Toyota Trucks
  { id: 'tacoma-2024', name: 'Tacoma', category: 'truck', startingPrice: 28600 },
  { id: 'tundra-2024', name: 'Tundra', category: 'truck', startingPrice: 39965 },
  
  // Toyota Hybrids
  { id: 'prius-2024', name: 'Prius', category: 'hybrid', startingPrice: 28545 },
  { id: 'prius-prime-2024', name: 'Prius Prime', category: 'hybrid', startingPrice: 35635 },
  { id: 'rav4-prime-2024', name: 'RAV4 Prime', category: 'hybrid', startingPrice: 44425 },
  { id: 'camry-hybrid-2024', name: 'Camry Hybrid', category: 'hybrid', startingPrice: 30895 },
  { id: 'corolla-hybrid-2024', name: 'Corolla Hybrid', category: 'hybrid', startingPrice: 24300 },
  
  // Toyota Electric
  { id: 'bz4x-2024', name: 'bZ4X', category: 'electric', startingPrice: 42000 },
];

export const LEXUS_MODELS = [
  // Lexus Sedans
  { id: 'lexus-is-2024', name: 'IS', category: 'sedan', startingPrice: 42565 },
  { id: 'lexus-es-2024', name: 'ES', category: 'sedan', startingPrice: 43190 },
  { id: 'lexus-ls-2024', name: 'LS', category: 'sedan', startingPrice: 77635 },
  { id: 'lexus-rc-2024', name: 'RC', category: 'sedan', startingPrice: 44565 },
  { id: 'lexus-lc-2024', name: 'LC', category: 'sedan', startingPrice: 97755 },
  
  // Lexus SUVs
  { id: 'lexus-ux-2024', name: 'UX', category: 'suv', startingPrice: 38535 },
  { id: 'lexus-nx-2024', name: 'NX', category: 'suv', startingPrice: 42465 },
  { id: 'lexus-rx-2024', name: 'RX', category: 'suv', startingPrice: 50325 },
  { id: 'lexus-tx-2024', name: 'TX', category: 'suv', startingPrice: 56050 },
  { id: 'lexus-gx-2024', name: 'GX', category: 'suv', startingPrice: 65250 },
  { id: 'lexus-lx-2024', name: 'LX', category: 'suv', startingPrice: 92350 },
  
  // Lexus Electric
  { id: 'lexus-rz-2024', name: 'RZ', category: 'electric', startingPrice: 61215 },
];

export const ALL_MODELS = [...TOYOTA_MODELS, ...LEXUS_MODELS];

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
