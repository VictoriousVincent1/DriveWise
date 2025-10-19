"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState<"user" | "dealer">("user");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    console.log("Attempting login with:", email);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful, user:", userCred.user.uid);

      // Dealer flow or user flow based on selection
      const { getDoc, doc } = await import("firebase/firestore");
      const { db } = await import("../../../lib/firebase");

      if (role === "dealer") {
        // Verify dealer employee membership
        const dealerDoc = await getDoc(doc(db, "dealers", userCred.user.uid));
        if (dealerDoc.exists()) {
          router.push("/dealer-employee");
          return;
        }
        setError("This account is not registered as a dealer employee.");
        return;
      }

      // USER: check if profile is complete
      try {
        const snap = await getDoc(doc(db, "users", userCred.user.uid));
        console.log("Profile data:", snap.exists() ? snap.data() : "No profile found");
        if (snap.exists() && snap.data()?.profileCompleted) {
          router.push("/user");
        } else {
          router.push("/profile");
        }
      } catch (firestoreErr: any) {
        console.warn("Firestore check failed (offline?), defaulting to /profile:", firestoreErr.message);
        router.push("/profile");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      const userCred = await signInWithPopup(auth, new GoogleAuthProvider());
      const { getDoc, doc } = await import("firebase/firestore");
      const { db } = await import("../../../lib/firebase");

      if (role === "dealer") {
        const dealerDoc = await getDoc(doc(db, "dealers", userCred.user.uid));
        if (dealerDoc.exists()) {
          router.push("/dealer-employee");
          return;
        }
        setError("This account is not registered as a dealer employee.");
        return;
      }

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 text-center">Sign In to DriveWise</h1>
        <div className="mb-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setRole("user")}
            className={`px-3 py-1 rounded-full text-sm border ${role === 'user' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}
            aria-pressed={role === 'user'}
          >
            Customer
          </button>
          <button
            type="button"
            onClick={() => setRole("dealer")}
            className={`px-3 py-1 rounded-full text-sm border ${role === 'dealer' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}
            aria-pressed={role === 'dealer'}
          >
            Dealer Employee
          </button>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <button 
          onClick={handleGoogle} 
          className="w-full mt-4 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign in with Google
        </button>
        
        <div className="mt-6 text-sm text-gray-600 text-center">
          <p>
            Don't have an account?{" "}
            <a href="/auth/signup" className="text-blue-600 hover:text-blue-700 underline font-medium">
              Sign up
            </a>
          </p>
          <p className="mt-2 text-gray-500">Dealer employees can select "Dealer Employee" above before signing in.</p>
        </div>
      </div>
    </div>
  );
}