'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ItineraryBuilder() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tripLength: 3,
    interests: [],
    budget: 'medium',
    travelStyle: 'balanced'
  });
  
  const [generatingItinerary, setGeneratingItinerary] = useState(false);
  const [itinerary, setItinerary] = useState<any>(null);
  
  const interests = [
    { id: 'shows', label: 'Shows & Entertainment' },
    { id: 'gambling', label: 'Gambling & Casinos' },
    { id: 'dining', label: 'Fine Dining' },
    { id: 'nightlife', label: 'Nightlife & Clubs' },
    { id: 'shopping', label: 'Shopping' },
    { id: 'sightseeing', label: 'Sightseeing' },
    { id: 'family', label: 'Family Activities' },
    { id: 'adventure', label: 'Adventure & Outdoors' },
    { id: 'relaxation', label: 'Relaxation & Spa' }
  ];
  
  const handleInterestToggle = (interestId: string) => {
    setFormData(prev => {
      const currentInterests = [...prev.interests] as string[];
      if (currentInterests.includes(interestId)) {
        return { ...prev, interests: currentInterests.filter(id => id !== interestId) };
      } else {
        return { ...prev, interests: [...currentInterests, interestId] };
      }
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const generateItinerary = () => {
    setGeneratingItinerary(true);
    
    // Simulate API call to generate itinerary
    setTimeout(() => {
      // This would be replaced with actual API response in a real app
      const mockItinerary = {
        days: [
          {
            day: 1,
            activities: [
              { 
                time: 'Morning', 
                activity: 'Breakfast at Bouchon Bistro', 
                description: 'Start your day with a delicious breakfast at this Thomas Keller restaurant in the Venetian.',
                location: 'The Venetian'
              },
              { 
                time: 'Afternoon', 
                activity: 'Explore the Strip', 
                description: 'Take a walking tour of the famous Las Vegas Strip, visiting iconic hotels and attractions.',
                location: 'Las Vegas Strip'
              },
              { 
                time: 'Evening', 
                activity: 'Cirque du Soleil Show', 
                description: 'Experience the magic of Cirque du Soleil with one of their spectacular shows.',
                location: 'Bellagio or MGM Grand'
              }
            ]
          },
          {
            day: 2,
            activities: [
              { 
                time: 'Morning', 
                activity: 'Pool Day', 
                description: 'Relax and enjoy the pool at your hotel. Many Vegas hotels have spectacular pool complexes.',
                location: 'Your Hotel'
              },
              { 
                time: 'Afternoon', 
                activity: 'Shopping at Fashion Show Mall', 
                description: 'Explore this premier shopping destination with over 250 stores and restaurants.',
                location: 'Fashion Show Mall'
              },
              { 
                time: 'Evening', 
                activity: 'Dinner and Gambling', 
                description: 'Enjoy dinner at a top restaurant followed by some time at the casino.',
                location: 'Your choice of casino'
              }
            ]
          },
          {
            day: 3,
            activities: [
              { 
                time: 'Morning', 
                activity: 'Helicopter Tour of Grand Canyon', 
                description: 'Take a breathtaking helicopter tour of the Grand Canyon, one of the natural wonders of the world.',
                location: 'Departure from Las Vegas Strip'
              },
              { 
                time: 'Afternoon', 
                activity: 'Visit the Neon Museum', 
                description: 'Explore the history of Las Vegas through its iconic neon signs.',
                location: 'Neon Museum'
              },
              { 
                time: 'Evening', 
                activity: 'Farewell Dinner at Top of the World', 
                description: 'Enjoy your last night with dinner at this revolving restaurant with spectacular views.',
                location: 'STRAT Hotel'
              }
            ]
          }
        ]
      };
      
      setItinerary(mockItinerary);
      setGeneratingItinerary(false);
      setStep(3);
    }, 3000);
  };
  
  return (
    <div className="max-w-4xl mx-auto bg-white text-black rounded-lg shadow-xl overflow-hidden">
      {/* Progress Indicator */}
      <div className="bg-gray-100 p-4">
        <div className="flex justify-between">
          <div className={`flex flex-col items-center ${step >= 1 ? 'text-pink-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-pink-600 text-white' : 'bg-gray-300'}`}>1</div>
            <span className="text-xs mt-1">Preferences</span>
          </div>
          <div className={`flex flex-col items-center ${step >= 2 ? 'text-pink-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-pink-600 text-white' : 'bg-gray-300'}`}>2</div>
            <span className="text-xs mt-1">Interests</span>
          </div>
          <div className={`flex flex-col items-center ${step >= 3 ? 'text-pink-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-pink-600 text-white' : 'bg-gray-300'}`}>3</div>
            <span className="text-xs mt-1">Your Itinerary</span>
          </div>
        </div>
      </div>

      {/* Step 1: Basic Preferences */}
      {step === 1 && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Build Your Vegas Itinerary</h2>
          <p className="text-gray-600 mb-6">
            Let Agent Ailure help you create the perfect Las Vegas itinerary based on your preferences.
          </p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How many days will you be in Vegas?
              </label>
              <select
                name="tripLength"
                value={formData.tripLength}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                {[1, 2, 3, 4, 5, 6, 7].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Day' : 'Days'}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What's your budget?
              </label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  className={`p-3 border rounded-md text-center ${
                    formData.budget === 'budget' 
                      ? 'bg-pink-100 border-pink-500' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, budget: 'budget' }))}
                >
                  <span className="block text-lg mb-1">💰</span>
                  Budget
                </button>
                <button
                  type="button"
                  className={`p-3 border rounded-md text-center ${
                    formData.budget === 'medium' 
                      ? 'bg-pink-100 border-pink-500' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, budget: 'medium' }))}
                >
                  <span className="block text-lg mb-1">💰💰</span>
                  Medium
                </button>
                <button
                  type="button"
                  className={`p-3 border rounded-md text-center ${
                    formData.budget === 'luxury' 
                      ? 'bg-pink-100 border-pink-500' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, budget: 'luxury' }))}
                >
                  <span className="block text-lg mb-1">💰💰💰</span>
                  Luxury
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What's your travel style?
              </label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  className={`p-3 border rounded-md text-center ${
                    formData.travelStyle === 'relaxed' 
                      ? 'bg-pink-100 border-pink-500' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, travelStyle: 'relaxed' }))}
                >
                  <span className="block text-lg mb-1">🌴</span>
                  Relaxed
                </button>
                <button
                  type="button"
                  className={`p-3 border rounded-md text-center ${
                    formData.travelStyle === 'balanced' 
                      ? 'bg-pink-100 border-pink-500' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, travelStyle: 'balanced' }))}
                >
                  <span className="block text-lg mb-1">⚖️</span>
                  Balanced
                </button>
                <button
                  type="button"
                  className={`p-3 border rounded-md text-center ${
                    formData.travelStyle === 'packed' 
                      ? 'bg-pink-100 border-pink-500' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, travelStyle: 'packed' }))}
                >
                  <span className="block text-lg mb-1">🏃</span>
                  Action-Packed
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <button
              onClick={() => setStep(2)}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Interests */}
      {step === 2 && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">What are you interested in?</h2>
          <p className="text-gray-600 mb-6">
            Select all the activities and experiences you're interested in for your Vegas trip.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {interests.map(interest => (
              <button
                key={interest.id}
                type="button"
                className={`p-4 border rounded-md text-center ${
                  (formData.interests as string[]).includes(interest.id) 
                    ? 'bg-pink-100 border-pink-500' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => handleInterestToggle(interest.id)}
              >
                {interest.label}
              </button>
            ))}
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
            >
              Back
            </button>
            <button
              onClick={generateItinerary}
              disabled={generatingItinerary || (formData.interests as string[]).length === 0}
              className={`px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg transition ${
                generatingItinerary || (formData.interests as string[]).length === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-pink-700'
              }`}
            >
              {generatingItinerary ? 'Generating...' : 'Create My Itinerary'}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Generated Itinerary */}
      {step === 3 && itinerary && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">Your Vegas Itinerary</h2>
          <p className="text-gray-600 mb-6">
            Here's your personalized {formData.tripLength}-day Las Vegas itinerary based on your preferences.
          </p>
          
          <div className="space-y-8 mb-8">
            {itinerary.days.map((day: any) => (
              <div key={day.day} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-pink-600 text-white p-3">
                  <h3 className="font-bold">Day {day.day}</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {day.activities.map((activity: any, index: number) => (
                    <div key={index} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-gray-500 text-sm">{activity.time}</span>
                        <span className="text-sm bg-gray-100 px-2 py-1 rounded">{activity.location}</span>
                      </div>
                      <h4 className="font-bold text-lg">{activity.activity}</h4>
                      <p className="text-gray-600">{activity.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p className="italic text-gray-700">
              "I've created this itinerary based on your preferences. Would you like me to make any adjustments or help you book any of these activities?"
            </p>
            <p className="text-right text-sm text-gray-500 mt-2">- Agent Ailure</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
            >
              Modify Preferences
            </button>
            <button
              className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition"
            >
              Save Itinerary
            </button>
            <Link href="/" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
              Book Activities
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
