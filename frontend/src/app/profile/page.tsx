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
  const [role, setRole] = useState<string>("user");
  const [displayName, setDisplayName] = useState("");
  const [carNeeds, setCarNeeds] = useState("");
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [phone, setPhone] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [dealership, setDealership] = useState("");
  const [years, setYears] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editField, setEditField] = useState<string|null>(null);
  const [tempValue, setTempValue] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.push("/auth/login");
        return;
      }
      setUser(u);
      setDisplayName(u?.displayName || "");
      // Try to load user profile from 'users' collection
      let snap = await getDoc(doc(db, "users", u.uid));
      let data = snap.exists() ? snap.data() : null;
      if (data) {
        setRole(data.role || "user");
        setCarNeeds(data.carNeeds || "");
        setSelectedPriorities(data.priorities || []);
        setPhone(data.phone || "");
        setZipcode(data.zipcode || "");
      } else {
        // Try to load dealer profile from 'dealers' collection
        snap = await getDoc(doc(db, "dealers", u.uid));
        data = snap.exists() ? snap.data() : null;
        if (data) {
          setRole("dealer-employee");
          setDisplayName(data.displayName || "");
          setDealership(data.dealership || "");
          setYears(data.years || "");
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
        if (role === "dealer-employee") {
          await setDoc(doc(db, "dealers", user.uid), {
            displayName,
            dealership,
            years,
            email: user.email,
            updatedAt: Date.now(),
          }, { merge: true });
        } else {
          if (!phone || !zipcode) {
            setError("Phone number and zipcode are required to continue.");
            setSaving(false);
            return;
          }
          await setDoc(doc(db, "users", user.uid), {
            displayName,
            email: user.email,
            carNeeds,
            priorities: selectedPriorities,
            phone,
            zipcode,
            profileCompleted: !!phone && !!zipcode,
            updatedAt: Date.now(),
          }, { merge: true });
        }
      }
      setSaving(false);
      router.push(role === "dealer-employee" ? "/dealer-employee" : "/user");
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
      <div className="mb-4 flex items-center gap-2">
        <label className="block mb-1">Name</label>
        {editField === "name" ? (
          <>
            <input type="text" className="w-full border rounded px-2 py-1" value={tempValue} onChange={e => setTempValue(e.target.value)} />
            <button className="ml-2 text-blue-600" onClick={() => { setDisplayName(tempValue); setEditField(null); }}>Save</button>
            <button className="ml-1 text-gray-500" onClick={() => setEditField(null)}>Cancel</button>
          </>
        ) : (
          <>
            <input type="text" className="w-full border rounded px-2 py-1" value={displayName} readOnly />
            <button className="ml-2 text-blue-600" onClick={() => { setEditField("name"); setTempValue(displayName); }}>Edit</button>
          </>
        )}
      </div>
      {role === "dealer-employee" ? (
        <>
          <div className="mb-4 flex items-center gap-2">
            <label className="block mb-1">Dealership</label>
            {editField === "dealership" ? (
              <>
                <input type="text" className="w-full border rounded px-2 py-1" value={tempValue} onChange={e => setTempValue(e.target.value)} placeholder="Dealership Name" />
                <button className="ml-2 text-blue-600" onClick={() => { setDealership(tempValue); setEditField(null); }}>Save</button>
                <button className="ml-1 text-gray-500" onClick={() => setEditField(null)}>Cancel</button>
              </>
            ) : (
              <>
                <input type="text" className="w-full border rounded px-2 py-1" value={dealership} readOnly placeholder="Dealership Name" />
                <button className="ml-2 text-blue-600" onClick={() => { setEditField("dealership"); setTempValue(dealership); }}>Edit</button>
              </>
            )}
          </div>
          <div className="mb-4 flex items-center gap-2">
            <label className="block mb-1">Years of Experience</label>
            {editField === "years" ? (
              <>
                <input type="number" className="w-full border rounded px-2 py-1" value={tempValue} onChange={e => setTempValue(e.target.value)} placeholder="Years" />
                <button className="ml-2 text-blue-600" onClick={() => { setYears(tempValue); setEditField(null); }}>Save</button>
                <button className="ml-1 text-gray-500" onClick={() => setEditField(null)}>Cancel</button>
              </>
            ) : (
              <>
                <input type="number" className="w-full border rounded px-2 py-1" value={years} readOnly placeholder="Years" />
                <button className="ml-2 text-blue-600" onClick={() => { setEditField("years"); setTempValue(years); }}>Edit</button>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="mb-4 flex items-center gap-2">
            <label className="block mb-1">Phone Number</label>
            {editField === "phone" ? (
              <>
                <input type="tel" className="w-full border rounded px-2 py-1" value={tempValue} onChange={e => setTempValue(e.target.value)} placeholder="e.g. 555-123-4567" />
                <button className="ml-2 text-blue-600" onClick={() => { setPhone(tempValue); setEditField(null); }}>Save</button>
                <button className="ml-1 text-gray-500" onClick={() => setEditField(null)}>Cancel</button>
              </>
            ) : (
              <>
                <input type="tel" className="w-full border rounded px-2 py-1" value={phone} readOnly placeholder="e.g. 555-123-4567" />
                <button className="ml-2 text-blue-600" onClick={() => { setEditField("phone"); setTempValue(phone); }}>Edit</button>
              </>
            )}
          </div>
          <div className="mb-4 flex items-center gap-2">
            <label className="block mb-1">Zipcode</label>
            {editField === "zipcode" ? (
              <>
                <input type="text" className="w-full border rounded px-2 py-1" value={tempValue} onChange={e => setTempValue(e.target.value)} placeholder="e.g. 90210" />
                <button className="ml-2 text-blue-600" onClick={() => { setZipcode(tempValue); setEditField(null); }}>Save</button>
                <button className="ml-1 text-gray-500" onClick={() => setEditField(null)}>Cancel</button>
              </>
            ) : (
              <>
                <input type="text" className="w-full border rounded px-2 py-1" value={zipcode} readOnly placeholder="e.g. 90210" />
                <button className="ml-2 text-blue-600" onClick={() => { setEditField("zipcode"); setTempValue(zipcode); }}>Edit</button>
              </>
            )}
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
          {(!phone || !zipcode) && (
            <div className="text-red-600 text-sm mt-4">Phone number and zipcode are required to continue. Please fill them in above.</div>
          )}
        </>
      )}
      <button onClick={handleSave} className="w-full bg-blue-600 text-white py-2 rounded mt-2" disabled={saving}>{saving ? "Saving..." : "Save Profile"}</button>
      <button onClick={handleLogout} className="w-full bg-gray-200 text-gray-700 py-2 rounded mt-4">Log Out</button>
    </div>
  );
}
