'use client';

import { useState } from 'react';
import Footer from '../../components/Footer';
import ExcursionBookingFlow from '../../components/ExcursionBookingFlow';

export default function ExcursionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
     
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Book Vegas Excursions</h1>
          <ExcursionBookingFlow />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
