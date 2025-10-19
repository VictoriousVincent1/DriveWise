import type { AffordabilityTier, BankingData } from '../../types';

export const mockBankingData = [
  {
    id: 1,
    bankName: "Toyota Financial Services",
    accountType: "Auto Loan",
    balance: 12000,
    interestRate: 3.5,
    monthlyPayment: 350,
    dueDate: "2024-07-15",
  },
  {
    id: 2,
    bankName: "Chase",
    accountType: "Checking",
    balance: 5400,
    interestRate: 0.1,
    monthlyPayment: 0,
    dueDate: "",
  },
  {
    id: 3,
    bankName: "Bank of America",
    accountType: "Savings",
    balance: 8000,
    interestRate: 0.2,
    monthlyPayment: 0,
    dueDate: "",
  },
];

// Affordability calculation logic
export async function calculateAffordability(
  accountId: string,
  creditScore: number,
  monthlyIncome: number = 6500
): Promise<{
  tiers: AffordabilityTier[];
  recommended: AffordabilityTier;
  bankingData: BankingData;
}> {
  // Mock banking data (in real app, fetch from Nessie API using accountId)
  const averageMonthlyIncome = monthlyIncome;
  const averageMonthlyExpenses = 3200;

  const conservative: AffordabilityTier = {
    tier: 'conservative',
    monthlyBudget: Math.round(averageMonthlyIncome * 0.10),
    downPayment: Math.round(averageMonthlyIncome * 2),
    maxLoanAmount: Math.round(averageMonthlyIncome * 0.10 * 60),
    recommendedAction: 'Focus on reliability and lower monthly costs',
    reasoning: 'Keeps payments well within comfort zone, leaving room for savings and unexpected expenses.',
  };

  const balanced: AffordabilityTier = {
    tier: 'balanced',
    monthlyBudget: Math.round(averageMonthlyIncome * 0.15),
    downPayment: Math.round(averageMonthlyIncome * 3),
    maxLoanAmount: Math.round(averageMonthlyIncome * 0.15 * 60),
    recommendedAction: 'Balance between features and affordability',
    reasoning: 'A healthy middle ground that allows for a quality vehicle while maintaining financial flexibility.',
  };

  const stretch: AffordabilityTier = {
    tier: 'stretch',
    monthlyBudget: Math.round(averageMonthlyIncome * 0.20),
    downPayment: Math.round(averageMonthlyIncome * 4),
    maxLoanAmount: Math.round(averageMonthlyIncome * 0.20 * 60),
    recommendedAction: 'Higher-end model with premium features',
    reasoning: 'Pushes the upper limit of affordability. Ensure you have emergency savings and stable income.',
  };

  const tiers = [conservative, balanced, stretch];
  
  // Recommend based on credit score
  let recommended = balanced;
  if (creditScore >= 750) {
    recommended = stretch;
  } else if (creditScore < 650) {
    recommended = conservative;
  }

  return {
    tiers,
    recommended,
    bankingData: {
      averageMonthlyIncome,
      averageMonthlyExpenses,
    },
  };
}
