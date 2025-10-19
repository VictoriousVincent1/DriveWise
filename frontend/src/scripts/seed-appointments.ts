// Seed mock appointments into Firestore
import { getApps, initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';

// Reuse frontend config (copy to avoid Next import issues)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBpo4pUlZnn2cwnJe5p8MT1am2__wnjU_0",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "drivewise-7ffef.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "drivewise-7ffef",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "drivewise-7ffef.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "114530652361",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:114530652361:web:ada5abf7ef0c3331693d18",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-HRYSZ96801",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

function formatDate(d: Date) {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}
function hhmm(d: Date) {
  return d.toTimeString().slice(0,5); // HH:MM
}

async function main() {
  console.log('🗓️ Seeding mock appointments...');
  // Pick one dealer (first) and up to 2 users to seed
  const dealersSnap = await getDocs(collection(db, 'dealers'));
  if (dealersSnap.empty) {
    console.error('No dealers found. Seed dealers first.');
    return;
  }
  const dealerDoc = dealersSnap.docs[0];
  const dealerId = dealerDoc.id;
  const dealershipId = (dealerDoc.data() as any).dealershipId || 'toyota-north-austin';
  const dealershipName = (dealerDoc.data() as any).dealership || 'Toyota of North Austin';

  const usersSnap = await getDocs(collection(db, 'users'));
  if (usersSnap.empty) {
    console.error('No users found. Create a user first.');
    return;
  }
  const users = usersSnap.docs.slice(0, 2);

  const now = new Date();
  const appts = [
    { offsetDays: 1, hour: 10, minute: 0, status: 'requested' },
    { offsetDays: 2, hour: 14, minute: 30, status: 'confirmed' },
    { offsetDays: -3, hour: 11, minute: 0, status: 'completed' },
  ];

  for (let i = 0; i < appts.length; i++) {
    const meta = appts[i];
    const when = new Date(now);
    when.setDate(now.getDate() + meta.offsetDays);
    when.setHours(meta.hour, meta.minute, 0, 0);
    const uDoc = users[i % users.length];

    await addDoc(collection(db, 'appointments'), {
      userId: uDoc.id,
      dealerId,
      dealershipId,
      dealershipName,
      date: formatDate(when),
      time: hhmm(when),
      status: meta.status,
      comments: i === 0 ? 'Interested in Camry Hybrid, has trade-in.' : 'Looking for AWD SUV, flexible on colors.',
      createdAt: Timestamp.now(),
    });
  }
  console.log('✅ Mock appointments created.');
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
