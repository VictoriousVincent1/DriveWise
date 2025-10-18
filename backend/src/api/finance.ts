import { Router, Request, Response } from 'express';
import {
  calculateMonthlyPayment,
  calculateTotalCost,
  calculateAffordability,
  calculateLeasePayment
} from '../utils/calculations';

const router = Router();

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
 */
router.post('/affordability', (req: Request, res: Response) => {
  try {
    const { monthlyIncome, monthlyExpenses = 0, downPayment = 0 } = req.body;

    if (!monthlyIncome) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: monthlyIncome'
      });
    }

    const affordability = calculateAffordability(monthlyIncome, monthlyExpenses, downPayment);

    res.json({
      success: true,
      data: {
        maxMonthlyPayment: affordability.maxMonthlyPayment,
        maxVehiclePrice: affordability.maxVehiclePrice,
        recommendedBudget: affordability.recommendedBudget,
        downPayment,
        tier: affordability.tier
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to calculate affordability'
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
 */
router.post('/compare-options', (req: Request, res: Response) => {
  try {
    const { vehiclePrice, downPayment, apr, termMonths, residualPercent } = req.body;

    // Calculate financing
    const loanAmount = vehiclePrice - downPayment;
    const financePayment = calculateMonthlyPayment(loanAmount, apr, termMonths);
  const financeTotalCost = calculateTotalCost(loanAmount, apr, termMonths);

    // Calculate leasing
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
