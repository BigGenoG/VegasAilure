'use client';

import { useState } from 'react';
import Footer from '../../components/Footer';

export default function PackagesPage() {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  
  const packages = [
    {
      id: 1,
      name: "Weekend Getaway",
      description: "Perfect for a quick Vegas escape. Includes 2 nights at a premium hotel and show tickets.",
      price: 599,
      includes: ["2 nights hotel stay", "2 show tickets", "Airport transfers", "Welcome drink"]
    },
    {
      id: 2,
      name: "Vegas Adventure",
      description: "Experience the best of Vegas and beyond with this action-packed package.",
      price: 999,
      includes: ["3 nights hotel stay", "Grand Canyon helicopter tour", "Show tickets", "Nightclub VIP entry", "Airport transfers"]
    },
    {
      id: 3,
      name: "Luxury Escape",
      description: "Indulge in the ultimate Vegas luxury experience with premium accommodations and exclusive access.",
      price: 1499,
      includes: ["4 nights in luxury suite", "Fine dining experience", "Spa treatment", "Premium show tickets", "Private airport transfers", "24/7 concierge"]
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Vegas Vacation Packages</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {packages.map(pkg => (
              <div 
                key={pkg.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                  selectedPackage === pkg.id ? 'ring-2 ring-pink-500 transform scale-[1.02]' : 'hover:shadow-xl'
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                <div className="h-40 bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{pkg.name}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  <p className="text-3xl font-bold text-pink-600 mb-4">${pkg.price}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Includes:</h4>
                    <ul className="space-y-1">
                      {pkg.includes.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-pink-500 mr-2">✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg transition">
                    Select Package
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {selectedPackage && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Customize Your Package</h2>
              <p className="text-gray-600 mb-6">
                You've selected the {packages.find(p => p.id === selectedPackage)?.name} package. 
                Agent Ailure can help you customize this package to perfectly match your preferences.
              </p>
              
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <p className="italic text-gray-700">
                  "I can help you customize this package with additional experiences, 
                  upgrade your hotel, or adjust the dates to fit your schedule. 
                  Just let me know what you're looking for!"
                </p>
                <p className="text-right text-sm text-gray-500 mt-2">- Agent Ailure</p>
              </div>
              
              <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg transition">
                Chat with Agent Ailure
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
