export * from "./customers";
export * from "./accounts";
export * from "./transactions";

// Generate financial profile from Nessie data
export function generateFinancialProfile(customer: any, accounts: any[]) {
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  
  // Simple formulas to generate realistic-looking data
  const creditScore = Math.min(850, 600 + Math.floor(totalBalance / 50));
  const monthlyIncome = Math.floor(totalBalance * 0.3) + 3000;
  const debtToIncome = totalBalance > 0 ? (totalBalance * 0.1) / monthlyIncome : 0;
  
  return {
    customerId: customer._id,
    name: `${customer.first_name} ${customer.last_name}`,
    creditScore,
    monthlyIncome,
    totalBalance,
    debtToIncomeRatio: parseFloat(debtToIncome.toFixed(2)),
    approvalLikelihood: creditScore > 700 ? 'High' : creditScore > 650 ? 'Medium' : 'Low',
    maxLoanAmount: Math.floor(monthlyIncome * 36) // 3 years of income
  };
}

