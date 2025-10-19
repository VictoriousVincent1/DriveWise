export * from "./customers";
export * from "./accounts";
export * from "./transactions";

// Generate financial profile from Nessie data
export function generateFinancialProfile(customer: any, accounts: any[]) {
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  
  // Calculate from account balance (for Nessie-only users)
  const creditScore = Math.min(850, 600 + Math.floor(totalBalance / 50));
  const monthlyIncome = Math.floor(totalBalance * 0.3) + 3000;
  
  // UPDATED: Use same formula as signup
  const debtToIncome = totalBalance > 0 ? (totalBalance * 0.1) / monthlyIncome : 0;
  const maxLoanAmount = Math.floor(monthlyIncome * 0.25 * 60); // 25% of income for 60 months
  
  // UPDATED: Use same approval logic as signup
  let approvalLikelihood = 'Low';
  if (creditScore >= 700 && debtToIncome <= 0.35) {
    approvalLikelihood = 'High';
  } else if (creditScore >= 650 && debtToIncome <= 0.43) {
    approvalLikelihood = 'Medium';
  }
  
  return {
    customerId: customer._id,
    name: `${customer.first_name} ${customer.last_name}`,
    creditScore,
    monthlyIncome,
    totalBalance,
    debtToIncomeRatio: parseFloat(debtToIncome.toFixed(2)),
    approvalLikelihood,
    maxLoanAmount
  };
}