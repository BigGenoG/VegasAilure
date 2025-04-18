'use client';


import Footer from '../../../components/Footer';
import ItineraryBuilder from '../../../components/ItineraryBuilder';

export default function TravelPlannerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
    
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Build Your Vegas Itinerary</h1>
          <ItineraryBuilder />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
