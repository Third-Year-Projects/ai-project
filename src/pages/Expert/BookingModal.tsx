import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import type { Service } from '../../types/interfaces/Services';
import type { Expert } from '../../types/interfaces/Expert';
import type { BookingModalProps } from '../../types/interfaces/BookingModalProps';
import toast from 'react-hot-toast';

export default function BookingModal({ service, expert, onClose }: BookingModalProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // API call to create booking
      toast.success('Booking request sent successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to send booking request');
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
          <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4">
            Book Service: {service.title}
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2 border rounded-md"
                rows={3}
                placeholder="Any specific requirements..."
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#468847] text-white rounded-md hover:bg-[#3a7139]"
              >
                Send Request
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}