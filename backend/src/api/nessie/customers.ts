import { nessieClient } from "./client";

export async function createCustomer(customerData: object) {
  const { data } = await nessieClient.post("/customers", customerData);
  return data;
}

export async function getCustomers() {
  const { data } = await nessieClient.get("/customers");
  return data;
}
