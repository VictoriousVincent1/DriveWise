const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

// Nessie API - Customers
export async function getCustomers() {
  const response = await fetch(`${API_URL}/api/nessie/customers`);
  if (!response.ok) throw new Error('Failed to fetch customers');
  return response.json();
}

export async function createCustomer(customerData: {
  first_name: string;
  last_name: string;
  address: {
    street_number: string;
    street_name: string;
    city: string;
    state: string;
    zip: string;
  };
}) {
  const response = await fetch(`${API_URL}/api/nessie/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customerData),
  });
  if (!response.ok) throw new Error('Failed to create customer');
  return response.json();
}

// Nessie API - Accounts
export async function getCustomerAccounts(customerId: string) {
  const response = await fetch(`${API_URL}/api/nessie/customers/${customerId}/accounts`);
  if (!response.ok) throw new Error('Failed to fetch accounts');
  return response.json();
}

export async function createAccount(customerId: string, accountData: {
  type: 'Savings' | 'Checking' | 'Credit Card';
  nickname: string;
  rewards: number;
  balance: number;
}) {
  const response = await fetch(`${API_URL}/api/nessie/customers/${customerId}/accounts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(accountData),
  });
  if (!response.ok) throw new Error('Failed to create account');
  return response.json();
}

// Nessie API - Transactions
export async function getAccountTransactions(accountId: string) {
  const response = await fetch(`${API_URL}/api/nessie/accounts/${accountId}/transactions`);
  if (!response.ok) throw new Error('Failed to fetch transactions');
  return response.json();
}