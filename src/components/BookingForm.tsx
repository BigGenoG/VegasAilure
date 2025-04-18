'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BookingForm() {
  const [checkInDate, setCheckInDate] = useState('05/10/2024');
  const [checkOutDate, setCheckOutDate] = useState('05/12/2024');
  const [guests, setGuests] = useState(2);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="booking-form">
        <div className="booking-form-section">
          <div className="flex flex-col">
            <label className="booking-form-label">CHECK-IN</label>
            <input
              type="text"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="booking-form-input"
            />
          </div>
        </div>
        
        <div className="booking-form-section">
          <div className="flex flex-col">
            <label className="booking-form-label">CHECK OUT</label>
            <input
              type="text"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="booking-form-input"
            />
          </div>
        </div>
        
        <div className="booking-form-section">
          <div className="flex flex-col">
            <label className="booking-form-label">GUESTS</label>
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
            >
              <span className="booking-form-input">{guests}</span>
              <span className="text-gray-500">▼</span>
            </div>
            
            {isGuestDropdownOpen && (
              <div className="absolute bg-white shadow-lg z-10 p-2 mt-2 rounded">
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <div 
                    key={num}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-black"
                    onClick={() => {
                      setGuests(num);
                      setIsGuestDropdownOpen(false);
                    }}
                  >
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="booking-form-button">
          <button>Book Now</button>
        </div>
      </div>
    </div>
  );
}
