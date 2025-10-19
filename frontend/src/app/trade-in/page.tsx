"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import TradeInCalculator from '../../components/trade-in/TradeInCalculator';
import { calculateMonthlyPayment, formatCurrency } from '../../lib/utils';
import { calculateAffordability } from '../../lib/mockData/banking';
import { auth, db } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function TradeInPage() {
  const [loanPrice, setLoanPrice] = useState(35000);
  const [loanTerm, setLoanTerm] = useState(60);
  const [apr, setApr] = useState(6.5);
  const [creditScore, setCreditScore] = useState(720);
  const [affordability, setAffordability] = useState<any|null>(null);
  const [lastEstimate, setLastEstimate] = useState<any|null>(null);
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

  // Fetch affordability from Nessie (mock) whenever credit score changes
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const data = await calculateAffordability('acc_123456789', creditScore);
        if (isMounted) setAffordability(data);
      } catch (e) {
        // ignore for now
      }
    })();
    return () => { isMounted = false; };
  }, [creditScore]);

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

      <TradeInCalculator onResult={(est) => setLastEstimate(est)} />

      {/* Quick Loan Impact using Trade-In */}
      {lastEstimate && (
        <div className="mt-8 bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Loan Impact with Trade-In</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Vehicle Price: {formatCurrency(loanPrice)}</label>
              <input type="range" min={15000} max={80000} step={500} value={loanPrice} onChange={e=>setLoanPrice(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Term: {loanTerm} months</label>
              <input type="range" min={24} max={84} step={12} value={loanTerm} onChange={e=>setLoanTerm(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">APR: {apr}%</label>
              <input type="range" min={1.9} max={15} step={0.1} value={apr} onChange={e=>setApr(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Credit Score: {creditScore}</label>
              <input type="range" min={500} max={850} step={10} value={creditScore} onChange={e=>setCreditScore(Number(e.target.value))} className="w-full" />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <span className="text-sm text-gray-600">Trade-In Value</span>
              <div className="text-2xl font-bold text-green-700">{formatCurrency(lastEstimate.tradeInValue ?? 0)}</div>
            </div>
            <div>
              <span className="text-sm text-gray-600">Down Payment (Trade-In Applied)</span>
              <div className="text-xl font-bold">{formatCurrency(lastEstimate.tradeInValue ?? 0)}</div>
            </div>
            <div>
              <span className="text-sm text-gray-600">Estimated Monthly Payment</span>
              <div className="text-2xl font-bold text-blue-600">{
                formatCurrency(
                  calculateMonthlyPayment(Math.max(loanPrice - (lastEstimate.tradeInValue ?? 0), 0), apr, loanTerm)
                )
              }</div>
            </div>
            {affordability && (
              <div>
                <span className="text-sm text-gray-600">Recommended Budget (Nessie)</span>
                <div className="text-xl font-bold">
                  {formatCurrency(affordability.recommended.monthlyBudget)}
                </div>
              </div>
            )}
          </div>
          {affordability && (
            <div className="mt-6 p-4 rounded-lg border" style={{
              borderColor: (() => {
                const payment = calculateMonthlyPayment(Math.max(loanPrice - (lastEstimate.tradeInValue ?? 0), 0), apr, loanTerm);
                return payment <= affordability.recommended.monthlyBudget ? '#16a34a' : '#dc2626';
              })()
            }}>
              {(() => {
                const payment = calculateMonthlyPayment(Math.max(loanPrice - (lastEstimate.tradeInValue ?? 0), 0), apr, loanTerm);
                const diff = affordability.recommended.monthlyBudget - payment;
                const within = diff >= 0;
                return (
                  <div className="text-sm">
                    <div className={`font-semibold ${within ? 'text-green-700' : 'text-red-700'}`}>
                      {within ? 'Within recommended budget' : 'Over recommended budget'}
                    </div>
                    <div className="text-gray-700">
                      {within ? `You have ${formatCurrency(diff)} of headroom.` : `Over by ${formatCurrency(Math.abs(diff))}. Consider lowering price or extending term.`}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
          {affordability && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
              <div>
                <div className="text-gray-500">Max Loan (Nessie recommended)</div>
                <div className="font-semibold">{formatCurrency(affordability.recommended.maxLoanAmount)}</div>
              </div>
              <div>
                <div className="text-gray-500">Current Loan Amount</div>
                <div className="font-semibold">{formatCurrency(Math.max(loanPrice - (lastEstimate.tradeInValue ?? 0), 0))}</div>
              </div>
              <div>
                <div className="text-gray-500">Suggested Down Payment</div>
                <div className="font-semibold">{formatCurrency(affordability.recommended.downPayment)}</div>
              </div>
            </div>
          )}
        </div>
      )}

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
