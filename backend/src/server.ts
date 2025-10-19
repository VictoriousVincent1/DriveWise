import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import vehicleRoutes from './api/vehicles';
import financeRoutes from './api/finance';
import dealerRoutes from './api/dealers';
import tradeInRoutes from './api/trade-in';
import { getCustomers, createCustomer } from './api/nessie';
import { getAccounts, createAccount } from './api/nessie';
import { getTransactions } from './api/nessie';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'DriveWise Backend API'
  });
});

// API Routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/dealers', dealerRoutes);
app.use('/api/trade-in', tradeInRoutes);

// Nessie API Routes
app.get('/api/nessie/customers', async (req: Request, res: Response) => {
  try {
    const customers = await getCustomers();
    res.json(customers);
  } catch (error: any) {
    console.error('Nessie API Error:', error);
    res.status(500).json({ error: 'Failed to fetch customers', message: error.message });
  }
});

app.post('/api/nessie/customers', async (req: Request, res: Response) => {
  try {
    const customer = await createCustomer(req.body);
    res.json(customer);
  } catch (error: any) {
    console.error('Nessie API Error:', error);
    res.status(500).json({ error: 'Failed to create customer', message: error.message });
  }
});

app.get('/api/nessie/customers/:customerId/accounts', async (req: Request, res: Response) => {
  try {
    const accounts = await getAccounts(req.params.customerId);
    res.json(accounts);
  } catch (error: any) {
    console.error('Nessie API Error:', error);
    res.status(500).json({ error: 'Failed to fetch accounts', message: error.message });
  }
});

app.post('/api/nessie/customers/:customerId/accounts', async (req: Request, res: Response) => {
  try {
    const account = await createAccount(req.params.customerId, req.body);
    res.json(account);
  } catch (error: any) {
    console.error('Nessie API Error:', error);
    res.status(500).json({ error: 'Failed to create account', message: error.message });
  }
});

app.get('/api/nessie/accounts/:accountId/transactions', async (req: Request, res: Response) => {
  try {
    const transactions = await getTransactions(req.params.accountId);
    res.json(transactions);
  } catch (error: any) {
    console.error('Nessie API Error:', error);
    res.status(500).json({ error: 'Failed to fetch transactions', message: error.message });
  }
});

// Financial Profile endpoint
app.get('/api/nessie/customers/:customerId/financial-profile', async (req: Request, res: Response) => {
  try {
    const { generateFinancialProfile } = await import('./api/nessie');
    
    const customers = await getCustomers();
    const customer = customers.find((c: any) => c._id === req.params.customerId);
    
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    const accounts = await getAccounts(req.params.customerId);
    const profile = generateFinancialProfile(customer, accounts);
    
    res.json(profile);
  } catch (error: any) {
    console.error('Financial Profile Error:', error);
    res.status(500).json({ error: 'Failed to generate financial profile', message: error.message });
  }
});

// Get all users with their financial profiles (ADMIN)
app.get('/api/admin/customers', async (req: Request, res: Response) => {
  try {
    const customers = await getCustomers();
    
    // Get financial profile for each customer
    const customersWithProfiles = await Promise.all(
      customers.map(async (customer: any) => {
        try {
          const accounts = await getAccounts(customer._id);
          const { generateFinancialProfile } = await import('./api/nessie');
          const profile = generateFinancialProfile(customer, accounts);
          
          return {
            ...customer,
            financialProfile: profile,
            accountCount: accounts.length
          };
        } catch (error) {
          return {
            ...customer,
            financialProfile: null,
            accountCount: 0
          };
        }
      })
    );
    
    res.json(customersWithProfiles);
  } catch (error: any) {
    console.error('Admin Customers Error:', error);
    res.status(500).json({ error: 'Failed to fetch customers', message: error.message });
  }
});

// Vehicle Recommendations based on financial profile
app.get('/api/recommendations/:nessieCustomerId', async (req: Request, res: Response) => {
  try {
    const { nessieCustomerId } = req.params;
    const { generateFinancialProfile } = await import('./api/nessie');
    const { mockVehicles } = await import('./data/vehicles');
    
    // Get customer and financial profile
    const customers = await getCustomers();
    const customer = customers.find((c: any) => c._id === nessieCustomerId);
    
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    const accounts = await getAccounts(nessieCustomerId);
    const financialProfile = generateFinancialProfile(customer, accounts);
    
    const { maxLoanAmount, creditScore, monthlyIncome, totalBalance } = financialProfile;
    const savingsBalance = totalBalance;
    
    // Filter vehicles within budget
    const affordableVehicles = mockVehicles.filter(v => v.msrp <= maxLoanAmount);
    
    // Score each vehicle
    const scoredVehicles = affordableVehicles.map(vehicle => {
      const percentOfBudget = (vehicle.msrp / maxLoanAmount) * 100;
      
      // Calculate score (0-100)
      let score = 0;
      let reasons: string[] = [];
      
      // Optimal price range: 60-80% of max budget
      if (percentOfBudget >= 60 && percentOfBudget <= 80) {
        score += 40;
        reasons.push('Optimal budget fit');
      } else if (percentOfBudget >= 50 && percentOfBudget < 60) {
        score += 30;
        reasons.push('Great value');
      } else if (percentOfBudget > 80) {
        score += 15;
        reasons.push('Maximum budget');
      } else {
        score += 20;
        reasons.push('Budget-friendly');
      }
      
      // Fuel efficiency bonus
      const avgMpg = (vehicle.fuelEconomy.city + vehicle.fuelEconomy.highway) / 2;
      if (avgMpg > 35) {
        score += 20;
        reasons.push('Excellent fuel economy');
      } else if (avgMpg > 25) {
        score += 10;
        reasons.push('Good fuel economy');
      }
      
      // Category preferences
      if (vehicle.category === 'sedan' || vehicle.category === 'hybrid') {
        score += 15;
        reasons.push('Reliable daily driver');
      } else if (vehicle.category === 'suv') {
        score += 10;
        reasons.push('Versatile and spacious');
      }
      
      // Down payment feasibility
      const recommendedDownPayment = vehicle.msrp * 0.20;
      if (savingsBalance >= recommendedDownPayment) {
        score += 15;
        reasons.push('Down payment covered');
      } else if (savingsBalance >= recommendedDownPayment * 0.5) {
        score += 5;
        reasons.push('Partial down payment available');
      }
      
      // Monthly payment estimate (5% APR, 60 months)
      const loanAmount = vehicle.msrp - Math.min(savingsBalance, vehicle.msrp * 0.20);
      const monthlyPayment = (loanAmount * (0.05 / 12) * Math.pow(1 + 0.05/12, 60)) / (Math.pow(1 + 0.05/12, 60) - 1);
      const paymentToIncomeRatio = monthlyPayment / monthlyIncome;
      
      if (paymentToIncomeRatio <= 0.15) {
        score += 10;
        reasons.push('Low payment-to-income ratio');
      }
      
      return {
        vehicle,
        score,
        reasons,
        percentOfBudget: Math.round(percentOfBudget),
        monthlyPayment: Math.round(monthlyPayment),
        downPayment: Math.round(Math.min(savingsBalance, vehicle.msrp * 0.20)),
        paymentToIncomeRatio: (paymentToIncomeRatio * 100).toFixed(1)
      };
    });
    
    // Sort by score and get top 5
    const recommendations = scoredVehicles
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    
    res.json({
      financialProfile: {
        maxLoanAmount,
        creditScore,
        monthlyIncome,
        savingsBalance
      },
      recommendations
    });
  } catch (error: any) {
    console.error('Recommendations Error:', error);
    res.status(500).json({ error: 'Failed to generate recommendations', message: error.message });
  }
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(` DriveWise Backend API running on port ${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(` Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

export default app;