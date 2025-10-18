// Mock banking data using Capital One Nessie API structure
import { AffordabilityTier, BankingData } from '@/types';

export async function calculateAffordability(
  accountId: string,
  creditScore: number
): Promise<{
  tiers: AffordabilityTier[];
  recommended: AffordabilityTier;
  bankingData: BankingData;
}> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock banking data (in production, this would come from Nessie API)
  const bankingData: BankingData = {
    accountId,
    balance: 12500,
    averageMonthlyIncome: 5200,
    averageMonthlyExpenses: 3800,
    savingsRate: 0.27,
    debtToIncomeRatio: 0.32,
  };

  // Calculate available monthly budget (using 28% rule for auto loans)
  const monthlyIncome = bankingData.averageMonthlyIncome;
  const availableForAuto = monthlyIncome * 0.15; // Conservative 15% of income

  // Generate affordability tiers
  const tiers: AffordabilityTier[] = [
    {
      name: 'Conservative',
      monthlyPayment: Math.round(availableForAuto * 0.7),
      downPayment: 3000,
      totalVehiclePrice: Math.round((availableForAuto * 0.7 * 60) + 3000),
      confidence: 95,
      description: 'Most comfortable budget with room for savings',
      color: 'green',
    },
    {
      name: 'Moderate',
      monthlyPayment: Math.round(availableForAuto),
      downPayment: 2500,
      totalVehiclePrice: Math.round((availableForAuto * 60) + 2500),
      confidence: 85,
      description: 'Balanced approach to car payments',
      color: 'blue',
    },
    {
      name: 'Aggressive',
      monthlyPayment: Math.round(availableForAuto * 1.3),
      downPayment: 2000,
      totalVehiclePrice: Math.round((availableForAuto * 1.3 * 60) + 2000),
      confidence: 65,
      description: 'Stretch budget - may impact other goals',
      color: 'orange',
    },
  ];

  // Recommend moderate tier
  const recommended = tiers[1];

  return {
    tiers,
    recommended,
    bankingData,
  };
}

export async function getBankingData(accountId: string): Promise<BankingData> {
  // Mock implementation
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    accountId,
    balance: 12500,
    averageMonthlyIncome: 5200,
    averageMonthlyExpenses: 3800,
    savingsRate: 0.27,
    debtToIncomeRatio: 0.32,
  };
}
