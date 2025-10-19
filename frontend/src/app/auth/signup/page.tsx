"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // New users always go to profile to complete setup
      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      const userCred = await signInWithPopup(auth, new GoogleAuthProvider());
      // Check if user has completed profile setup
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
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" className="w-full border rounded px-2 py-1" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input type="password" className="w-full border rounded px-2 py-1" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Sign Up</button>
      </form>
      <button onClick={handleGoogle} className="w-full mt-4 bg-red-500 text-white py-2 rounded flex items-center justify-center gap-2">
        <span>Sign up with Google</span>
      </button>
      <p className="mt-4 text-sm text-gray-600">Already have an account? <a href="/auth/login" className="text-blue-600 underline">Sign in</a></p>
    </div>
  );
}
