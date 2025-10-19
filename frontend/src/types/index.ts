// Frontend-only shared types for Finance Fit and related components

export type AffordabilityTier = {
  tier: 'conservative' | 'balanced' | 'stretch' | string;
  monthlyBudget: number;
  downPayment: number;
  maxLoanAmount: number;
  recommendedAction: string;
};

export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  image: string;
  description?: string;
}

export interface Dealer {
  id: number;
  name: string;
  location: string;
  phone: string;
  email: string;
  inventory: Vehicle[];
}

export interface FinanceOption {
  id: number;
  name: string;
  interestRate: number;
  termMonths: number;
  minDownPayment: number;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  message: string;
  timestamp: string;
}

export interface TradeInEstimate {
  vehicleId: number;
  estimatedValue: number;
  offerExpires: string;
}

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
