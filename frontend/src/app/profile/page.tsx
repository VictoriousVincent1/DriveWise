"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const priorities = [
  "Cost",
  "Safety",
  "Number of People",
  "Fuel Efficiency",
  "Tech Features",
  "Cargo Space",
  "Performance",
  "Brand Loyalty",
  "Eco-Friendly",
];

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [displayName, setDisplayName] = useState("");
  const [carNeeds, setCarNeeds] = useState("");
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.push("/auth/login");
        return;
      }
      setUser(u);
      setDisplayName(u?.displayName || "");
      
      // Load existing profile data
      const ref = doc(db, "users", u.uid);
      const snap = await getDoc(ref);
      
      if (snap.exists()) {
        const data = snap.data() as any;
        setCarNeeds(data.carNeeds || "");
        setSelectedPriorities(data.priorities || []);
        
        // If profile is already completed, redirect to user page
        if (data.profileCompleted) {
          router.push("/user");
        }
      }
    });
    return () => unsub();
  }, [router]);

  const handlePriority = (p: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(p)
        ? prev.filter((x) => x !== p)
        : prev.length < 3
        ? [...prev, p]
        : prev
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      if (user && displayName) {
        await updateProfile(user, { displayName });
      }
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          displayName,
          email: user.email,
          carNeeds,
          priorities: selectedPriorities,
          profileCompleted: true,
          updatedAt: Date.now(),
        }, { merge: true });
      }
      setSaving(false);
      router.push("/user");
    } catch (err: any) {
      console.error("Save error:", err);
      setError(err.message);
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth/login");
  };

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input type="text" className="w-full border rounded px-2 py-1" value={displayName} onChange={e => setDisplayName(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block mb-1">What are you looking for in a car?</label>
        <textarea className="w-full border rounded px-2 py-1" value={carNeeds} onChange={e => setCarNeeds(e.target.value)} placeholder="Describe your needs, e.g. family, commute, adventure..." />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Top 3 Priorities</label>
        <div className="flex flex-wrap gap-2">
          {priorities.map((p) => (
            <button
              key={p}
              type="button"
              className={`px-3 py-1 rounded border ${selectedPriorities.includes(p) ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-300"}`}
              onClick={() => handlePriority(p)}
              disabled={!selectedPriorities.includes(p) && selectedPriorities.length >= 3}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="text-xs text-gray-500 mt-1">Choose up to 3 priorities.</div>
      </div>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <button onClick={handleSave} className="w-full bg-blue-600 text-white py-2 rounded mt-2" disabled={saving}>{saving ? "Saving..." : "Save Profile"}</button>
      <button onClick={handleLogout} className="w-full bg-gray-200 text-gray-700 py-2 rounded mt-4">Log Out</button>
    </div>
  );
}
