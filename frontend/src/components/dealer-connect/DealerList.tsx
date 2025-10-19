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

  const handleBookRedirect = (dealerId: string | number) => {
    // Redirect to appointments page
    router.push(`/appointments?dealership=${dealerId}`);
  };

  return (
    <div className="space-y-4">
      {dealers.map((dealer) => (
        <div key={dealer.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{dealer.name}</h3>
              <p className="text-gray-600 mb-1">
                {dealer.address}, {dealer.city}, {dealer.state} {dealer.zipCode}
              </p>
              {dealer.phone && (
                <p className="text-gray-600 mb-1">
                  📞 {dealer.phone}
                </p>
              )}
              {dealer.email && (
                <p className="text-gray-600 mb-2">
                  ✉️ {dealer.email}
                </p>
              )}
              {dealer.distance !== undefined && (
                <p className="text-sm text-gray-500 mb-2">
                  📍 {dealer.distance} miles away
                </p>
              )}
              {dealer.rating !== undefined && (
                <p className="text-sm text-gray-500 mb-3">
                  ⭐ {dealer.rating} / 5.0
                </p>
              )}
              <div className="flex items-center gap-2 text-sm">
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                  {vehicleCounts[dealer.id] ?? 0} vehicles in stock
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4 md:mt-0 md:ml-4 min-w-[200px]">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                onClick={() => handleBookRedirect(dealer.id)}
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
