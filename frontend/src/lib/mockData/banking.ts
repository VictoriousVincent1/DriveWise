import type { AffordabilityTier, BankingData } from '../../types';

// Mocked banking + affordability calculation for the frontend demo
export async function calculateAffordability(accountId: string, creditScore: number): Promise<{
  tiers: AffordabilityTier[];
  recommended: AffordabilityTier;
  bankingData: BankingData;
}> {
  // Pretend to fetch over network
  await new Promise((r) => setTimeout(r, 150));

  // Simple mocked banking data
  const bankingData: BankingData = {
    averageMonthlyIncome: 6500,
    averageMonthlyExpenses: 3200,
  };

  const disposable = Math.max(0, bankingData.averageMonthlyIncome - bankingData.averageMonthlyExpenses);

  const base = {
    conservative: 0.1,
    balanced: 0.15,
    stretch: 0.2,
  } as const;

  // Adjust slightly by credit score (higher score -> slightly higher comfortable budget)
  const scoreAdj = Math.min(0.03, Math.max(-0.02, (creditScore - 700) / 10000));

  const makeTier = (name: keyof typeof base): AffordabilityTier => {
    const monthlyBudget = Math.round(bankingData.averageMonthlyIncome * (base[name] + scoreAdj));
    const downPayment = Math.round(monthlyBudget * 6); // suggest ~6 months of the budget
    const maxLoanAmount = Math.round(monthlyBudget * 60); // assume 60mo baseline
    const recommendedAction = name === 'conservative' ? 'save' : name === 'balanced' ? 'buy' : 'consider';
    const reasoning =
      name === 'conservative'
        ? 'Keeps plenty of buffer for savings and unexpected expenses.'
        : name === 'balanced'
        ? 'Balances comfort and speed to ownership with manageable payments.'
        : 'Higher payment for a shorter path; ensure emergency fund coverage.';
    return { tier: name, monthlyBudget, downPayment, maxLoanAmount, recommendedAction, reasoning };
  };

  const tiers = [makeTier('conservative'), makeTier('balanced'), makeTier('stretch')];
  const recommended = tiers[1];

  return { tiers, recommended, bankingData };
}
