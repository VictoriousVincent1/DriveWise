import { Router, Request, Response } from 'express';
import { mockVehicles } from '../data/vehicles';
import { Vehicle } from '../types';

const router = Router();

/**
 * GET /api/vehicles
 * Get all vehicles with optional filtering
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const { make, category, minPrice, maxPrice, year } = req.query;
    
    let filtered = mockVehicles;

    // Filter by make
    if (make) {
      filtered = filtered.filter(v => 
        v.make.toLowerCase() === (make as string).toLowerCase()
      );
    }

    // Filter by category
    if (category) {
      filtered = filtered.filter(v => 
        v.category === category
      );
    }

    // Filter by price range
    if (minPrice) {
      filtered = filtered.filter(v => v.msrp >= Number(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(v => v.msrp <= Number(maxPrice));
    }

    // Filter by year
    if (year) {
      filtered = filtered.filter(v => v.year === Number(year));
    }

    res.json({
      success: true,
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch vehicles'
    });
  }
});

/**
 * GET /api/vehicles/:id
 * Get a specific vehicle by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehicle = mockVehicles.find(v => v.id === id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        error: 'Vehicle not found'
      });
    }

    res.json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch vehicle'
    });
  }
});

/**
 * GET /api/vehicles/compare
 * Compare multiple vehicles
 */
router.post('/compare', (req: Request, res: Response) => {
  try {
    const { vehicleIds } = req.body;

    if (!vehicleIds || !Array.isArray(vehicleIds)) {
      return res.status(400).json({
        success: false,
        error: 'vehicleIds array is required'
      });
    }

    const vehicles = mockVehicles.filter(v => vehicleIds.includes(v.id));

    res.json({
      success: true,
      count: vehicles.length,
      data: vehicles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to compare vehicles'
    });
  }
});

/**
 * GET /api/vehicles/search
 * Search vehicles by keyword
 */
router.get('/search/:keyword', (req: Request, res: Response) => {
  try {
    const { keyword } = req.params;
    const searchTerm = keyword.toLowerCase();

    const results = mockVehicles.filter(v =>
      v.make.toLowerCase().includes(searchTerm) ||
      v.model.toLowerCase().includes(searchTerm) ||
      v.trim.toLowerCase().includes(searchTerm) ||
      v.category.toLowerCase().includes(searchTerm)
    );

    res.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to search vehicles'
    });
  }
});

export default router;
