/**
 * Firebase Seeder Script
 * Run with: node --loader ts-node/esm seed-firebase.ts
 * Or with tsx: npx tsx seed-firebase.ts
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, writeBatch, getDocs, updateDoc } from 'firebase/firestore';
import { austinDealers } from '../lib/data/austinDealers';
import { mockVehicles } from '../lib/mockData/vehicles';
import { db } from '../lib/firebase';

// Firebase config - using the same config from your firebase.ts
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(app);

// Generate random stock quantity
function randomStock(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random VIN
function generateVIN(): string {
  const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';
  let vin = '';
  for (let i = 0; i < 17; i++) {
    vin += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return vin;
}

// Generate colors for vehicles
const colors = ['White', 'Black', 'Silver', 'Gray', 'Blue', 'Red', 'Midnight Black Metallic', 'Blueprint', 'Supersonic Red'];

async function seedDealerships() {
  console.log('🏢 Seeding dealerships...');
  const batch = writeBatch(firestoreDb);
  
  for (const dealer of austinDealers) {
    const dealerRef = doc(collection(firestoreDb, 'dealerships'), dealer.id);
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
  console.log(`✅ Added ${austinDealers.length} dealerships`);
}

async function seedVehicleInventory() {
  console.log('🚗 Seeding vehicle inventory...');
  
  let totalVehicles = 0;
  
  for (const dealer of austinDealers) {
    // Each dealership gets 3-6 random vehicles from the mock data
    const numVehicles = randomStock(3, 6);
    const selectedVehicles = [...mockVehicles]
      .sort(() => Math.random() - 0.5)
      .slice(0, numVehicles);
    
    for (const vehicle of selectedVehicles) {
      // Create 1-3 instances of each vehicle model (different colors/VINs)
      const instances = randomStock(1, 3);
      
      for (let i = 0; i < instances; i++) {
        const vehicleRef = doc(collection(firestoreDb, 'vehicles'));
        const color = colors[Math.floor(Math.random() * colors.length)];
        const mileage = randomStock(0, 50); // 0-50 miles for new cars
        
        await setDoc(vehicleRef, {
          dealershipId: dealer.id,
          dealershipName: dealer.name,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          trim: vehicle.description?.split(',')[0] || 'Base',
          price: (vehicle.price || 30000) + randomStock(-1000, 1000), // Small price variation
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
    
    console.log(`  ✓ Added inventory for ${dealer.name}`);
  }
  
  console.log(`✅ Added ${totalVehicles} vehicles across all dealerships`);
}

function generateWeeklyAvailability() {
  // Example: 9am-5pm Mon-Fri, 10am-2pm Sat, closed Sun
  return {
    sunday: [],
    monday: [{ start: '09:00', end: '17:00' }],
    tuesday: [{ start: '09:00', end: '17:00' }],
    wednesday: [{ start: '09:00', end: '17:00' }],
    thursday: [{ start: '09:00', end: '17:00' }],
    friday: [{ start: '09:00', end: '17:00' }],
    saturday: [{ start: '10:00', end: '14:00' }],
  };
}

async function seedDealerAvailability() {
  const snap = await getDocs(collection(firestoreDb, 'dealers'));
  for (const dealerDoc of snap.docs) {
    await updateDoc(doc(firestoreDb, 'dealers', dealerDoc.id), {
      availability: generateWeeklyAvailability(),
    });
    console.log(`Updated dealer ${dealerDoc.id} with WeeklyAvailability.`);
  }
}

async function main() {
  try {
    console.log('🚀 Starting Firebase seeding...\n');
    
    await seedDealerships();
    console.log('');
    await seedVehicleInventory();
    console.log('');
    await seedDealerAvailability();
    
    console.log('\n✨ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

main();
