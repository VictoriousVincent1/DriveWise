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
      // Fetch appointments
      const apptSnap = await getDocs(collection(db, "appointments"));
      const appts = [];
      for (const appt of apptSnap.docs) {
        const data = appt.data();
        // Fetch user info for each appointment
        const userInfo = data.userId ? (await getDoc(doc(db, "users", data.userId))).data() : null;
        appts.push({ ...data, id: appt.id, userInfo });
      }
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
      <h1 className="text-2xl font-bold mb-6">Dealership Appointments</h1>
      <button onClick={handleLogout} className="mb-6 bg-gray-200 text-gray-700 py-2 px-4 rounded">Log Out</button>
      {appointments.length === 0 ? (
        <div>No appointments booked yet.</div>
      ) : (
        <div className="space-y-6">
          {appointments.map((appt) => (
            <div key={appt.id} className="border rounded p-4 bg-gray-50">
              <h2 className="font-bold text-lg mb-2">Appointment: {appt.date} at {appt.time}</h2>
              <div className="mb-2">Booked by: <span className="font-semibold">{appt.userInfo?.displayName || appt.userInfo?.email}</span></div>
              <div className="mb-2">Phone: {appt.userInfo?.phone}</div>
              <div className="mb-2">Zipcode: {appt.userInfo?.zipcode}</div>
              <div className="mb-2">Email: {appt.userInfo?.email}</div>
              {/* PDF download link (assume appt.pdfUrl is set) */}
              {appt.pdfUrl ? (
                <a href={appt.pdfUrl} target="_blank" rel="noopener" className="text-blue-600 underline">Download PDF</a>
              ) : (
                <span className="text-gray-400">PDF not generated</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
