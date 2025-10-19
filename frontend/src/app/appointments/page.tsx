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
  const [calendarSlots, setCalendarSlots] = useState<any[]>([]);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [dealers, setDealers] = useState<any[]>([]);
  // dealership selection (austinDealers id) vs. specific dealer employee selection (Firestore uid)
  const [selectedDealershipId, setSelectedDealershipId] = useState<string>("");
  const [selectedDealerId, setSelectedDealerId] = useState<string>("");
  const [selectedDealershipName, setSelectedDealershipName] = useState<string>("");
  const [onlyShowAvailableAtTime, setOnlyShowAvailableAtTime] = useState<boolean>(true);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [comments, setComments] = useState<string>("");
  const [pendingSlot, setPendingSlot] = useState<{date: string, time: string, dealerId: string} | null>(null);

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

  // Fetch and aggregate availability for selected dealership
  useEffect(() => {
    async function fetchAvailability() {
      setAvailabilityLoading(true);
      setCalendarSlots([]);
      if (!selectedDealershipId) { setAvailabilityLoading(false); return; }
      // Get all dealer employees for this dealership
      const q = query(collection(db, "dealers"), where("dealershipId", "==", selectedDealershipId));
      const snap = await getDocs(q);
      const employees = snap.docs.map(d => d.data());
      const dayNames = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
      const slots: any[] = [];
      for (let i = 0; i < 7; i++) {
        const dateObj = new Date();
        dateObj.setDate(dateObj.getDate() + i);
        const dayKey = dayNames[dateObj.getDay()];
        let daySlots: any[] = [];
        employees.forEach(emp => {
          const avail = emp.availability || {};
          const slotsForDay = avail[dayKey] || [];
          slotsForDay.forEach((slot: any) => {
            daySlots.push({
              start: slot.start,
              end: slot.end,
              employee: emp.displayName || emp.email || "Dealer",
              date: dateObj.toISOString().slice(0,10),
              dealerId: emp.id || emp.uid
            });
          });
        });
        if (daySlots.length > 0) {
          slots.push({
            date: dateObj.toISOString().slice(0,10),
            day: dayKey,
            slots: daySlots
          });
        }
      }
      setCalendarSlots(slots);
      setAvailabilityLoading(false);
    }
    fetchAvailability();
  }, [selectedDealershipId]);

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

  const bookAppointment = async (date: string, time: string, dealerId: string) => {
    setError("");
    if (!user) { setError("Please log in first."); return; }
    if (!selectedDealershipId) { setError("Please select a dealership."); return; }
    try {
      setSaving(true);
      await addDoc(collection(db, "appointments"), {
        userId: user.uid,
        dealerId: dealerId || null,
        dealershipId: selectedDealershipId,
        dealershipName: selectedDealershipName || null,
        date,
        time,
        comments,
        status: "requested",
        createdAt: Date.now()
      });
      setStatus("Appointment requested! You'll receive a confirmation soon.");
      setSaving(false);
      setSelectedDealerId("");
      setComments("");
      setDate("");
      setTime("");
      setPendingSlot(null);
    } catch (err: any) {
      setSaving(false);
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Book an Appointment</h1>
      {!user && <div className="text-sm text-gray-600 mb-4">You must be logged in to book an appointment.</div>}
      <div className="mb-4">
        <DealerAutocomplete
          value={selectedDealershipId || undefined}
          onChange={(id, meta) => {
            setSelectedDealershipId(id || "");
            setSelectedDealershipName(meta?.name || "");
            setDate("");
            setTime("");
            setSelectedDealerId("");
          }}
        />
      </div>
      <div className="space-y-4 mb-6">
        <label className="block mb-1">Comments / Motivations</label>
        <textarea
          className="w-full border rounded px-2 py-1 min-h-[60px]"
          value={comments}
          onChange={e => setComments(e.target.value)}
          placeholder="Describe what you're looking for, your current vehicle, financing needs, or any other info for the dealer."
          disabled={saving}
        />
      </div>
      {/* Calendar UI for available slots */}
      {availabilityLoading ? (
        <div>Loading available slots...</div>
      ) : selectedDealershipId && calendarSlots.length > 0 ? (
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Available Appointment Slots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {calendarSlots.map((day: any) => (
              <div key={day.date} className="border rounded p-2">
                <div className="font-bold mb-1">{new Date(day.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</div>
                <div className="space-y-1">
                  {day.slots.map((slot: any, idx: number) => (
                    <button
                      key={idx}
                      className={`w-full text-left px-2 py-1 rounded ${pendingSlot && pendingSlot.date === day.date && pendingSlot.time === slot.start && pendingSlot.dealerId === slot.dealerId ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-blue-50'}`}
                      disabled={saving}
                      onClick={() => {
                        setPendingSlot({date: day.date, time: slot.start, dealerId: slot.dealerId});
                        bookAppointment(day.date, slot.start, slot.dealerId);
                      }}
                    >
                      <span className="font-medium">{slot.start} - {slot.end}</span>
                      <span className="ml-2 text-xs text-gray-600">{slot.employee}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : selectedDealershipId ? (
        <div className="text-gray-600 mb-6">No available slots for this dealership.</div>
      ) : null}
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {status && <div className="text-green-700 text-sm">{status}</div>}
    </div>
  );
}
