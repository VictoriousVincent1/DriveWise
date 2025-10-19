"use client";
import { useState } from "react";
import Link from "next/link";

export default function DealerDashboard() {
  const [tab, setTab] = useState("appointments");
  return (
    <div className="max-w-5xl mx-auto mt-12 p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Dealership Dashboard</h1>
      <div className="flex gap-4 mb-8">
        <button className={`px-4 py-2 rounded ${tab === "appointments" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`} onClick={() => setTab("appointments")}>Appointments</button>
        <button className={`px-4 py-2 rounded ${tab === "users" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`} onClick={() => setTab("users")}>Potential Users</button>
        <button className={`px-4 py-2 rounded ${tab === "pdfs" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`} onClick={() => setTab("pdfs")}>Client PDFs</button>
        <button className={`px-4 py-2 rounded ${tab === "inventory" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`} onClick={() => setTab("inventory")}>Inventory</button>
      </div>
      {tab === "appointments" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
          {/* TODO: Integrate appointment list from Firestore */}
          <p>List of future appointments with user info and links to PDFs.</p>
        </div>
      )}
      {tab === "users" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Potential Users</h2>
          {/* TODO: Show users interacting with cars, interest stats */}
          <p>Users who have interacted with your cars, shown interest, or booked appointments.</p>
        </div>
      )}
      {tab === "pdfs" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Client PDFs</h2>
          {/* TODO: List and link to generated PDFs for client concerns/notes */}
          <p>View and download PDFs of client notes and concerns.</p>
        </div>
      )}
      {tab === "inventory" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Inventory Management</h2>
          <Link href="/dealer-employee/stock" className="text-blue-600 underline">Go to Inventory Manager</Link>
          {/* TODO: Show summary stats: cars per model, interest per car, etc. */}
          <p>Track number of cars per model, interest, and update inventory.</p>
        </div>
      )}
    </div>
  );
}