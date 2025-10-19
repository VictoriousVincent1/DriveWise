"use client";
import { useEffect, useMemo, useState } from "react";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, addDoc, doc, getDoc, query, where } from "firebase/firestore";
import DealerAutocomplete from "@/components/dealers/DealerAutocomplete";
import type { WeeklyAvailability } from "@/components/dealers/AvailabilityManager";

// Helper: find dealers available for a specific weekday/time
function dealersAvailableAt(dealers: any[], dateISO: string, timeHHMM: string) {
  const dt = new Date(dateISO);
  const dayNames = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"] as const;
  const dayKey = dayNames[dt.getDay()];
  const [h, m] = timeHHMM.split(":").map(Number);
  const minutes = h*60 + m;
  return dealers.filter(d => {
    const avail: WeeklyAvailability = d.availability || {};
    const slots = (avail as any)[dayKey] || [];
    return slots.some((s: any) => {
      const [sh, sm] = s.start.split(":").map(Number);
      const [eh, em] = s.end.split(":").map(Number);
      const startMin = sh*60 + sm;
      const endMin = eh*60 + em;
      return minutes >= startMin && minutes <= endMin;
    });
  });
}

export default function AppointmentBookingPage() {
  const [user, setUser] = useState<any>(null);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [dealers, setDealers] = useState<any[]>([]);
  // dealership selection (austinDealers id) vs. specific dealer employee selection (Firestore uid)
  const [selectedDealershipId, setSelectedDealershipId] = useState<string>("");
  const [selectedDealerId, setSelectedDealerId] = useState<string>("");
  const [selectedDealershipName, setSelectedDealershipName] = useState<string>("");
  const [onlyShowAvailableAtTime, setOnlyShowAvailableAtTime] = useState<boolean>(true);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (!u) return;
      // load dealers
      const snap = await getDocs(collection(db, "dealers"));
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setDealers(list);
    });
    return () => unsub();
  }, []);

  const dealerList = useMemo(() => {
    let list = dealers;
    if (selectedDealershipId) {
      list = list.filter((d) => d.dealershipId === selectedDealershipId);
    }
    if (onlyShowAvailableAtTime && date && time) {
      list = dealersAvailableAt(list, date, time);
    }
    return list;
  }, [dealers, selectedDealershipId, onlyShowAvailableAtTime, date, time]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!user) { setError("Please log in first."); return; }
    if (!date || !time) { setError("Select date and time."); return; }
    if (!selectedDealershipId) { setError("Please select a dealership."); return; }

    try {
      setSaving(true);
      // write appointment
      await addDoc(collection(db, "appointments"), {
        userId: user.uid,
        dealerId: selectedDealerId || null,
        dealershipId: selectedDealershipId,
        dealershipName: selectedDealershipName || null,
        date,
        time,
        status: "requested",
        createdAt: Date.now()
      });
      setStatus("Appointment requested! You'll receive a confirmation soon.");
      setSaving(false);
      setSelectedDealerId("");
    } catch (err: any) {
      setSaving(false);
      setError(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Book an Appointment</h1>
      {!user && <div className="text-sm text-gray-600 mb-4">You must be logged in to book an appointment.</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Dealership</label>
          <DealerAutocomplete
            value={selectedDealershipId || undefined}
            onChange={(id, meta) => {
              setSelectedDealershipId(id || "");
              setSelectedDealershipName(meta?.name || "");
            }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Date</label>
            <input type="date" className="w-full border rounded px-2 py-1" value={date} onChange={e => setDate(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1">Time</label>
            <input type="time" className="w-full border rounded px-2 py-1" value={time} onChange={e => setTime(e.target.value)} required />
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <input id="filterByTime" type="checkbox" className="w-4 h-4" checked={onlyShowAvailableAtTime} onChange={e => setOnlyShowAvailableAtTime(e.target.checked)} />
          <label htmlFor="filterByTime">Only show dealers available at the selected time</label>
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {status && <div className="text-green-700 text-sm">{status}</div>}
        <button type="submit" disabled={!user || saving} className="w-full bg-blue-600 text-white py-2 rounded">{saving ? 'Booking...' : 'Book Appointment'}</button>
      </form>

      {/* Suggested dealers list */}
      {dealerList.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Dealers {onlyShowAvailableAtTime && date && time ? 'available at this time' : 'at selected dealership'}</h2>
          <ul className="space-y-2">
            {dealerList.map(d => (
              <li key={d.id} className={`p-2 border rounded ${selectedDealerId === d.id ? 'border-blue-600' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{d.dealership || d.displayName || d.email}</div>
                    <div className="text-xs text-gray-600">{d.dealerZip || '—'}</div>
                  </div>
                  <button type="button" className="px-3 py-1 text-sm bg-gray-100 rounded" onClick={() => setSelectedDealerId(d.id)}>Select</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
