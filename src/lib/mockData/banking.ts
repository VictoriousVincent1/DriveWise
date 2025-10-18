import { BankingData, Transaction, AffordabilityTier } from '@/types';
import { getAffordabilityTier, calculateAffordableAmount } from '@/lib/utils';

export const mockBankingData: BankingData = {
  accountId: 'acc_123456789',
  balance: 8750.50,
  averageMonthlyIncome: 5200,
  averageMonthlyExpenses: 3450,
  recentTransactions: [
    {
      id: 'tx_001',
      date: new Date('2024-10-15'),
      description: 'Salary Deposit',
      amount: 2600,
      type: 'credit',
      category: 'income',
    },
    {
      id: 'tx_002',
      date: new Date('2024-10-14'),
      description: 'Grocery Store',
      amount: -125.43,
      type: 'debit',
      category: 'groceries',
    },
    {
      id: 'tx_003',
      date: new Date('2024-10-12'),
      description: 'Gas Station',
      amount: -52.00,
      type: 'debit',
      category: 'transportation',
    },
    {
      id: 'tx_004',
      date: new Date('2024-10-10'),
      description: 'Electric Bill',
      amount: -145.00,
      type: 'debit',
      category: 'utilities',
    },
    {
      id: 'tx_005',
      date: new Date('2024-10-08'),
      description: 'Restaurant',
      amount: -68.25,
      type: 'debit',
      category: 'dining',
    },
    {
      id: 'tx_006',
      date: new Date('2024-10-05'),
      description: 'Rent Payment',
      amount: -1400,
      type: 'debit',
      category: 'housing',
    },
    {
      id: 'tx_007',
      date: new Date('2024-10-01'),
      description: 'Salary Deposit',
      amount: 2600,
      type: 'credit',
      category: 'income',
    },
  ],
};

export async function fetchBankingData(accountId: string): Promise<BankingData> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBankingData);
    }, 500);
  });
}

export async function calculateAffordability(
  accountId: string,
  creditScore: number
): Promise<{
  tiers: AffordabilityTier[];
  recommended: AffordabilityTier;
  bankingData: BankingData;
}> {
  const data = await fetchBankingData(accountId);
  
  const tier = getAffordabilityTier(
    data.averageMonthlyIncome,
    data.averageMonthlyExpenses
  );
  
  const disposableIncome = data.averageMonthlyIncome - data.averageMonthlyExpenses;
  
  const tiers: AffordabilityTier[] = [
    {
      tier: 'conservative',
      monthlyBudget: calculateAffordableAmount(data.averageMonthlyIncome, 'conservative'),
      downPayment: Math.round(data.balance * 0.3),
      maxLoanAmount: calculateAffordableAmount(data.averageMonthlyIncome, 'conservative') * 60,
      recommendedAction: disposableIncome < 1000 ? 'wait' : 'lease',
      reasoning: 'Conservative approach - maintain healthy financial cushion while building equity.',
    },
    {
      tier: 'moderate',
      monthlyBudget: calculateAffordableAmount(data.averageMonthlyIncome, 'moderate'),
      downPayment: Math.round(data.balance * 0.5),
      maxLoanAmount: calculateAffordableAmount(data.averageMonthlyIncome, 'moderate') * 60,
      recommendedAction: disposableIncome >= 1500 ? 'finance' : 'lease',
      reasoning: 'Balanced approach - comfortable payments with reasonable financial flexibility.',
    },
    {
      tier: 'aggressive',
      monthlyBudget: calculateAffordableAmount(data.averageMonthlyIncome, 'aggressive'),
      downPayment: Math.round(data.balance * 0.7),
      maxLoanAmount: calculateAffordableAmount(data.averageMonthlyIncome, 'aggressive') * 60,
      recommendedAction: disposableIncome >= 2000 ? 'finance' : 'lease',
      reasoning: 'Maximized budget - suitable if you have stable income and emergency savings.',
    },
  ];
  
  const recommended = tiers.find(t => t.tier === tier) || tiers[1];
  
  return { tiers, recommended, bankingData: data };
}
