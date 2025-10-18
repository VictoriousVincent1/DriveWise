"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function UserOverviewPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        window.location.href = "/auth/login";
        return;
      }
      setUser(u);
      const snap = await getDoc(doc(db, "users", u.uid));
      setProfile(snap.exists() ? snap.data() : {});
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
    <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded shadow space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome, {profile?.displayName || user?.email}</h1>
        <p className="text-gray-600 text-sm">Email: {user.email}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Your Car Preferences</h2>
        <p className="mb-2"><span className="font-medium">What you're looking for:</span> {profile?.carNeeds || '—'}</p>
        <div>
          <span className="font-medium">Top Priorities:</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {(profile?.priorities || []).map((p: string) => (
              <span key={p} className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-sm">{p}</span>
            ))}
            {(!profile?.priorities || profile?.priorities.length === 0) && <span className="text-gray-500 text-sm">No priorities set</span>}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Recent Purchases</h2>
        <p className="text-gray-500 text-sm">(None yet)</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Saved Trade-Ins / Vehicles</h2>
        <p className="text-gray-500 text-sm">(Coming soon)</p>
      </div>
    </div>
  );
}
