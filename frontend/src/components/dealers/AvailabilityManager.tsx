"use client";
import { useState } from 'react';

export type TimeSlot = {
  start: string; // e.g. "09:00"
  end: string;   // e.g. "17:00"
};

export type WeeklyAvailability = {
  monday?: TimeSlot[];
  tuesday?: TimeSlot[];
  wednesday?: TimeSlot[];
  thursday?: TimeSlot[];
  friday?: TimeSlot[];
  saturday?: TimeSlot[];
  sunday?: TimeSlot[];
};

type Props = {
  availability: WeeklyAvailability;
  onChange: (avail: WeeklyAvailability) => void;
};

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
const DAY_LABELS: Record<typeof DAYS[number], string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

export default function AvailabilityManager({ availability, onChange }: Props) {
  const [editDay, setEditDay] = useState<typeof DAYS[number] | null>(null);
  const [tempStart, setTempStart] = useState('09:00');
  const [tempEnd, setTempEnd] = useState('17:00');

  const addSlot = (day: typeof DAYS[number]) => {
    const existing = availability[day] || [];
    onChange({ ...availability, [day]: [...existing, { start: tempStart, end: tempEnd }] });
    setEditDay(null);
  };

  const removeSlot = (day: typeof DAYS[number], idx: number) => {
    const existing = availability[day] || [];
    onChange({ ...availability, [day]: existing.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Weekly Availability</h3>
      <p className="text-sm text-gray-600">Set your working hours for each day of the week.</p>
      {DAYS.map((day) => {
        const slots = availability[day] || [];
        return (
          <div key={day} className="border rounded p-3 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{DAY_LABELS[day]}</span>
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
                onClick={() => setEditDay(day)}
              >
                + Add Slot
              </button>
            </div>
            {slots.length === 0 ? (
              <div className="text-xs text-gray-500">No availability</div>
            ) : (
              <div className="space-y-1">
                {slots.map((slot, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span>{slot.start} - {slot.end}</span>
                    <button
                      type="button"
                      className="text-red-600 hover:underline text-xs"
                      onClick={() => removeSlot(day, idx)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
            {editDay === day && (
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="time"
                  className="border rounded px-2 py-1 text-sm"
                  value={tempStart}
                  onChange={e => setTempStart(e.target.value)}
                />
                <span className="text-sm">to</span>
                <input
                  type="time"
                  className="border rounded px-2 py-1 text-sm"
                  value={tempEnd}
                  onChange={e => setTempEnd(e.target.value)}
                />
                <button
                  type="button"
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  onClick={() => addSlot(day)}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm"
                  onClick={() => setEditDay(null)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
