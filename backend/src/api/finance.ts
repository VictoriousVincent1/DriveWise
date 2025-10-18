import { Router, Request, Response } from 'express';
import {
  calculateMonthlyPayment,
  calculateTotalCost,
  calculateAffordability,
  calculateLeasePayment
} from '../utils/calculations';
import { getAccounts, getTransactions } from './nessie'; // adjust path if needed

const router = Router();

// TypeScript interfaces for Nessie data
interface Account {
  id: string;
  type: string;
  balance: number;
  nickname: string;
}

interface Transaction {
  id: string;
  type: string;
  merchant_name: string;
  amount: number; // positive = income, negative = expense
  date: string;
}

/**
 * POST /api/finance/calculate-payment
 * Calculate monthly payment for a vehicle
 */
router.post('/calculate-payment', (req: Request, res: Response) => {
  try {
    const { vehiclePrice, downPayment, apr, termMonths, tradeInValue = 0 } = req.body;

    if (!vehiclePrice || !downPayment || apr === undefined || !termMonths) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: vehiclePrice, downPayment, apr, termMonths'
      });
    }

    const loanAmount = vehiclePrice - downPayment - tradeInValue;
    const monthlyPayment = calculateMonthlyPayment(loanAmount, apr, termMonths);
    const totalCost = calculateTotalCost(loanAmount, apr, termMonths);

    res.json({
      success: true,
      data: {
        vehiclePrice,
        downPayment,
        tradeInValue,
        loanAmount,
        apr,
        termMonths,
        monthlyPayment,
        totalCost,
        totalInterest: totalCost - vehiclePrice
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to calculate payment'
    });
  }
});

/**
 * POST /api/finance/affordability
 * Calculate what the user can afford
 * If customerId is provided, fetch mock income/expenses from Nessie
 */
router.post('/affordability', async (req: Request, res: Response) => {
  try {
    const { customerId, monthlyIncome, monthlyExpenses = 0 } = req.body;
    let downPayment = req.body.downPayment !== undefined ? Number(req.body.downPayment) : 0;

    let effectiveIncome = monthlyIncome;
    let effectiveExpenses = monthlyExpenses;

    if (customerId) {
      const accounts: Account[] = await getAccounts(customerId);
      const transactionsArray: Transaction[][] = await Promise.all(
        accounts.map(acc => getTransactions(acc.id))
      );

      effectiveIncome = 0;
      effectiveExpenses = 0;

      transactionsArray.flat().forEach((tx: Transaction) => {
        if (tx.amount > 0) effectiveIncome += tx.amount;
        else effectiveExpenses += Math.abs(tx.amount);
      });

      // Optionally auto-suggest downPayment based on account balances
      if (downPayment === 0) {
        downPayment = accounts.reduce((sum, acc) => sum + acc.balance, 0) * 0.2;
      }
    }

    if (!effectiveIncome) {
      return res.status(400).json({
        success: false,
        error: 'Missing income information (monthlyIncome or customerId)'
      });
    }

    const affordability = calculateAffordability(effectiveIncome, effectiveExpenses, downPayment);

    res.json({
      success: true,
      data: {
        monthlyIncome: effectiveIncome,
        monthlyExpenses: effectiveExpenses,
        maxMonthlyPayment: affordability.maxMonthlyPayment,
        maxVehiclePrice: affordability.maxVehiclePrice,
        recommendedBudget: affordability.recommendedBudget,
        downPayment: downPayment,
        tier: affordability.tier
      }
    });
  } catch (error: any) {
    console.error('Affordability calculation failed:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to calculate affordability',
      details: error.message
    });
  }
});


/**
 * POST /api/finance/lease-estimate
 * Calculate lease payment estimate
 */
router.post('/lease-estimate', (req: Request, res: Response) => {
  try {
    const { vehiclePrice, residualPercent, apr, termMonths, downPayment = 0 } = req.body;

    if (!vehiclePrice || apr === undefined || !residualPercent || !termMonths) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: vehiclePrice, apr, residualPercent, termMonths'
      });
    }

    const monthlyPayment = calculateLeasePayment(vehiclePrice, downPayment, termMonths, apr, residualPercent);
    const totalLeaseCost = (monthlyPayment * termMonths) + downPayment;

    res.json({
      success: true,
      data: {
        vehiclePrice,
        residualPercent,
        termMonths,
        downPayment,
        monthlyPayment,
        totalLeaseCost,
        residualValue: vehiclePrice * (residualPercent / 100)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to calculate lease estimate'
    });
  }
});

/**
 * POST /api/finance/compare-options
 * Compare financing vs leasing
 * Optionally, you could extend this to factor Nessie balances
 */
router.post('/compare-options', (req: Request, res: Response) => {
  try {
    const { vehiclePrice, downPayment, apr, termMonths, residualPercent } = req.body;

    // Financing
    const loanAmount = vehiclePrice - downPayment;
    const financePayment = calculateMonthlyPayment(loanAmount, apr, termMonths);
    const financeTotalCost = calculateTotalCost(loanAmount, apr, termMonths);

    // Leasing
    const leasePayment = calculateLeasePayment(vehiclePrice, downPayment, termMonths, apr, residualPercent);
    const leaseTotalCost = (leasePayment * termMonths) + downPayment;

    res.json({
      success: true,
      data: {
        financing: {
          monthlyPayment: financePayment,
          totalCost: financeTotalCost,
          downPayment,
          ownership: true
        },
        leasing: {
          monthlyPayment: leasePayment,
          totalCost: leaseTotalCost,
          downPayment,
          ownership: false,
          residualValue: vehiclePrice * (residualPercent / 100)
        },
        monthlySavings: financePayment - leasePayment,
        recommendation: financePayment - leasePayment > 100 ? 'lease' : 'finance'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to compare options'
    });
  }
});

export default router;
