"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function AuthNav() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // Only return the auth buttons, NOT a full navbar
  if (loading) {
    return <div className="text-gray-400 text-sm">Loading...</div>;
  }

  if (user) {
    return (
      <div className="flex items-center space-x-4">
<<<<<<< HEAD
        <Link href="/profile" className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold mr-2"
            style={{ textAlign: "center", verticalAlign: "middle", fontSize: "1.25rem", lineHeight: "2rem" }}
          >
            {initial}
=======
        <Link
          href="/user"
          className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-3"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
            {user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "?"}
>>>>>>> fea63a6a403c7c830044ac8342b1be100e759891
          </span>
          <span>Dashboard</span>
        </Link>
        <button
          onClick={handleSignOut}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/auth/login"
        className="text-gray-700 hover:text-blue-600 font-medium"
      >
        Sign In
      </Link>
      <Link
        href="/auth/signup"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
      >
        Get Started
      </Link>
    </div>
  );
}