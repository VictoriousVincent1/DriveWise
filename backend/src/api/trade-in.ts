import { Router, Request, Response } from 'express';

const router = Router();

/**
 * POST /api/trade-in/estimate
 * Calculate trade-in value estimate
 */
router.post('/estimate', (req: Request, res: Response) => {
  try {
    const { make, model, year, condition, vin } = req.body;

    if (!make || !model || !year || !condition) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: make, model, year, condition'
      });
    }

    // Mock depreciation calculation
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    const baseValue = 35000; // Mock base value
    
    // Depreciation: 20% first year, 15% per year after
    let depreciationFactor = age === 0 ? 1.0 : 0.80;
    for (let i = 1; i < age; i++) {
      depreciationFactor *= 0.85;
    }

    // Condition adjustment
    const conditionFactors: Record<string, number> = {
      'excellent': 1.1,
      'good': 1.0,
      'fair': 0.85,
      'poor': 0.7
    };
    const conditionFactor = conditionFactors[condition] || 1.0;

    const estimatedValue = Math.round(
      baseValue * depreciationFactor * conditionFactor
    );

    const lowRange = Math.round(estimatedValue * 0.9);
    const highRange = Math.round(estimatedValue * 1.1);

    res.json({
      success: true,
      data: {
        vehicle: { make, model, year, condition, vin },
        estimatedValue,
        range: { low: lowRange, high: highRange },
        factors: {
          age,
          depreciation: `${((1 - depreciationFactor) * 100).toFixed(1)}%`,
          condition: condition.charAt(0).toUpperCase() + condition.slice(1)
        },
        recommendations: [
          'Clean and detail your vehicle',
          'Gather maintenance records',
          'Fix minor cosmetic issues',
          'Get multiple dealer quotes'
        ]
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to calculate trade-in estimate'
    });
  }
});

/**
 * POST /api/trade-in/compare
 * Compare trade-in value vs selling privately
 */
router.post('/compare', (req: Request, res: Response) => {
  try {
    const { tradeInValue } = req.body;

    if (!tradeInValue) {
      return res.status(400).json({
        success: false,
        error: 'tradeInValue is required'
      });
    }

    const privatePartyValue = Math.round(tradeInValue * 1.15);
    const difference = privatePartyValue - tradeInValue;

    res.json({
      success: true,
      data: {
        tradeIn: {
          value: tradeInValue,
          pros: ['Convenient', 'Immediate', 'Tax benefit', 'No hassle'],
          cons: ['Lower value']
        },
        privateSale: {
          value: privatePartyValue,
          pros: ['Higher value', 'More control'],
          cons: ['Time consuming', 'Meeting buyers', 'Paperwork', 'Safety concerns']
        },
        difference,
        recommendation: difference > 2000 ? 'Consider private sale' : 'Trade-in recommended for convenience'
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
