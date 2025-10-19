"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import TradeInCalculator from '../../components/trade-in/TradeInCalculator';
import { auth, db } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function TradeInPage() {
  const [ownsToyota, setOwnsToyota] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setStatusMsg(null);
      if (!user) {
        setUid(null);
        setOwnsToyota(null);
        return;
      }
      setUid(user.uid);
      try {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data() as any;
          if (typeof data.ownsToyota === 'boolean') {
            setOwnsToyota(data.ownsToyota);
          }
        }
      } catch (err) {
        console.warn('Could not load user profile (Firestore offline?)', err);
        setStatusMsg('Profile not loaded (offline). You can still calculate trade-in.');
      }
    });
    return () => unsub();
  }, []);

  const saveOwnsToyota = async () => {
    if (!uid || ownsToyota === null) return;
    setSaving(true);
    setStatusMsg(null);
    try {
      const ref = doc(db, 'users', uid);
      await setDoc(
        ref,
        { ownsToyota, updatedAt: serverTimestamp() },
        { merge: true }
      );
      setStatusMsg('Saved your Toyota ownership preference.');
    } catch (err) {
      console.error('Failed to save ownsToyota', err);
      setStatusMsg('Could not save right now. Please try again later.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">🔄 Smart Trade-In</h1>
        <p className="text-lg text-gray-600">
          Get an instant estimate of your vehicle's trade-in value and see how it impacts your new purchase.
        </p>
      </div>

      {/* Toyota ownership save card (moved from Finance Fit) */}
      <div className="mb-8 bg-white rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-3">Do you currently own a Toyota?</h2>
        <p className="text-sm text-gray-600 mb-4">We’ll save this to your profile to tailor recommendations.</p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setOwnsToyota(true)}
            className={`px-4 py-2 rounded-lg border-2 ${ownsToyota === true ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => setOwnsToyota(false)}
            className={`px-4 py-2 rounded-lg border-2 ${ownsToyota === false ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
          >
            No
          </button>

          <div className="flex-1" />

          {uid ? (
            <button
              type="button"
              onClick={saveOwnsToyota}
              disabled={ownsToyota === null || saving}
              className={`px-4 py-2 rounded-lg font-medium text-white ${
                ownsToyota === null || saving ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {saving ? 'Saving…' : 'Save to Profile'}
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign in to Save
            </Link>
          )}
        </div>
        {statusMsg && <p className="text-sm text-gray-600 mt-3">{statusMsg}</p>}
      </div>

      <TradeInCalculator />

      <div className="mt-8 bg-blue-50 border border-blue-200 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-3 text-blue-900">How It Works</h3>
        <div className="space-y-3 text-sm text-blue-800">
          <div className="flex items-start gap-3">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold">
              1
            </span>
            <p>
              <strong>Enter Your Vehicle Details:</strong> Provide year, make, model, mileage, and condition.
              VIN scanning coming soon!
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold">
              2
            </span>
            <p>
              <strong>Get Instant Estimates:</strong> We'll show you trade-in value, private party value,
              and market value based on current data.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold">
              3
            </span>
            <p>
              <strong>See the Impact:</strong> Understand how your trade-in affects your down payment and
              monthly payments on a new Toyota.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold">
              4
            </span>
            <p>
              <strong>Make an Informed Decision:</strong> Compare trade-in convenience vs. private sale
              profit to choose what's best for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
