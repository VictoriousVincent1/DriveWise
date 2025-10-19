"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { createCustomer as apiCreateCustomer, createAccount as apiCreateAccount } from "../../../lib/api";
import DealerAutocomplete from "@/components/dealers/DealerAutocomplete";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "dealer">("user");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  // Dealer-only inputs
  const [dealershipId, setDealershipId] = useState("");
  const [dealershipName, setDealershipName] = useState("");
  const [dealerZip, setDealerZip] = useState("");
  const [years, setYears] = useState("");
  
  // Financial data inputs (customer only)
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
      // Validate inputs
      let creditScoreNum = 0, monthlyIncomeNum = 0, monthlyDebtNum = 0, savingsBalanceNum = 0;
      if (role === "user") {
        creditScoreNum = parseInt(creditScore);
        monthlyIncomeNum = parseFloat(monthlyIncome);
        monthlyDebtNum = parseFloat(monthlyDebt);
        savingsBalanceNum = parseFloat(savingsBalance);
        if (creditScoreNum < 300 || creditScoreNum > 850) {
          throw new Error("Credit score must be between 300 and 850");
        }
      }

      // 1. Create Firebase user
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      
      let nessieCustomerId: string | null = null;
      if (role === "user") {
        // 2. Create Nessie customer via backend API helper (respects NEXT_PUBLIC_API_URL)
        const nessieData = await apiCreateCustomer({
          first_name: firstName,
          last_name: lastName,
          address: {
            street_number: streetNumber,
            street_name: streetName,
            city: city,
            state: state,
            zip: zip
          }
        });
        // Handle both possible response shapes
        nessieCustomerId = (nessieData && (nessieData.objectCreated?._id || nessieData._id || nessieData.id)) as string;
        if (!nessieCustomerId) {
          throw new Error("Failed to retrieve Nessie customer ID");
        }
        // 3. Create a bank account with user's savings balance using API helper
        await apiCreateAccount(nessieCustomerId, {
          type: 'Checking',
          nickname: `${firstName}'s Checking`,
          rewards: 0,
          balance: savingsBalanceNum
        });
      }

      // 4. Calculate financial metrics (customer only)
      let debtToIncomeRatio = 0;
      let maxLoanAmount = 0;
      let approvalLikelihood: 'Low' | 'Medium' | 'High' = 'Low';
      if (role === 'user') {
        debtToIncomeRatio = monthlyDebtNum / monthlyIncomeNum;
        maxLoanAmount = Math.floor(monthlyIncomeNum * 0.25 * 60);
        if (creditScoreNum >= 700 && debtToIncomeRatio <= 0.35) {
          approvalLikelihood = 'High';
        } else if (creditScoreNum >= 650 && debtToIncomeRatio <= 0.43) {
          approvalLikelihood = 'Medium';
        }
      }

      if (role === 'dealer') {
        // Save minimal user entry with role for completeness
        await setDoc(doc(db, 'users', userCred.user.uid), {
          email,
          displayName: `${firstName} ${lastName}`,
          role: 'dealer-employee',
          createdAt: new Date()
        }, { merge: true });
        // Create dealer record
        await setDoc(doc(db, 'dealers', userCred.user.uid), {
          displayName: `${firstName} ${lastName}`,
          email,
          dealership: dealershipName,
          dealershipId,
          dealerZip,
          years,
          availability: {},
          createdAt: Date.now()
        }, { merge: true });
      } else {
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
          role: 'user',
          profileCompleted: true,
          createdAt: new Date()
        });
      }

  // Success! Redirect to proper dashboard
  router.push(role === 'dealer' ? "/dealer-employee" : "/user");
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
      const userCred = await signInWithPopup(auth, new GoogleAuthProvider());
      const { getDoc, doc } = await import("firebase/firestore");
      const { db } = await import("../../../lib/firebase");
      const snap = await getDoc(doc(db, "users", userCred.user.uid));
      
      if (snap.exists() && snap.data()?.profileCompleted) {
        router.push("/user");
      } else {
        router.push("/profile");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Create Your Account</h1>
        <div className="mb-6 flex items-center gap-2">
          <span className="text-sm text-gray-700">I am signing up as:</span>
          <button
            type="button"
            onClick={() => setRole('user')}
            className={`px-3 py-1 rounded-full text-sm border ${role === 'user' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}
          >
            Customer
          </button>
          <button
            type="button"
            onClick={() => setRole('dealer')}
            className={`px-3 py-1 rounded-full text-sm border ${role === 'dealer' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}
          >
            Dealer Employee
          </button>
        </div>
        
        <form onSubmit={handleSignup} className="space-y-6">
          {/* Account Info */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-900">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-900">Email</label>
                <input 
                  type="email" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">Password</label>
                <input 
                  type="password" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-900">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-900">First Name</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={firstName} 
                  onChange={e => setFirstName(e.target.value)} 
                  required 
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">Last Name</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={lastName} 
                  onChange={e => setLastName(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block mb-1 font-medium text-gray-900">Street #</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={streetNumber} 
                  onChange={e => setStreetNumber(e.target.value)} 
                  placeholder="123"
                  required 
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-1 font-medium text-gray-900">Street Name</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={streetName} 
                  onChange={e => setStreetName(e.target.value)} 
                  placeholder="Main St"
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block mb-1 font-medium text-gray-900">City</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={city} 
                  onChange={e => setCity(e.target.value)} 
                  placeholder="Austin"
                  required 
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">State</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={state} 
                  onChange={e => setState(e.target.value.toUpperCase())} 
                  placeholder="TX"
                  maxLength={2}
                  required 
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">ZIP</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={zip} 
                  onChange={e => setZip(e.target.value)} 
                  placeholder="78701"
                  maxLength={5}
                  required 
                />
              </div>
            </div>
          </div>

          {/* Conditional Section */}
          {role === 'dealer' ? (
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Dealer Employee Information</h2>
              <div className="mb-4">
                <DealerAutocomplete
                  value={dealershipId}
                  onChange={(id, meta) => {
                    setDealershipId(id || "");
                    setDealershipName(meta?.name || "");
                    setDealerZip(meta?.zipCode || "");
                  }}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-gray-900">Years of Experience</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={years}
                    onChange={e => setYears(e.target.value)}
                    placeholder="e.g., 5"
                    min="0"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">You'll be able to set your weekly availability after signup.</p>
            </div>
          ) : (
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Financial Information</h2>
              <p className="text-sm text-gray-600 mb-4">
                This helps us provide personalized financing options for your vehicle purchase.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-gray-900">Credit Score</label>
                  <input 
                    type="number" 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
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
                  <label className="block mb-1 font-medium text-gray-900">Monthly Income</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input 
                      type="number" 
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 pl-6 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
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
                  <label className="block mb-1 font-medium text-gray-900">Monthly Debt Payments</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input 
                      type="number" 
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 pl-6 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
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
                  <label className="block mb-1 font-medium text-gray-900">Savings/Checking Balance</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <input 
                      type="number" 
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 pl-6 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
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
          )}

          {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>}
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
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
          className="w-full mt-4 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <span>Sign up with Google</span>
        </button>

        <p className="mt-6 text-sm text-gray-600 text-center">
          Already have an account? <a href="/auth/login" className="text-blue-600 underline hover:text-blue-800 font-medium">Sign in</a>
        </p>
      </div>
    </div>
  );
}