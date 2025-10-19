"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Dealer } from "../../types";
import { auth } from "../../lib/firebase";

interface DealerListProps {
  dealers: Dealer[];
}

export default function DealerList({ dealers }: DealerListProps) {
  const [vehicleCounts, setVehicleCounts] = useState<{[dealerId: string]: number}>({});
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);
  const router = useRouter();
  useEffect(() => {
    async function fetchCounts() {
      const counts: {[dealerId: string]: number} = {};
      for (const dealer of dealers) {
        try {
          // Fetch vehicle count from Firestore API route
          const res = await fetch(`/api/dealer-vehicle-count?dealershipId=${dealer.id}`);
          const data = await res.json();
          counts[dealer.id] = data.count || 0;
        } catch {
          counts[dealer.id] = 0;
        }
      }
      setVehicleCounts(counts);
    }
    fetchCounts();
  }, [dealers]);

  const [selectedDealer, setSelectedDealer] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [bookingStatus, setBookingStatus] = useState<string>("");

  const handleBook = async (dealerId: string) => {
    if (!selectedDate || !selectedTime) {
      setBookingStatus("Please select a date and time.");
      return;
    }
    // Here you would send booking info to backend
    setBookingStatus(`Appointment booked for ${selectedDate} at ${selectedTime}`);
    setSelectedDealer(null);
    setSelectedDate("");
    setSelectedTime("");
  };

  return (
    <div className="space-y-4">
      {dealers.map((dealer) => (
        <div key={dealer.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              {/* ...existing code... */}
              <div className="flex items-center gap-2 text-sm">
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                  {vehicleCounts[dealer.id] ?? 0} vehicles in stock
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4 md:mt-0 md:ml-4 min-w-[200px]">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                onClick={() => setSelectedDealer(String(dealer.id))}
              >
                Book Appointment
              </button>
              {selectedDealer === dealer.id && (
                <div className="bg-gray-50 p-3 rounded-lg mt-2 border border-blue-200">
                  <label className="block mb-2 font-medium text-sm text-gray-700">Select Date:</label>
                  <input
                    type="date"
                    className="mb-2 px-2 py-1 rounded border border-gray-300 w-full"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                  />
                  <label className="block mb-2 font-medium text-sm text-gray-700">Select Time:</label>
                  <input
                    type="time"
                    className="mb-2 px-2 py-1 rounded border border-gray-300 w-full"
                    value={selectedTime}
                    onChange={e => setSelectedTime(e.target.value)}
                  />
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded font-medium mt-2"
                    onClick={() => handleBook(String(dealer.id))}
                  >
                    Confirm Appointment
                  </button>
                  {bookingStatus && (
                    <div className="text-green-700 mt-2 text-sm">{bookingStatus}</div>
                  )}
                </div>
              )}
              {/* Print PDF button removed as requested */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
