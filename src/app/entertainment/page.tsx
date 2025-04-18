'use client';

import { useState } from 'react';
import Footer from '../../components/Footer';
import EntertainmentBookingFlow from '../../components/EntertainmentBookingFlow';

export default function EntertainmentPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
     
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Book Vegas Entertainment</h1>
          <EntertainmentBookingFlow />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
