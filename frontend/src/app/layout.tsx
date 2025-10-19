import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ToyotaPath - Your Smart Companion for Car Financing & Ownership",
  description: "Personalized financing, dealership connections, and smart trade-in tools for your next Toyota.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
        suppressHydrationWarning
      >
        <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-2xl">🚗</span>
                <span className="text-xl font-bold text-gray-900">ToyotaPath</span>
              </Link>
              

              <div className="hidden md:flex space-x-8">
                <Link href="/finance-fit" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Finance Fit
                </Link>
                <Link href="/dealer-connect" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Dealer Connect
                </Link>
                <Link href="/trade-in" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Trade-In
                </Link>
              </div>

              <AuthNav />
// --- Add this at the top ---

import AuthNav from "../components/AuthNav";

            </div>
          </div>
        </nav>

        <main>{children}</main>

        <footer className="bg-gray-900 text-white mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">ToyotaPath</h3>
                <p className="text-gray-400 text-sm">
                  Your trusted companion for smart car financing and ownership.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Features</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/finance-fit" className="hover:text-white">Finance Fit</Link></li>
                  <li><Link href="/dealer-connect" className="hover:text-white">Dealer Connect</Link></li>
                  <li><Link href="/trade-in" className="hover:text-white">Smart Trade-In</Link></li>
                  {/* <li><Link href="/ownership" className="hover:text-white">Ownership Companion</Link></li> */}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">Financial Education</a></li>
                  <li><a href="#" className="hover:text-white">FAQ</a></li>
                  <li><a href="#" className="hover:text-white">Support</a></li>
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white">Contact Us</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>© 2024 ToyotaPath. Built for Toyota Financial Services Hackathon.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
