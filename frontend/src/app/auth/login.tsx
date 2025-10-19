"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { db } from "../../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Look up role
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data() as any;
        router.push(data.role === "dealer-employee" ? "/dealer-employee" : "/profile");
        return;
      }
      const dealerRef = doc(db, "dealers", user.uid);
      const dealerSnap = await getDoc(dealerRef);
      if (dealerSnap.exists()) {
        router.push("/dealer-employee");
        return;
      }
      // If no doc found, create a default user profile entry
      await setDoc(userRef, { email: user.email ?? "", role: "user", createdAt: Date.now() }, { merge: true });
      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      const cred = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = cred.user;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data() as any;
        router.push(data.role === "dealer-employee" ? "/dealer-employee" : "/profile");
        return;
      }
      const dealerRef = doc(db, "dealers", user.uid);
      const dealerSnap = await getDoc(dealerRef);
      if (dealerSnap.exists()) {
        router.push("/dealer-employee");
        return;
      }
      // Default new Google users to normal user profile
      await setDoc(userRef, { email: user.email ?? "", role: "user", createdAt: Date.now() }, { merge: true });
      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" className="w-full border rounded px-2 py-1" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input type="password" className="w-full border rounded px-2 py-1" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Sign In</button>
      </form>
      <button onClick={handleGoogle} className="w-full mt-4 bg-red-500 text-white py-2 rounded flex items-center justify-center gap-2">
        <span>Sign in with Google</span>
      </button>
      <p className="mt-4 text-sm text-gray-600">Don't have an account? <a href="/auth/signup" className="text-blue-600 underline">Sign up</a></p>
    </div>
  );
}
