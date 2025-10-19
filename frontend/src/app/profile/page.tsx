"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import DealerAutocomplete from "@/components/dealers/DealerAutocomplete";
import AvailabilityManager, { WeeklyAvailability } from "@/components/dealers/AvailabilityManager";

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
  const [dealershipId, setDealershipId] = useState("");
  const [dealerZip, setDealerZip] = useState("");
  const [years, setYears] = useState("");
  const [availability, setAvailability] = useState<WeeklyAvailability>({});
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
      
      // Check users collection first to determine role
      let userSnap = await getDoc(doc(db, "users", u.uid));
      let userData = userSnap.exists() ? userSnap.data() : null;
      
      if (userData?.role === "dealer-employee") {
        // If user is a dealer, load from dealers collection
        const dealerSnap = await getDoc(doc(db, "dealers", u.uid));
        const dealerData = dealerSnap.exists() ? dealerSnap.data() : null;
        console.log("Loading dealer data:", dealerData);
        if (dealerData) {
          setRole("dealer-employee");
          setDisplayName(dealerData.displayName || u.displayName || "");
          setDealership(dealerData.dealership || "");
          setDealershipId(dealerData.dealershipId || "");
          setDealerZip(dealerData.dealerZip || "");
          setYears(dealerData.years || "");
          setAvailability(dealerData.availability || {});
        }
      } else if (userData) {
        // Regular user
        setRole(userData.role || "user");
        setDisplayName(userData.displayName || u.displayName || "");
        setCarNeeds(userData.carNeeds || "");
        setSelectedPriorities(userData.priorities || []);
        setPhone(userData.phone || "");
        setZipcode(userData.zipcode || "");
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
          console.log("Saving dealer data:", {
            displayName,
            dealership,
            dealershipId,
            dealerZip,
            years,
            availability,
          });
          await setDoc(doc(db, "dealers", user.uid), {
            displayName,
            dealership,
            dealershipId,
            dealerZip,
            years,
            availability,
            email: user.email,
            updatedAt: Date.now(),
          }, { merge: true });
          console.log("Dealer data saved successfully");
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
          <div className="mb-4">
            <DealerAutocomplete
              value={dealershipId}
              onChange={(id, meta) => {
                console.log("Dealership selected:", { id, meta });
                setDealershipId(id || "");
                setDealership(meta?.name || "");
                setDealerZip(meta?.zipCode || "");
              }}
            />
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

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Your Availability</h2>
            <AvailabilityManager 
              availability={availability} 
              onChange={setAvailability}
            />
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
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <button onClick={handleSave} className="w-full bg-blue-600 text-white py-2 rounded mt-4" disabled={saving}>{saving ? "Saving..." : "Save Profile"}</button>
      <div className="text-xs text-gray-500 text-center mt-2">Remember to click "Save Profile" to save your changes</div>
      <button onClick={handleLogout} className="w-full bg-gray-200 text-gray-700 py-2 rounded mt-4">Log Out</button>
    </div>
  );
}
