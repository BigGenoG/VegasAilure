'use client';

import { useState } from 'react';
import Footer from '../../components/Footer';
import FlightBookingFlow from '../../components/FlightBookingFlow';

export default function FlightsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Book Your Flight to Vegas</h1>
          <FlightBookingFlow />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
