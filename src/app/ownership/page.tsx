import MaintenanceTracker from '@/components/ownership/MaintenanceTracker';

export default function OwnershipPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">🧭 Ownership Companion</h1>
        <p className="text-lg text-gray-600">
          Your journey doesn't end at purchase. Track maintenance, get reminders, and maximize your Toyota's value.
        </p>
      </div>

      <div className="mb-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm opacity-90 mb-1">Your Vehicle</p>
            <p className="text-2xl font-bold">2021 Toyota Camry XLE</p>
            <p className="text-sm opacity-75">VIN: 4T1B11HK9MU12345</p>
          </div>
          <div>
            <p className="text-sm opacity-90 mb-1">Purchase Date</p>
            <p className="text-2xl font-bold">March 15, 2021</p>
            <p className="text-sm opacity-75">3 years, 7 months owned</p>
          </div>
          <div>
            <p className="text-sm opacity-90 mb-1">Warranty Status</p>
            <p className="text-2xl font-bold">Active</p>
            <p className="text-sm opacity-75">Expires: March 2026</p>
          </div>
        </div>
      </div>

      <MaintenanceTracker />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">📅 Upcoming Service</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b">
              <div>
                <p className="font-semibold">Oil Change</p>
                <p className="text-sm text-gray-600">Due in 7 days</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Schedule
              </button>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <div>
                <p className="font-semibold">Tire Rotation</p>
                <p className="text-sm text-gray-600">Due in 7 days</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Schedule
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Brake Inspection</p>
                <p className="text-sm text-gray-600">Due in 35 days</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Schedule
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">💡 Ownership Tips</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>
                <strong>Maintain Service Records:</strong> Keep all receipts to increase resale value by up to 20%
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>
                <strong>Follow Scheduled Maintenance:</strong> Prevent costly repairs and extend vehicle life
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>
                <strong>Use Toyota Genuine Parts:</strong> Maintain warranty coverage and optimal performance
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>
                <strong>Track Fuel Economy:</strong> Sudden changes may indicate maintenance needs
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
