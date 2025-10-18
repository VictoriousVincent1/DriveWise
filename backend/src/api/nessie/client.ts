import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.NESSIE_API_KEY;
const baseURL = process.env.NESSIE_BASE_URL || "http://api.nessieisreal.com";

if (!apiKey) {
  console.warn("Missing NESSIE_API_KEY in environment variables");
}

export const nessieClient = axios.create({
  baseURL,
  params: { key: apiKey },
  headers: { "Content-Type": "application/json" },
});

