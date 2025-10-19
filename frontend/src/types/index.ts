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

export interface Vehicle {
  id: number | string;
  make: string;
  model: string;
  year: number;
  trim: string;
  price?: number;
  msrp: number;
  mileage?: number;
  image: string;
  description?: string;
  features: string[];
  fuelEconomy: { city: number; highway: number };
  category: VehicleCategory;
}

export interface Dealer {
  id: number | string;
  name: string;
  location: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  rating: number;
  distance: number;
  certified?: boolean;
  specialOffers?: string[];
  inventory: Vehicle[] | string[];
}

export interface FinanceOption {
  id: number;
  name: string;
  interestRate: number;
  termMonths: number;
  minDownPayment: number;
}

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

export interface MaintenanceRecord {
  id: number;
  vehicleId: number;
  service: string;
  date: string;
  cost: number;
  notes?: string;
}

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
