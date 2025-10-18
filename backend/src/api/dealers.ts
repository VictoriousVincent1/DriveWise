import { Router, Request, Response } from 'express';
import { mockDealers } from '../data/dealers';

const router = Router();

/**
 * GET /api/dealers
 * Get all dealers with optional filtering
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const { city, state, certified, zipCode } = req.query;
    
    let filtered = mockDealers;

    if (city) {
      filtered = filtered.filter(d => 
        d.city.toLowerCase() === (city as string).toLowerCase()
      );
    }

    if (state) {
      filtered = filtered.filter(d => 
        d.state.toLowerCase() === (state as string).toLowerCase()
      );
    }

    if (certified === 'true') {
      filtered = filtered.filter(d => d.certified);
    }

    res.json({
      success: true,
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dealers'
    });
  }
});

/**
 * GET /api/dealers/:id
 * Get a specific dealer by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dealer = mockDealers.find(d => d.id === id);

    if (!dealer) {
      return res.status(404).json({
        success: false,
        error: 'Dealer not found'
      });
    }

    res.json({
      success: true,
      data: dealer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dealer'
    });
  }
});

/**
 * GET /api/dealers/nearby/:zipCode
 * Find dealers near a zip code (mock implementation)
 */
router.get('/nearby/:zipCode', (req: Request, res: Response) => {
  try {
    const { zipCode } = req.params;
    const { radius = 25 } = req.query;

    // Mock: return all dealers for now
    // In production, implement geolocation logic
    const nearbyDealers = mockDealers.slice(0, 5);

    res.json({
      success: true,
      count: nearbyDealers.length,
      zipCode,
      radius: Number(radius),
      data: nearbyDealers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to find nearby dealers'
    });
  }
});

export default router;
