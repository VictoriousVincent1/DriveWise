import { nessieClient } from "./client";

export async function getTransactions(accountId: string) {
  const { data } = await nessieClient.get(`/accounts/${accountId}/transactions`);
  return data;
}
