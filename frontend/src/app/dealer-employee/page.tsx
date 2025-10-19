"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import Link from "next/link";

export default function DealerEmployeeDashboard() {
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setUser(null);
        setLoading(false);
        return;
      }
      setUser(u);
      // Authorize: user must exist in 'dealers' collection
      const dealerDoc = await getDoc(doc(db, "dealers", u.uid));
      if (!dealerDoc.exists()) {
        setError("You are not authorized to view this page.");
        setLoading(false);
        return;
      }
      // Fetch appointments assigned to this dealer
      const apptSnap = await getDocs(collection(db, "appointments"));
      const appts = [];
      for (const appt of apptSnap.docs) {
        const data = appt.data();
        if (data.dealerId !== u.uid) continue;
        // Fetch user info for each appointment
        const userInfo = data.userId ? (await getDoc(doc(db, "users", data.userId))).data() : null;
        appts.push({ ...data, id: appt.id, userInfo });
      }
      // sort by date/time ascending
      appts.sort((a: any, b: any) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime());
      setAppointments(appts);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/auth/login";
  };

  if (loading) {
    return <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded shadow">Loading...</div>;
  }
  if (error) {
    return <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded shadow text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white rounded shadow">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Client Appointments</h1>
        <button onClick={handleLogout} className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300">
          Log Out
        </button>
      </div>
      {appointments.length === 0 ? (
        <div className="text-gray-600">No client appointments yet.</div>
      ) : (
        <div className="space-y-6">
          {appointments.map((appt) => (
            <div key={appt.id} className="border rounded p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-lg">
                  {appt.date} at {appt.time}
                </h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {appt.status || 'requested'}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <div className="text-sm text-gray-600">Client</div>
                  <div className="font-semibold">{appt.userInfo?.displayName || appt.userInfo?.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-semibold">{appt.userInfo?.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Phone</div>
                  <div className="font-semibold">{appt.userInfo?.phone || '—'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Location</div>
                  <div className="font-semibold">{appt.userInfo?.zipcode || '—'}</div>
                </div>
              </div>
              {appt.pdfUrl ? (
                <a href={appt.pdfUrl} target="_blank" rel="noopener" className="mt-3 inline-block text-blue-600 hover:text-blue-800 underline text-sm">
                  Download PDF
                </a>
              ) : (
                <div className="mt-3 text-gray-400 text-sm">PDF not generated</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
