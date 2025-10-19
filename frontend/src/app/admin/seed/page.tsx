"use client";
import { useState } from "react";
import { db } from "../../../lib/firebase";
import { collection, doc, setDoc, writeBatch } from "firebase/firestore";
import { austinDealers } from "@/lib/data/austinDealers";
import { mockVehicles } from "@/lib/mockData/vehicles";

function randomStock(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateVIN(): string {
  const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';
  let vin = '';
  for (let i = 0; i < 17; i++) {
    vin += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return vin;
}

const colors = ['White', 'Black', 'Silver', 'Gray', 'Blue', 'Red', 'Midnight Black Metallic', 'Blueprint', 'Supersonic Red'];

export default function SeedDatabasePage() {
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const seedDealerships = async () => {
    setStatus("Seeding dealerships...");
    const batch = writeBatch(db);
    
    for (const dealer of austinDealers) {
      const dealerRef = doc(collection(db, 'dealerships'), dealer.id);
      batch.set(dealerRef, {
        name: dealer.name,
        brand: dealer.brand,
        address: dealer.address,
        city: dealer.city,
        state: dealer.state,
        zipCode: dealer.zipCode,
        location: {
          lat: dealer.lat,
          lon: dealer.lon,
        },
        phone: dealer.phone || null,
        website: dealer.website || null,
        createdAt: Date.now(),
      });
    }
    
    await batch.commit();
    setStatus(`✅ Added ${austinDealers.length} dealerships`);
  };

  const seedVehicles = async () => {
    setStatus("Seeding vehicle inventory...");
    let totalVehicles = 0;
    
    for (const dealer of austinDealers) {
      const numVehicles = randomStock(3, 6);
      const selectedVehicles = [...mockVehicles]
        .sort(() => Math.random() - 0.5)
        .slice(0, numVehicles);
      
      for (const vehicle of selectedVehicles) {
        const instances = randomStock(1, 3);
        
        for (let i = 0; i < instances; i++) {
          const vehicleRef = doc(collection(db, 'vehicles'));
          const color = colors[Math.floor(Math.random() * colors.length)];
          const mileage = randomStock(0, 50);
          
          await setDoc(vehicleRef, {
            dealershipId: dealer.id,
            dealershipName: dealer.name,
            make: vehicle.make,
            model: vehicle.model,
            year: vehicle.year,
            trim: vehicle.description?.split(',')[0] || 'Base',
            price: (vehicle.price || 30000) + randomStock(-1000, 1000),
            msrp: vehicle.price || 30000,
            mileage: mileage,
            color: color,
            vin: generateVIN(),
            category: vehicle.model.includes('Camry') || vehicle.model.includes('Corolla') ? 'sedan' :
                     vehicle.model.includes('RAV4') || vehicle.model.includes('Highlander') ? 'suv' :
                     vehicle.model.includes('Prius') ? 'hybrid' :
                     vehicle.model.includes('Tacoma') ? 'truck' : 'sedan',
            status: 'available',
            features: vehicle.description?.split(',').map(f => f.trim()) || [],
            images: [vehicle.image || '/placeholder-vehicle.jpg'],
            createdAt: Date.now(),
          });
          
          totalVehicles++;
        }
      }
      
      setStatus(`Seeded ${dealer.name}... (${totalVehicles} vehicles so far)`);
    }
    
    setStatus(`✅ Added ${totalVehicles} vehicles across all dealerships`);
  };

  const handleSeed = async () => {
    setLoading(true);
    setError("");
    setStatus("");
    
    try {
      await seedDealerships();
      await seedVehicles();
      setStatus("✨ Database seeding completed successfully!");
    } catch (err: any) {
      console.error("Seed error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Seed Firebase Database</h1>
      <p className="text-gray-600 mb-6">
        This will populate your Firebase database with:
      </p>
      <ul className="list-disc ml-6 mb-6 text-gray-700">
        <li><strong>8 dealerships</strong> (Austin-area Toyota/Lexus dealers)</li>
        <li><strong>~30-50 vehicles</strong> (3-6 vehicles per dealership)</li>
      </ul>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
        <p className="text-sm text-yellow-800">
          ⚠️ <strong>Warning:</strong> This will create new documents in your Firestore database. 
          Make sure you have proper permissions and understand this action.
        </p>
      </div>

      <button
        onClick={handleSeed}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Seeding Database...' : 'Seed Database'}
      </button>

      {status && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm text-blue-800 whitespace-pre-wrap">{status}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}
    </div>
  );
}
