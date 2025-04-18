'use client';

import { useState } from 'react';
import Footer from '../../components/Footer';

export default function ClubsPage() {
  const [selectedClub, setSelectedClub] = useState<number | null>(null);
  
  const clubs = [
    {
      id: 1,
      name: "XS Nightclub",
      description: "One of the most iconic nightclubs in Las Vegas, featuring world-class DJs and an indoor/outdoor experience.",
      image: "/images/club1.jpg",
      hours: "10:30 PM - 4:00 AM",
      location: "Encore at Wynn Las Vegas"
    },
    {
      id: 2,
      name: "Omnia",
      description: "A multi-level venue featuring an unparalleled lineup of talent with state-of-the-art technology and design.",
      image: "/images/club2.jpg",
      hours: "10:00 PM - 4:00 AM",
      location: "Caesars Palace"
    },
    {
      id: 3,
      name: "Hakkasan",
      description: "A five-level nightclub offering a diverse nightlife experience with a restaurant, lounge, and multiple dance floors.",
      image: "/images/club3.jpg",
      hours: "10:30 PM - 4:00 AM",
      location: "MGM Grand"
    }
  ];
  
  const packages = [
    { id: 1, name: "General Admission", description: "Standard entry to the club", price: 50 },
    { id: 2, name: "Express Entry", description: "Skip the line with express entry", price: 75 },
    { id: 3, name: "VIP Table", description: "Reserved table with bottle service", price: 500 },
    { id: 4, name: "Ultimate VIP", description: "Premium table with premium bottle service and dedicated host", price: 1000 }
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Vegas Nightclubs</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {clubs.map(club => (
              <div 
                key={club.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                  selectedClub === club.id ? 'ring-2 ring-pink-500 transform scale-[1.02]' : 'hover:shadow-xl'
                }`}
                onClick={() => setSelectedClub(club.id)}
              >
                <div 
                  className="h-48 bg-cover bg-center" 
                  style={{ backgroundImage: `url("${club.image}")` }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{club.name}</h3>
                  <p className="text-gray-600 mb-4">{club.description}</p>
                  <div className="text-sm text-gray-500">
                    <p><span className="font-semibold">Hours:</span> {club.hours}</p>
                    <p><span className="font-semibold">Location:</span> {club.location}</p>
                  </div>
                  <button className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg transition">
                    Select Club
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {selectedClub && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Select Your Package</h2>
              <p className="text-gray-600 mb-6">
                You've selected {clubs.find(c => c.id === selectedClub)?.name}. 
                Choose from the packages below or chat with Agent Ailure for custom arrangements.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {packages.map(pkg => (
                  <div 
                    key={pkg.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-pink-500 hover:shadow-md transition cursor-pointer"
                  >
                    <h3 className="font-bold text-lg">{pkg.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{pkg.description}</p>
                    <p className="text-xl font-semibold text-pink-600">${pkg.price}</p>
                    <button className="w-full mt-3 bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold py-1.5 rounded-lg transition">
                      Select
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <p className="italic text-gray-700">
                  "Looking for something special? I can help arrange birthday celebrations, 
                  bachelor/bachelorette parties, or custom VIP experiences at the best clubs in Vegas!"
                </p>
                <p className="text-right text-sm text-gray-500 mt-2">- Agent Ailure</p>
              </div>
              
              <div className="flex justify-between">
                <button 
                  onClick={() => setSelectedClub(null)}
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold px-6 py-3 rounded-lg transition"
                >
                  Back to Clubs
                </button>
                <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg transition">
                  Chat with Agent Ailure
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
