import TradeInCalculator from '@/components/trade-in/TradeInCalculator';

export default function TradeInPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">🔄 Smart Trade-In</h1>
        <p className="text-lg text-gray-600">
          Get an instant estimate of your vehicle's trade-in value and see how it impacts your new purchase.
        </p>
      </div>

      <TradeInCalculator />

      <div className="mt-8 bg-blue-50 border border-blue-200 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-3 text-blue-900">How It Works</h3>
        <div className="space-y-3 text-sm text-blue-800">
          <div className="flex items-start gap-3">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold">
              1
            </span>
            <p>
              <strong>Enter Your Vehicle Details:</strong> Provide year, make, model, mileage, and condition. 
              VIN scanning coming soon!
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold">
              2
            </span>
            <p>
              <strong>Get Instant Estimates:</strong> We'll show you trade-in value, private party value, 
              and market value based on current data.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold">
              3
            </span>
            <p>
              <strong>See the Impact:</strong> Understand how your trade-in affects your down payment and 
              monthly payments on a new Toyota.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold">
              4
            </span>
            <p>
              <strong>Make an Informed Decision:</strong> Compare trade-in convenience vs. private sale 
              profit to choose what's best for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
