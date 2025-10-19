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
  const [dealershipId, setDealershipId] = useState<string>("");

  const loadVehicles = async (dealershipId?: string) => {
    const vehicleSnap = await getDocs(collection(db, "vehicles"));
    let allVehicles = vehicleSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Filter by dealership if dealer has one assigned
    if (dealershipId) {
      allVehicles = allVehicles.filter((v: any) => v.dealershipId === dealershipId);
    }
    
    setVehicles(allVehicles);
  };

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
      // Fetch vehicles for this dealer's dealership
      const dealerData = dealerDoc.data();
      const dId = dealerData?.dealershipId;
      setDealershipId(dId);
      
      await loadVehicles(dId);
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
    await loadVehicles(dealershipId);
  };

  if (loading) return <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded shadow">Loading inventory...</div>;
  if (error) return <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded shadow text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto mt-12 p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Vehicle Inventory</h1>
      {vehicles.length === 0 ? (
        <div className="text-gray-600">
          No vehicles in stock. Run the seed script to populate inventory.
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Showing {vehicles.length} vehicle{vehicles.length !== 1 ? 's' : ''} in inventory
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicles.map((v) => (
              <div key={v.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {editId === v.id ? (
                  <div className="p-4 space-y-2">
                    <input type="text" className="border rounded px-2 py-1 w-full text-sm" value={editData.make} onChange={e => setEditData({ ...editData, make: e.target.value })} placeholder="Make" />
                    <input type="text" className="border rounded px-2 py-1 w-full text-sm" value={editData.model} onChange={e => setEditData({ ...editData, model: e.target.value })} placeholder="Model" />
                    <input type="number" className="border rounded px-2 py-1 w-full text-sm" value={editData.year} onChange={e => setEditData({ ...editData, year: Number(e.target.value) })} placeholder="Year" />
                    <input type="text" className="border rounded px-2 py-1 w-full text-sm" value={editData.trim} onChange={e => setEditData({ ...editData, trim: e.target.value })} placeholder="Trim" />
                    <input type="text" className="border rounded px-2 py-1 w-full text-sm" value={editData.color} onChange={e => setEditData({ ...editData, color: e.target.value })} placeholder="Color" />
                    <input type="number" className="border rounded px-2 py-1 w-full text-sm" value={editData.price} onChange={e => setEditData({ ...editData, price: Number(e.target.value) })} placeholder="Price" />
                    <input type="number" className="border rounded px-2 py-1 w-full text-sm" value={editData.mileage} onChange={e => setEditData({ ...editData, mileage: Number(e.target.value) })} placeholder="Mileage" />
                    <select className="border rounded px-2 py-1 w-full text-sm" value={editData.status} onChange={e => setEditData({ ...editData, status: e.target.value })}>
                      <option value="available">Available</option>
                      <option value="sold">Sold</option>
                      <option value="pending">Pending</option>
                    </select>
                    <div className="flex gap-2 mt-2">
                      <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm" onClick={handleSave}>Save</button>
                      <button className="flex-1 bg-gray-300 text-gray-700 px-3 py-2 rounded text-sm" onClick={() => setEditId(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="h-32 bg-gray-200 flex items-center justify-center">
                      <span className="text-4xl"></span>
                    </div>
                    <div className="p-4">
                      <div className="font-bold text-lg mb-1">{v.year} {v.make} {v.model}</div>
                      <div className="text-sm text-gray-600 mb-2">{v.trim}</div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-blue-600">${v.price?.toLocaleString()}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          v.status === 'available' ? 'bg-green-100 text-green-700' :
                          v.status === 'sold' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {v.status || 'available'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 mb-3">
                        <div>Color: {v.color}</div>
                        <div>Mileage: {v.mileage?.toLocaleString()} mi</div>
                        <div>VIN: {v.vin?.slice(-6)}</div>
                      </div>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm" onClick={() => handleEdit(v.id, v)}>Edit</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
