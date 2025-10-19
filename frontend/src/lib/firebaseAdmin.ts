import admin from 'firebase-admin';

// Use env vars for service account; replace \n in private key
const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let privateKey = process.env.FIREBASE_PRIVATE_KEY;
if (privateKey) privateKey = privateKey.replace(/\\n/g, '\n');

if (!admin.apps.length) {
  if (projectId && clientEmail && privateKey) {
    admin.initializeApp({
      credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
    });
  } else {
    // Fallback to default credentials if available
    admin.initializeApp();
  }
}

export const adminApp = admin.app();
export const adminDb = admin.firestore();
export const adminAuth = admin.auth();