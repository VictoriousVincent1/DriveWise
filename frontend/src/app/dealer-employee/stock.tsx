"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";

export default function DealerStockManager() {
  const [user, setUser] = useState<any>(null);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState<string|null>(null);
  const [editData, setEditData] = useState<any>({});

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
      // Fetch vehicles
      const vehicleSnap = await getDocs(collection(db, "vehicles"));
      setVehicles(vehicleSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleEdit = (id: string, data: any) => {
    setEditId(id);
    setEditData(data);
  };

  const handleSave = async () => {
    if (!editId) return;
    await setDoc(doc(db, "vehicles", editId), editData, { merge: true });
    setEditId(null);
    setEditData({});
    // Refresh vehicles
    const vehicleSnap = await getDocs(collection(db, "vehicles"));
    setVehicles(vehicleSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  if (loading) return <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded shadow">Loading...</div>;
  if (error) return <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded shadow text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Manage Dealership Stock</h1>
      {vehicles.length === 0 ? (
        <div>No vehicles in stock.</div>
      ) : (
        <div className="space-y-6">
          {vehicles.map((v) => (
            <div key={v.id} className="border rounded p-4 bg-gray-50">
              {editId === v.id ? (
                <div className="space-y-2">
                  <input type="text" className="border rounded px-2 py-1 w-full" value={editData.make} onChange={e => setEditData({ ...editData, make: e.target.value })} placeholder="Make" />
                  <input type="text" className="border rounded px-2 py-1 w-full" value={editData.model} onChange={e => setEditData({ ...editData, model: e.target.value })} placeholder="Model" />
                  <input type="number" className="border rounded px-2 py-1 w-full" value={editData.year} onChange={e => setEditData({ ...editData, year: Number(e.target.value) })} placeholder="Year" />
                  <input type="text" className="border rounded px-2 py-1 w-full" value={editData.trim} onChange={e => setEditData({ ...editData, trim: e.target.value })} placeholder="Trim" />
                  <input type="text" className="border rounded px-2 py-1 w-full" value={editData.category} onChange={e => setEditData({ ...editData, category: e.target.value })} placeholder="Category" />
                  <input type="number" className="border rounded px-2 py-1 w-full" value={editData.price} onChange={e => setEditData({ ...editData, price: Number(e.target.value) })} placeholder="Price" />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2" onClick={handleSave}>Save</button>
                  <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded" onClick={() => setEditId(null)}>Cancel</button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold">{v.make} {v.model} ({v.year})</div>
                    <div className="text-sm text-gray-600">Trim: {v.trim} | Category: {v.category} | Price: ${v.price}</div>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => handleEdit(v.id, v)}>Edit</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
