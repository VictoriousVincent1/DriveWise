"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { getFinancialProfile } from "@/lib/api";

interface FinancialProfile {
  creditScore: number;
  monthlyIncome: number;
  totalBalance: number;
  debtToIncomeRatio: number;
  approvalLikelihood: string;
  maxLoanAmount: number;
}

export default function UserOverviewPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [financialProfile, setFinancialProfile] = useState<FinancialProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        window.location.href = "/auth/login";
        return;
      }
      setUser(u);
      
      // Get user profile from Firestore
      const snap = await getDoc(doc(db, "users", u.uid));
      const profileData = snap.exists() ? snap.data() : {};
      setProfile(profileData);
      
      // Get financial profile from Nessie if they have a nessieCustomerId
      if (profileData.nessieCustomerId) {
        try {
          const financial = await getFinancialProfile(profileData.nessieCustomerId);
          setFinancialProfile(financial);
        } catch (error) {
          console.error("Failed to load financial profile:", error);
        }
      }

      // Load user's appointments
      try {
        const q = query(collection(db, "appointments"), where("userId", "==", u.uid));
        const snap2 = await getDocs(q);
        const list = snap2.docs.map((d) => ({ id: d.id, ...d.data() }));
        list.sort(
          (a: any, b: any) =>
            new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime()
        );
        setAppointments(list);
      } catch (e) {
        console.error("Failed to load appointments", e);
      }
      
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded shadow">
        <div className="animate-pulse">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 p-8 space-y-6">
      {/* User Info Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-2">
          Welcome, {profile?.displayName || user?.email}!
        </h1>
        <p className="text-gray-600 text-sm">Email: {user?.email}</p>
      </div>

      {/* Financial Profile Card */}
      {financialProfile && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Your Financial Profile</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-600">Credit Score</p>
              <p className="text-3xl font-bold text-blue-600">
                {financialProfile.creditScore}
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm text-gray-600">Monthly Income</p>
              <p className="text-3xl font-bold text-green-600">
                ${financialProfile.monthlyIncome.toLocaleString()}
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <p className="text-sm text-gray-600">Total Balance</p>
              <p className="text-3xl font-bold text-purple-600">
                ${financialProfile.totalBalance.toLocaleString()}
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <p className="text-sm text-gray-600">Debt-to-Income</p>
              <p className="text-3xl font-bold text-orange-600">
                {(financialProfile.debtToIncomeRatio * 100).toFixed(1)}%
              </p>
            </div>

            <div className="border-l-4 border-teal-500 pl-4">
              <p className="text-sm text-gray-600">Approval Status</p>
              <p className="text-3xl font-bold text-teal-600">
                {financialProfile.approvalLikelihood}
              </p>
            </div>

            <div className="border-l-4 border-indigo-500 pl-4">
              <p className="text-sm text-gray-600">Max Loan Amount</p>
              <p className="text-3xl font-bold text-indigo-600">
                ${financialProfile.maxLoanAmount.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="font-semibold text-blue-900">
              You're pre-approved for up to ${financialProfile.maxLoanAmount.toLocaleString()}!
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Start browsing vehicles that fit your budget.
            </p>
          </div>
        </div>
      )}

      {/* Car Preferences Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Your Car Preferences</h2>
        <p className="mb-2">
          <span className="font-medium">What you're looking for:</span>{" "}
          {profile?.carNeeds || "—"}
        </p>
        <div>
          <span className="font-medium">Top Priorities:</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {(profile?.priorities || []).map((p: string) => (
              <span
                key={p}
                className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-sm"
              >
                {p}
              </span>
            ))}
            {(!profile?.priorities || profile?.priorities.length === 0) && (
              <span className="text-gray-500 text-sm">No priorities set</span>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/finance-fit"
            className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-bold">Check Financing</h3>
            <p className="text-sm text-gray-600">See what you can afford</p>
          </a>

          <a
            href="/dealer-connect"
            className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <div className="text-3xl mb-2">🤝</div>
            <h3 className="font-bold">Find Dealers</h3>
            <p className="text-sm text-gray-600">Connect with local dealers</p>
          </a>

          <a
            href="/trade-in"
            className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <div className="text-3xl mb-2">🔄</div>
            <h3 className="font-bold">Trade-In Value</h3>
            <p className="text-sm text-gray-600">Get your car's worth</p>
          </a>
        </div>
      </div>

      {/* Appointments */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Appointments</h2>
          <a href="/appointments" className="text-blue-600 underline">Book appointment</a>
        </div>
        {appointments.length === 0 ? (
          <div className="text-gray-600">No appointments yet.</div>
        ) : (
          <ul className="space-y-2">
            {appointments.map((a) => (
              <li key={a.id} className="p-3 border rounded bg-gray-50">
                <div className="font-medium">{a.date} at {a.time}</div>
                <div className="text-xs text-gray-600">Status: {a.status || "requested"}</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Recent Purchases</h2>
        <p className="text-gray-500 text-sm">(None yet)</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Saved Trade-Ins / Vehicles</h2>
        <p className="text-gray-500 text-sm">(Coming soon)</p>
      </div>
    </div>
  );
}