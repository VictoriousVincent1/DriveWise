"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { getFinancialProfile, getRecommendations } from "@/lib/api";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { UserPDF } from "../../components/UserPDF";

interface FinancialProfile {
  creditScore: number;
  monthlyIncome: number;
  totalBalance: number;
  debtToIncomeRatio: number;
  approvalLikelihood: string;
  maxLoanAmount: number;
}

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  msrp: number;
  image: string;
  features: string[];
  fuelEconomy: {
    city: number;
    highway: number;
  };
  category: string;
}

interface Recommendation {
  vehicle: Vehicle;
  score: number;
  reasons: string[];
  percentOfBudget: number;
  monthlyPayment: number;
  downPayment: number;
  paymentToIncomeRatio: string;
}

export default function UserOverviewPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [financialProfile, setFinancialProfile] = useState<FinancialProfile | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRecs, setLoadingRecs] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        window.location.href = "/auth/login";
        return;
      }
      setUser(u);
      
      // Get user profile from Firestore
      const userDocRef = doc(db, "users", u.uid);
      const snap = await getDoc(userDocRef);
      const profileData = snap.exists() ? snap.data() : {};
      setProfile(profileData);
      
      // Get financial profile from Nessie if they have a nessieCustomerId
      if (profileData.nessieCustomerId) {
        try {
          // Fetch from Nessie API
          const financial = await getFinancialProfile(profileData.nessieCustomerId);
          setFinancialProfile(financial);
          
          // Get vehicle recommendations
          setLoadingRecs(true);
          const recsData = await getRecommendations(profileData.nessieCustomerId);
          const recs = recsData.recommendations || [];
          setRecommendations(recs);
          
          // ✅ SAVE TO FIREBASE
          await updateDoc(userDocRef, {
            financialProfile: {
              creditScore: financial.creditScore,
              monthlyIncome: financial.monthlyIncome,
              totalBalance: financial.totalBalance,
              debtToIncomeRatio: financial.debtToIncomeRatio,
              approvalLikelihood: financial.approvalLikelihood,
              maxLoanAmount: financial.maxLoanAmount,
              lastUpdated: serverTimestamp()
            },
            recommendations: recs.map((rec: Recommendation) => ({
              vehicleId: rec.vehicle.id,
              vehicleName: `${rec.vehicle.year} ${rec.vehicle.make} ${rec.vehicle.model}`,
              score: rec.score,
              reasons: rec.reasons,
              msrp: rec.vehicle.msrp,
              monthlyPayment: rec.monthlyPayment,
              downPayment: rec.downPayment,
              percentOfBudget: rec.percentOfBudget,
              paymentToIncomeRatio: rec.paymentToIncomeRatio
            })),
            lastRecommendationsUpdate: serverTimestamp()
          });
          
          console.log("✅ Financial data and recommendations saved to Firebase!");
        } catch (error) {
          console.error("Failed to load financial data:", error);
        } finally {
          setLoadingRecs(false);
        }
      }
      
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto pt-12 px-4">
          <div className="bg-white p-8 rounded-lg shadow">
            <div className="animate-pulse text-gray-900">Loading your dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  // PDF Download Button
  const pdfButton = (
    <PDFDownloadLink document={<UserPDF user={profile} />} fileName="user-info.pdf">
      {({ loading }) => loading ? "Generating PDF..." : "Download User PDF"}
    </PDFDownloadLink>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-6">
        {/* User Info Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            Welcome, {profile?.displayName || user?.email}!
          </h1>
          <p className="text-gray-600 text-sm">Email: {user.email}</p>
          {profile?.financialProfile?.lastUpdated && (
            <p className="text-xs text-gray-500 mt-1">
              Financial data last updated: {new Date(profile.financialProfile.lastUpdated.seconds * 1000).toLocaleString()}
            </p>
          )}
        </div>

        {/* Financial Profile Card */}
        {financialProfile && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Your Financial Profile</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="border-l-4 border-blue-500 pl-4 bg-white">
                <p className="text-sm text-gray-600">Credit Score</p>
                <p className="text-3xl font-bold text-blue-600">
                  {financialProfile.creditScore}
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4 bg-white">
                <p className="text-sm text-gray-600">Monthly Income</p>
                <p className="text-3xl font-bold text-green-600">
                  ${financialProfile.monthlyIncome.toLocaleString()}
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4 bg-white">
                <p className="text-sm text-gray-600">Total Balance</p>
                <p className="text-3xl font-bold text-purple-600">
                  ${financialProfile.totalBalance.toLocaleString()}
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4 bg-white">
                <p className="text-sm text-gray-600">Debt-to-Income</p>
                <p className="text-3xl font-bold text-orange-600">
                  {(financialProfile.debtToIncomeRatio * 100).toFixed(1)}%
                </p>
              </div>

              <div className="border-l-4 border-teal-500 pl-4 bg-white">
                <p className="text-sm text-gray-600">Approval Status</p>
                <p className="text-3xl font-bold text-teal-600">
                  {financialProfile.approvalLikelihood}
                </p>
              </div>

              <div className="border-l-4 border-indigo-500 pl-4 bg-white">
                <p className="text-sm text-gray-600">Max Loan Amount</p>
                <p className="text-3xl font-bold text-indigo-600">
                  ${financialProfile.maxLoanAmount.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="font-semibold text-blue-900">
                You're pre-approved for up to ${financialProfile.maxLoanAmount.toLocaleString()}!
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Check out our personalized recommendations below.
              </p>
            </div>
          </div>
        )}

        {/* Recommended Vehicles */}
        {loadingRecs ? (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="animate-pulse text-gray-900">Loading recommendations...</div>
          </div>
        ) : recommendations.length > 0 ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">🚗 Recommended for You</h2>
            <p className="text-gray-600 mb-6">
              Based on your financial profile, here are our top picks:
            </p>
            
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div
                  key={rec.vehicle.id}
                  className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    {/* Rank Badge */}
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-400' : 
                        index === 2 ? 'bg-amber-600' : 'bg-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                    </div>

                    {/* Vehicle Info */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {rec.vehicle.year} {rec.vehicle.make} {rec.vehicle.model}
                          </h3>
                          <p className="text-gray-600">{rec.vehicle.trim}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">
                            ${rec.vehicle.msrp.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            {rec.percentOfBudget}% of your budget
                          </p>
                        </div>
                      </div>

                      {/* Why Recommended */}
                      <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 mb-1">Why we recommend this:</p>
                        <div className="flex flex-wrap gap-2">
                          {rec.reasons.map((reason, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full border border-green-200"
                            >
                              ✓ {reason}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Payment Details */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Est. Monthly Payment</p>
                          <p className="text-lg font-bold text-gray-900">
                            ${rec.monthlyPayment.toLocaleString()}/mo
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Down Payment</p>
                          <p className="text-lg font-bold text-gray-900">
                            ${rec.downPayment.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Payment/Income</p>
                          <p className="text-lg font-bold text-gray-900">
                            {rec.paymentToIncomeRatio}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Fuel Economy</p>
                          <p className="text-lg font-bold text-gray-900">
                            {rec.vehicle.fuelEconomy.city}/{rec.vehicle.fuelEconomy.highway} mpg
                          </p>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 uppercase mb-1">Key Features:</p>
                        <div className="flex flex-wrap gap-2">
                          {rec.vehicle.features.slice(0, 4).map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="mt-4 flex gap-3">
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                          View Details
                        </button>
                        <button className="px-6 py-2 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors">
                          Compare
                        </button>
                                      <div className="mb-6">{pdfButton}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <a
                href="/dealer-connect"
                className="inline-block px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium transition-colors"
              >
                Browse All Vehicles
              </a>
            </div>
          </div>
        ) : null}

        {/* Car Preferences Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Your Car Preferences</h2>
          <p className="mb-2 text-gray-700">
            <span className="font-medium text-gray-900">What you're looking for:</span>{" "}
            {profile?.carNeeds || "—"}
          </p>
          <div>
            <span className="font-medium text-gray-900">Top Priorities:</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {(profile?.priorities || []).map((p: string) => (
                <span
                  key={p}
                  className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-sm"
                >
                  {p}
                </span>
              ))}
              {(!profile?.priorities || profile?.priorities.length === 0) && (
                <span className="text-gray-500 text-sm">No priorities set</span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/finance-fit"
              className="p-4 bg-white border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-bold text-gray-900">Check Financing</h3>
              <p className="text-sm text-gray-600">See what you can afford</p>
            </a>

            <a
              href="/dealer-connect"
              className="p-4 bg-white border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <div className="text-3xl mb-2">🤝</div>
              <h3 className="font-bold text-gray-900">Find Dealers</h3>
              <p className="text-sm text-gray-600">Connect with local dealers</p>
            </a>

            <a
              href="/trade-in"
              className="p-4 bg-white border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <div className="text-3xl mb-2">🔄</div>
              <h3 className="font-bold text-gray-900">Trade-In Value</h3>
              <p className="text-sm text-gray-600">Get your car's worth</p>
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Recent Purchases</h2>
          <p className="text-gray-500 text-sm">(None yet)</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Saved Trade-Ins / Vehicles</h2>
          <p className="text-gray-500 text-sm">(Coming soon)</p>
        </div>
      </div>
    </div>
  );
}