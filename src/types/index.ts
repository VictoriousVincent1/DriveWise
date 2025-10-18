// Core user and financial types
export interface User {
  id: string;
  name: string;
  email: string;
  creditScore?: number;
  income?: number;
  accountId?: string; // Capital One account ID
}

export interface AffordabilityTier {
  tier: 'conservative' | 'moderate' | 'aggressive';
  monthlyBudget: number;
  downPayment: number;
  maxLoanAmount: number;
  recommendedAction: 'lease' | 'finance' | 'wait';
  reasoning: string;
}

export interface FinancingOption {
  id: string;
  type: 'lease' | 'loan';
  vehicleId: string;
  monthlyPayment: number;
  downPayment: number;
  apr: number;
  termMonths: number;
  totalCost: number;
  residualValue?: number; // For leases
  savings?: {
    comparison: string;
    amount: number;
  };
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  msrp: number;
  image: string;
  features: string[];
  fuelEconomy: {
    city: number;
    highway: number;
  };
  category: 'sedan' | 'suv' | 'truck' | 'hybrid' | 'electric';
}

export interface TradeInEstimate {
  vin: string;
  year: number;
  make: string;
  model: string;
  mileage: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  estimatedValue: number;
  tradeInValue: number;
  privatePartyValue: number;
  recommendation: 'trade-in' | 'sell-private' | 'keep';
  reasoning: string;
  impactOnNewPurchase?: {
    reducedDownPayment: number;
    reducedMonthlyPayment: number;
  };
}

export interface Dealer {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  rating: number;
  distance: number;
  inventory: string[]; // Vehicle IDs
  specialOffers?: string[];
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  type: 'oil-change' | 'tire-rotation' | 'inspection' | 'repair' | 'other';
  description: string;
  date: Date;
  mileage: number;
  cost: number;
  dealerId?: string;
}

export interface ServiceReminder {
  id: string;
  vehicleId: string;
  type: string;
  dueDate: Date;
  dueMileage: number;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

export interface BankingData {
  accountId: string;
  balance: number;
  averageMonthlyIncome: number;
  averageMonthlyExpenses: number;
  recentTransactions: Transaction[];
}

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'debit' | 'credit';
  category: string;
}

export interface FinancialTip {
  id: string;
  title: string;
  description: string;
  impact: string;
  category: 'credit' | 'savings' | 'payment' | 'general';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'dealer';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export interface DealerQuote {
  id: string;
  dealerId: string;
  vehicleId: string;
  financingOption: FinancingOption;
  additionalOffers?: string[];
  validUntil: Date;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
}
