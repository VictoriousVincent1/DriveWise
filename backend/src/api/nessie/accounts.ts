import { nessieClient } from "./client";

export async function createAccount(customerId: string, payload: object) {
  const { data } = await nessieClient.post(`/customers/${customerId}/accounts`, payload);
  return data;
}

export async function getAccounts(customerId: string) {
  const { data } = await nessieClient.get(`/customers/${customerId}/accounts`);
  return data;
}
