import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              DriveWise
            </h1>
            <p className="text-xl md:text-2xl mb-4 opacity-90">
              Your Smart Companion for Car Financing & Ownership
            </p>
            <p className="text-lg mb-8 opacity-75 max-w-3xl mx-auto">
              Personalized financing intelligence, transparent dealer connections, and smart trade-in tools — 
              all designed to make your car buying journey effortless and informed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/finance-fit"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/dealer-connect"
                className="bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-400 transition-colors border-2 border-white/30"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Core Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Finance Fit */}
          <Link href="/finance-fit" className="group">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all h-full border-2 border-transparent hover:border-blue-500">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600">Finance Fit</h3>
              <p className="text-gray-600 text-sm">
                Personalized affordability analysis powered by Capital One's Nessie API. 
                See realistic budgets based on your actual income and spending patterns.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Smart affordability tiers
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Interactive payment simulator
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Financial improvement tips
                </li>
              </ul>
            </div>
          </Link>

          {/* Dealer Connect */}
          <Link href="/dealer-connect" className="group">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all h-full border-2 border-transparent hover:border-blue-500">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600">Dealer Connect</h3>
              <p className="text-gray-600 text-sm">
                Bridge the gap between digital and in-person. Chat with our AI assistant or 
                connect directly with verified local dealers.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Virtual dealer chatbot
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Side-by-side comparisons
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Schedule test drives
                </li>
              </ul>
            </div>
          </Link>

          {/* Smart Trade-In */}
          <Link href="/trade-in" className="group">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all h-full border-2 border-transparent hover:border-blue-500">
              <div className="text-5xl mb-4">🔄</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600">Smart Trade-In</h3>
              <p className="text-gray-600 text-sm">
                Get instant trade-in estimates using VIN scanning or manual input. 
                Compare dealer trade-in vs. private sale options.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  VIN scanning support
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Market value analysis
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Payment impact calculator
                </li>
              </ul>
            </div>
          </Link>

          {/* Ownership Companion */}
          <Link href="/ownership" className="group">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all h-full border-2 border-transparent hover:border-blue-500">
              <div className="text-5xl mb-4">🧭</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600">Ownership Companion</h3>
              <p className="text-gray-600 text-sm">
                Beyond the purchase — track maintenance, get service reminders, 
                and build long-term value with your Toyota.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Maintenance tracker
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Service reminders
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Dealer integration
                </li>
              </ul>
            </div>
          </Link>
        </div>
      </section>

      {/* User Philosophy Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Built With You in Mind</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-3">🤖↔️👤</div>
              <h3 className="font-bold mb-2">Chatbot-Optional Design</h3>
              <p className="text-sm text-gray-600">
                Toggle between conversational AI and visual dashboards anytime. Your choice, your comfort.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-bold mb-2">Transparency First</h3>
              <p className="text-sm text-gray-600">
                Every recommendation shows "why" with clear breakdowns you can trust and understand.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-bold mb-2">Educational by Design</h3>
              <p className="text-sm text-gray-600">
                Learn financial concepts naturally through tooltips, tips, and interactive examples.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Find your perfect Toyota with confidence, transparency, and personalized guidance.
          </p>
          <Link
            href="/finance-fit"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Calculate Your Budget Now
          </Link>
        </div>
      </section>
    </div>
  );
}
