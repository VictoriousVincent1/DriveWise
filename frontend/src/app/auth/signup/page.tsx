"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../../lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  
  // Financial data inputs
  const [creditScore, setCreditScore] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyDebt, setMonthlyDebt] = useState("");
  const [savingsBalance, setSavingsBalance] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate financial inputs
      const creditScoreNum = parseInt(creditScore);
      const monthlyIncomeNum = parseFloat(monthlyIncome);
      const monthlyDebtNum = parseFloat(monthlyDebt);
      const savingsBalanceNum = parseFloat(savingsBalance);

      if (creditScoreNum < 300 || creditScoreNum > 850) {
        throw new Error("Credit score must be between 300 and 850");
      }

      // 1. Create Firebase user
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      
      // 2. Create Nessie customer
      const nessieResponse = await fetch('http://localhost:5001/api/nessie/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          address: {
            street_number: streetNumber,
            street_name: streetName,
            city: city,
            state: state,
            zip: zip
          }
        })
      });

      if (!nessieResponse.ok) {
        throw new Error('Failed to create Nessie customer');
      }

      const nessieData = await nessieResponse.json();
      const nessieCustomerId = nessieData.objectCreated._id;

      // 3. Create a bank account with user's savings balance
      await fetch(`http://localhost:5001/api/nessie/customers/${nessieCustomerId}/accounts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Checking',
          nickname: `${firstName}'s Checking`,
          rewards: 0,
          balance: savingsBalanceNum
        })
      });

      // 4. Calculate financial metrics
      const debtToIncomeRatio = monthlyDebtNum / monthlyIncomeNum;
      
      // Max loan: 25% of monthly income for 60 months (5 years)
      const maxLoanAmount = Math.floor(monthlyIncomeNum * 0.25 * 60);
      
      // Approval likelihood based on credit score and DTI
      let approvalLikelihood = 'Low';
      if (creditScoreNum >= 700 && debtToIncomeRatio <= 0.35) {
        approvalLikelihood = 'High';
      } else if (creditScoreNum >= 650 && debtToIncomeRatio <= 0.43) {
        approvalLikelihood = 'Medium';
      }

      // 5. Save to Firebase Firestore with all financial data
      await setDoc(doc(db, "users", userCred.user.uid), {
        email: email,
        displayName: `${firstName} ${lastName}`,
        firstName: firstName,
        lastName: lastName,
        address: {
          street_number: streetNumber,
          street_name: streetName,
          city: city,
          state: state,
          zip: zip
        },
        nessieCustomerId: nessieCustomerId,
        
        // User-provided financial data
        financialData: {
          creditScore: creditScoreNum,
          monthlyIncome: monthlyIncomeNum,
          monthlyDebt: monthlyDebtNum,
          savingsBalance: savingsBalanceNum,
          debtToIncomeRatio: debtToIncomeRatio,
          approvalLikelihood: approvalLikelihood,
          maxLoanAmount: maxLoanAmount
        },
        
        profileCompleted: true,
        createdAt: new Date()
      });

      // Success! Redirect to user dashboard
      router.push("/user");
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      const cred = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = cred.user;
      const userRef = doc(db, "users", user.uid);
      const dealerRef = doc(db, "dealers", user.uid);
      if (role === "dealer-employee" || wantsDealer) {
        await setDoc(userRef, { email: user.email ?? "", role: "dealer-employee", createdAt: Date.now() }, { merge: true });
        await setDoc(dealerRef, { email: user.email ?? "", role: "dealer-employee", createdAt: Date.now() }, { merge: true });
        router.push("/dealer-employee");
        return;
      }
      const dealerSnap = await getDoc(dealerRef);
      if (dealerSnap.exists()) {
        router.push("/dealer-employee");
        return;
      }
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, { email: user.email ?? "", role: "user", createdAt: Date.now() }, { merge: true });
      }
      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 mb-16 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Create Your Account</h1>
      
      <form onSubmit={handleSignup} className="space-y-6">
        {/* Account Info */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input 
                type="email" 
                className="w-full border rounded px-3 py-2" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input 
                type="password" 
                className="w-full border rounded px-3 py-2" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">First Name</label>
              <input 
                type="text" 
                className="w-full border rounded px-3 py-2" 
                value={firstName} 
                onChange={e => setFirstName(e.target.value)} 
                required 
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Last Name</label>
              <input 
                type="text" 
                className="w-full border rounded px-3 py-2" 
                value={lastName} 
                onChange={e => setLastName(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block mb-1 font-medium">Street #</label>
              <input 
                type="text" 
                className="w-full border rounded px-3 py-2" 
                value={streetNumber} 
                onChange={e => setStreetNumber(e.target.value)} 
                placeholder="123"
                required 
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-1 font-medium">Street Name</label>
              <input 
                type="text" 
                className="w-full border rounded px-3 py-2" 
                value={streetName} 
                onChange={e => setStreetName(e.target.value)} 
                placeholder="Main St"
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block mb-1 font-medium">City</label>
              <input 
                type="text" 
                className="w-full border rounded px-3 py-2" 
                value={city} 
                onChange={e => setCity(e.target.value)} 
                placeholder="Austin"
                required 
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">State</label>
              <input 
                type="text" 
                className="w-full border rounded px-3 py-2" 
                value={state} 
                onChange={e => setState(e.target.value.toUpperCase())} 
                placeholder="TX"
                maxLength={2}
                required 
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">ZIP</label>
              <input 
                type="text" 
                className="w-full border rounded px-3 py-2" 
                value={zip} 
                onChange={e => setZip(e.target.value)} 
                placeholder="78701"
                maxLength={5}
                required 
              />
            </div>
          </div>
        </div>

        {/* Financial Information */}
        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Financial Information</h2>
          <p className="text-sm text-gray-600 mb-4">
            This helps us provide personalized financing options for your vehicle purchase.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Credit Score</label>
              <input 
                type="number" 
                className="w-full border rounded px-3 py-2" 
                value={creditScore} 
                onChange={e => setCreditScore(e.target.value)} 
                placeholder="e.g., 720"
                min="300"
                max="850"
                required 
              />
              <p className="text-xs text-gray-500 mt-1">Range: 300-850</p>
            </div>

            <div>
              <label className="block mb-1 font-medium">Monthly Income</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input 
                  type="number" 
                  className="w-full border rounded px-3 py-2 pl-6" 
                  value={monthlyIncome} 
                  onChange={e => setMonthlyIncome(e.target.value)} 
                  placeholder="e.g., 5000"
                  min="0"
                  step="0.01"
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Monthly Debt Payments</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input 
                  type="number" 
                  className="w-full border rounded px-3 py-2 pl-6" 
                  value={monthlyDebt} 
                  onChange={e => setMonthlyDebt(e.target.value)} 
                  placeholder="e.g., 800"
                  min="0"
                  step="0.01"
                  required 
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Include rent, loans, credit cards, etc.</p>
            </div>

            <div>
              <label className="block mb-1 font-medium">Savings/Checking Balance</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input 
                  type="number" 
                  className="w-full border rounded px-3 py-2 pl-6" 
                  value={savingsBalance} 
                  onChange={e => setSavingsBalance(e.target.value)} 
                  placeholder="e.g., 10000"
                  min="0"
                  step="0.01"
                  required 
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Available for down payment</p>
            </div>
          </div>
        </div>
        <div>
          <label className="block mb-1">Sign up as</label>
          <select className="w-full border rounded px-2 py-1" value={role} onChange={e => setRole(e.target.value)}>
            <option value="user">Customer/User</option>
            <option value="dealer-employee">Dealership Employee</option>
          </select>
          <div className="flex items-center gap-2 mt-2">
            <input id="wantsDealer" type="checkbox" checked={wantsDealer} onChange={e => setWantsDealer(e.target.checked)} />
            <label htmlFor="wantsDealer" className="text-sm">I work at a dealership (applies to Google sign up too)</label>
          </div>
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Sign Up</button>
      </form>

      <div className="mt-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>
      </div>

      <button 
        onClick={handleGoogle} 
        className="w-full mt-4 bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 flex items-center justify-center gap-2 transition-colors"
      >
        <span>Sign up with Google</span>
      </button>

      <p className="mt-6 text-sm text-gray-600 text-center">
        Already have an account? <a href="/auth/login" className="text-blue-600 underline hover:text-blue-800">Sign in</a>
      </p>
    </div>
  );
}
