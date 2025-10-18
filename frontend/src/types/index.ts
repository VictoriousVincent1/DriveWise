// Type definitions for ToyotaPath Frontend

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export interface Dealer {
  id: string;
  name: string;
  distance: number;
  rating: number;
  address: string;
  phone: string;
  specialOffer?: string;
  imageUrl?: string;
  inventory?: Vehicle[];
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  price: number;
  msrp: number;
  imageUrl: string;
  mpg?: string;
  fuelEconomy: {
    city: number;
    highway: number;
  };
  category: string;
  features: string[];
  inStock: boolean;
}

export interface FinancingOption {
  id: string;
  type: 'lease' | 'finance' | 'cash';
  monthlyPayment?: number;
  downPayment: number;
  term?: number;
  apr?: number;
  milesPerYear?: number;
  totalCost: number;
}

export interface AffordabilityTier {
  name: string;
  monthlyPayment: number;
  downPayment: number;
  totalVehiclePrice: number;
  confidence: number;
  description: string;
  color: string;
}

export interface BankingData {
  accountId: string;
  balance: number;
  averageMonthlyIncome: number;
  averageMonthlyExpenses: number;
  savingsRate: number;
  debtToIncomeRatio: number;
}

export interface TradeInEstimate {
  vehicleInfo: {
    year: number;
    make: string;
    model: string;
    trim?: string;
    mileage: number;
    condition: 'excellent' | 'good' | 'fair' | 'poor';
  };
  estimatedValue: {
    low: number;
    average: number;
    high: number;
  };
  factors: {
    name: string;
    impact: number;
    description: string;
  }[];
}

export interface ServiceReminder {
  id: string;
  vehicleId: string;
  type: string;
  dueDate: Date;
  dueMileage: number;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  currentMileage?: number;
  status?: 'upcoming' | 'due' | 'overdue';
  estimatedCost?: number;
  description?: string;
}
