"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";

export default function AuthNav() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(setUser);
    return () => unsub();
  }, []);
  if (user) {
    const initial = user?.displayName?.[0] || user?.email?.[0] || "?";
    return (
      <div className="flex items-center space-x-4">
        <Link href="/profile" className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold mr-2"
            style={{ textAlign: "center", verticalAlign: "middle", fontSize: "1.25rem", lineHeight: "2rem" }}
          >
            {initial}
          </span>
          Profile
        </Link>
      </div>
    );
  }
  return (
    <div className="flex items-center space-x-4">
      <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 font-medium">
        Sign In
      </Link>
      <Link href="/auth/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
        Get Started
      </Link>
    </div>
  );
}
