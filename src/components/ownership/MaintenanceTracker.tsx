'use client';

import { useState } from 'react';
import { ServiceReminder } from '@/types';
import { getDaysUntil, formatDate } from '@/lib/utils';

export default function MaintenanceTracker() {
  const [reminders] = useState<ServiceReminder[]>([
    {
      id: '1',
      vehicleId: 'user-vehicle-1',
      type: 'Oil Change',
      dueDate: new Date(2024, 10, 25),
      dueMileage: 45000,
      priority: 'high',
      completed: false,
    },
    {
      id: '2',
      vehicleId: 'user-vehicle-1',
      type: 'Tire Rotation',
      dueDate: new Date(2024, 10, 25),
      dueMileage: 45000,
      priority: 'medium',
      completed: false,
    },
    {
      id: '3',
      vehicleId: 'user-vehicle-1',
      type: 'Brake Inspection',
      dueDate: new Date(2024, 11, 15),
      dueMileage: 50000,
      priority: 'medium',
      completed: false,
    },
    {
      id: '4',
      vehicleId: 'user-vehicle-1',
      type: 'Air Filter Replacement',
      dueDate: new Date(2025, 0, 10),
      dueMileage: 50000,
      priority: 'low',
      completed: false,
    },
  ]);

  const currentMileage = 43850;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'low':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Maintenance Tracker</h2>
          <p className="text-sm text-gray-600 mt-1">Keep your Toyota running smoothly</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Current Mileage</p>
          <p className="text-2xl font-bold">{currentMileage.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-4">
        {reminders
          .filter((r) => !r.completed)
          .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
          .map((reminder) => {
            const daysUntil = getDaysUntil(reminder.dueDate);
            const milesUntil = reminder.dueMileage - currentMileage;

            return (
              <div
                key={reminder.id}
                className={`border-2 rounded-lg p-4 ${getPriorityColor(reminder.priority)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg">{reminder.type}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full capitalize ${
                          reminder.priority === 'high'
                            ? 'bg-red-200'
                            : reminder.priority === 'medium'
                            ? 'bg-yellow-200'
                            : 'bg-blue-200'
                        }`}
                      >
                        {reminder.priority}
                      </span>
                    </div>

                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Due Date:</span>
                        <span>{formatDate(reminder.dueDate)}</span>
                        {daysUntil <= 7 && daysUntil >= 0 && (
                          <span className="text-red-600 font-semibold">
                            ({daysUntil} days)
                          </span>
                        )}
                        {daysUntil < 0 && (
                          <span className="text-red-600 font-semibold">
                            (Overdue by {Math.abs(daysUntil)} days!)
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Due Mileage:</span>
                        <span>{reminder.dueMileage.toLocaleString()} miles</span>
                        {milesUntil <= 500 && milesUntil >= 0 && (
                          <span className="text-orange-600 font-semibold">
                            ({milesUntil} miles to go)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <button className="bg-white hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium border-2 border-current transition-colors">
                      Schedule Service
                    </button>
                    <button className="text-sm hover:underline">Mark Complete</button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-lg">
          <p className="text-sm opacity-90 mb-1">Service History</p>
          <p className="text-3xl font-bold">12</p>
          <p className="text-sm opacity-75">completed services</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-lg">
          <p className="text-sm opacity-90 mb-1">Total Savings</p>
          <p className="text-3xl font-bold">$847</p>
          <p className="text-sm opacity-75">with our service plans</p>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <h3 className="font-bold text-blue-900 mb-2">💡 Pro Tip</h3>
        <p className="text-sm text-blue-800">
          Regular maintenance can extend your vehicle's life by years and improve resale value by
          up to 20%. Stay on schedule to maximize your investment!
        </p>
      </div>
    </div>
  );
}
