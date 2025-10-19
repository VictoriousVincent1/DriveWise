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
  console.log(`🚗 DriveWise Backend API running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

export default app;