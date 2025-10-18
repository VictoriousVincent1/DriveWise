// Frontend-only shared types for Finance Fit and related components

export type AffordabilityTier = {
  tier: 'conservative' | 'balanced' | 'stretch' | string;
  monthlyBudget: number;
  downPayment: number;
  maxLoanAmount: number;
  recommendedAction: string;
  reasoning: string;
};

export type BankingData = {
  averageMonthlyIncome: number;
  averageMonthlyExpenses: number;
};

// Dealer Connect shared types
export type VehicleCategory =
  | 'sedan'
  | 'suv'
  | 'truck'
  | 'hybrid'
  | 'electric'
  | 'sports'
  | 'minivan'
  | 'crossover';

export type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  msrp: number;
  image: string;
  features: string[];
  fuelEconomy: { city: number; highway: number };
  category: VehicleCategory;
};

export type Dealer = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  rating: number;
  distance: number;
  certified?: boolean;
  specialOffers?: string[];
  inventory: string[]; // vehicle ids or SKUs
};

export type FinancingOption = {
  type: 'lease' | 'loan';
  apr?: number;
  monthlyPayment: number;
  termMonths: number;
  downPayment?: number;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number | Date;
  suggestions?: string[];
};

export type ServiceReminder = {
  id: string;
  title: string;
  dueDate: string; // ISO date
  costEstimate?: number;
  completed?: boolean;
};

export type TradeInEstimate = {
  vin?: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  estimatedValue: number;
  tradeInValue?: number;
  privatePartyValue?: number;
  recommendation?: 'trade-in' | 'sell-private';
  reasoning?: string;
  impactOnNewPurchase?: {
    reducedDownPayment: number;
    reducedMonthlyPayment: number;
  };
  note?: string;
};
