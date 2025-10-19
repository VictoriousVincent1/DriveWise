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
export function calculateAffordability(income: number, expenses: number, loanPayment: number) {
  const disposableIncome = income - expenses - loanPayment;
  return disposableIncome > 0 ? disposableIncome : 0;
}
