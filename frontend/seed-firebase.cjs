/**
 * Firebase Seeder Script (CommonJS version)
 * Run with: node seed-firebase.cjs
 * 
 * Make sure to set environment variables or update firebaseConfig below
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, writeBatch } = require('firebase/firestore');

// Austin dealerships data
const austinDealers = [
  {
    id: 'toyota-north-austin',
    name: 'Toyota of North Austin',
    brand: 'Toyota',
    address: '8400 Research Blvd',
    city: 'Austin',
    state: 'TX',
    zipCode: '78758',
    lat: 30.369, lon: -97.721,
    phone: '(512) 000-0000',
  },
  {
    id: 'autonation-toyota-south-austin',
    name: 'AutoNation Toyota South Austin',
    brand: 'Toyota',
    address: '4800 S I-35 Frontage Rd',
    city: 'Austin',
    state: 'TX',
    zipCode: '78745',
    lat: 30.211, lon: -97.752,
  },
  {
    id: 'round-rock-toyota',
    name: 'Round Rock Toyota',
    brand: 'Toyota',
    address: '2307 N Interstate Hwy 35',
    city: 'Round Rock',
    state: 'TX',
    zipCode: '78665',
    lat: 30.529, lon: -97.688,
  },
  {
    id: 'toyota-of-cedar-park',
    name: 'Toyota of Cedar Park',
    brand: 'Toyota',
    address: '5600 183A Frontage Rd',
    city: 'Cedar Park',
    state: 'TX',
    zipCode: '78613',
    lat: 30.506, lon: -97.830,
  },
  {
    id: 'san-marcos-toyota',
    name: 'San Marcos Toyota',
    brand: 'Toyota',
    address: '5101 S IH 35',
    city: 'San Marcos',
    state: 'TX',
    zipCode: '78666',
    lat: 29.840, lon: -97.974,
  },
  {
    id: 'lexus-of-austin',
    name: 'Lexus of Austin',
    brand: 'Lexus',
    address: '9910 Stonelake Blvd',
    city: 'Austin',
    state: 'TX',
    zipCode: '78759',
    lat: 30.390, lon: -97.737,
  },
  {
    id: 'lexus-of-lakeway',
    name: 'Lexus of Lakeway',
    brand: 'Lexus',
    address: '108 Ranch Rd 620 S',
    city: 'Lakeway',
    state: 'TX',
    zipCode: '78738',
    lat: 30.354, lon: -97.973,
  },
  {
    id: 'toyota-bastrop',
    name: 'Lost Pines Toyota',
    brand: 'Toyota',
    address: '806 TX-71 W',
    city: 'Bastrop',
    state: 'TX',
    zipCode: '78602',
    lat: 30.106, lon: -97.326,
  },
];

// Mock vehicles data
const mockVehicles = [
  { id: 1, make: 'Toyota', model: 'Corolla', year: 2024, price: 28500, description: 'XSE trim, 31 city / 40 hwy mpg, Apple CarPlay' },
  { id: 2, make: 'Toyota', model: 'Camry', year: 2024, price: 32400, description: 'SE trim, 28 city / 39 hwy mpg, Toyota Safety Sense 3.0' },
  { id: 3, make: 'Toyota', model: 'RAV4', year: 2024, price: 36800, description: 'XLE trim, 27 city / 35 hwy mpg, All-Wheel Drive' },
  { id: 4, make: 'Toyota', model: 'Highlander', year: 2024, price: 42500, description: 'LE trim, 21 city / 29 hwy mpg, 3-Row Seating' },
  { id: 5, make: 'Toyota', model: 'Prius', year: 2024, price: 33200, description: 'XLE trim, 57 city / 56 hwy mpg, Hybrid Technology' },
  { id: 6, make: 'Toyota', model: 'Tacoma', year: 2024, price: 38900, description: 'SR5 trim, 19 city / 24 hwy mpg, 4x4 Off-Road Package' },
  { id: 7, make: 'Toyota', model: 'Camry Hybrid', year: 2024, price: 30500, description: 'LE trim, 51 city / 53 hwy mpg, Hybrid Synergy Drive' },
  { id: 8, make: 'Toyota', model: 'RAV4 Prime', year: 2024, price: 45200, description: 'SE trim, 94 MPGe combined, Plug-In Hybrid' },
];

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBpo4pUlZnn2cwnJe5p8MT1am2__wnjU_0",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "drivewise-7ffef.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "drivewise-7ffef",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "drivewise-7ffef.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "114530652361",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:114530652361:web:ada5abf7ef0c3331693d18",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-HRYSZ96801"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function randomStock(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateVIN() {
  const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';
  let vin = '';
  for (let i = 0; i < 17; i++) {
    vin += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return vin;
}

const colors = ['White', 'Black', 'Silver', 'Gray', 'Blue', 'Red', 'Midnight Black Metallic', 'Blueprint', 'Supersonic Red'];

async function seedDealerships() {
  console.log('🏢 Seeding dealerships...');
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
  console.log(`✅ Added ${austinDealers.length} dealerships`);
}

async function seedVehicleInventory() {
  console.log(' Seeding vehicle inventory...');
  
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
          price: vehicle.price + randomStock(-1000, 1000),
          msrp: vehicle.price,
          mileage: mileage,
          color: color,
          vin: generateVIN(),
          category: vehicle.model.includes('Camry') || vehicle.model.includes('Corolla') ? 'sedan' :
                   vehicle.model.includes('RAV4') || vehicle.model.includes('Highlander') ? 'suv' :
                   vehicle.model.includes('Prius') ? 'hybrid' :
                   vehicle.model.includes('Tacoma') ? 'truck' : 'sedan',
          status: 'available',
          features: vehicle.description?.split(',').map(f => f.trim()) || [],
          images: ['/placeholder-vehicle.jpg'],
          createdAt: Date.now(),
        });
        
        totalVehicles++;
      }
    }
    
    console.log(`  ✓ Added inventory for ${dealer.name}`);
  }
  
  console.log(`✅ Added ${totalVehicles} vehicles across all dealerships`);
}

async function main() {
  try {
    console.log('🚀 Starting Firebase seeding...\n');
    
    await seedDealerships();
    console.log('');
    await seedVehicleInventory();
    
    console.log('\n✨ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

main();
