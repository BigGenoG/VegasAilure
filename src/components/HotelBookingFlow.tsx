'use client';

import { useState } from 'react';
import Image from 'next/image';

interface HotelBookingProps {
  onComplete?: (data: any) => void;
}

export default function HotelBookingFlow({ onComplete }: HotelBookingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    checkIn: '05/10/2024',
    checkOut: '05/12/2024',
    guests: 2,
    roomType: '',
    hotelName: '',
    price: 0,
    addOns: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOnToggle = (addOn: string) => {
    setFormData(prev => {
      const currentAddOns = [...prev.addOns] as string[];
      if (currentAddOns.includes(addOn)) {
        return { ...prev, addOns: currentAddOns.filter(item => item !== addOn) };
      } else {
        return { ...prev, addOns: [...currentAddOns, addOn] };
      }
    });
  };

  const handleSelectHotel = (hotel: { name: string; price: number }) => {
    setFormData(prev => ({
      ...prev,
      hotelName: hotel.name,
      price: hotel.price
    }));
    setStep(2);
  };

  const handleSelectRoom = (roomType: string) => {
    setFormData(prev => ({ ...prev, roomType }));
    setStep(3);
  };

  const handleSubmit = () => {
    if (onComplete) {
      onComplete(formData);
    }
    // In a real app, this would submit to an API
    alert('Booking submitted successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-black rounded-lg shadow-xl overflow-hidden">
      {/* Progress Indicator */}
      <div className="bg-gray-100 p-4">
        <div className="flex justify-between">
          <div className={`flex flex-col items-center ${step >= 1 ? 'text-pink-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-pink-600 text-white' : 'bg-gray-300'}`}>1</div>
            <span className="text-xs mt-1">Select Hotel</span>
          </div>
          <div className={`flex flex-col items-center ${step >= 2 ? 'text-pink-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-pink-600 text-white' : 'bg-gray-300'}`}>2</div>
            <span className="text-xs mt-1">Choose Room</span>
          </div>
          <div className={`flex flex-col items-center ${step >= 3 ? 'text-pink-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-pink-600 text-white' : 'bg-gray-300'}`}>3</div>
            <span className="text-xs mt-1">Add Extras</span>
          </div>
          <div className={`flex flex-col items-center ${step >= 4 ? 'text-pink-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 4 ? 'bg-pink-600 text-white' : 'bg-gray-300'}`}>4</div>
            <span className="text-xs mt-1">Confirm</span>
          </div>
        </div>
      </div>

      {/* Step 1: Select Hotel */}
      {step === 1 && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Select Your Hotel</h2>
          
          <div className="mb-4 flex flex-wrap gap-4">
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
              <input
                type="text"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
              <input
                type="text"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {/* Hotel Cards */}
            <div 
              onClick={() => handleSelectHotel({ name: 'The Stardust Palace', price: 299 })}
              className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition duration-300"
            >
              <div className="h-40 bg-cover bg-center" style={{ backgroundImage: 'url("/images/hotel1.jpg")' }} />
              <div className="p-4">
                <h3 className="font-bold text-lg">The Stardust Palace</h3>
                <p className="text-gray-600">Las Vegas Strip</p>
                <p className="text-lg font-semibold mt-2">$299/night</p>
              </div>
            </div>
            
            <div 
              onClick={() => handleSelectHotel({ name: 'Velvet Mirage', price: 199 })}
              className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition duration-300"
            >
              <div className="h-40 bg-cover bg-center" style={{ backgroundImage: 'url("/images/hotel2.jpg")' }} />
              <div className="p-4">
                <h3 className="font-bold text-lg">Velvet Mirage</h3>
                <p className="text-gray-600">Downtown Las Vegas</p>
                <p className="text-lg font-semibold mt-2">$199/night</p>
              </div>
            </div>
            
            <div 
              onClick={() => handleSelectHotel({ name: 'Royal Flamingo', price: 249 })}
              className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition duration-300"
            >
              <div className="h-40 bg-cover bg-center" style={{ backgroundImage: 'url("/images/hotel3.jpg")' }} />
              <div className="p-4">
                <h3 className="font-bold text-lg">Royal Flamingo</h3>
                <p className="text-gray-600">Paradise, NV</p>
                <p className="text-lg font-semibold mt-2">$249/night</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Choose Room */}
      {step === 2 && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Choose Your Room at {formData.hotelName}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              onClick={() => handleSelectRoom('Deluxe King')}
              className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg transition duration-300"
            >
              <h3 className="font-bold text-lg">Deluxe King</h3>
              <p className="text-gray-600">1 King Bed, City View</p>
              <ul className="mt-2 text-sm text-gray-600">
                <li>• Free WiFi</li>
                <li>• Non-smoking</li>
                <li>• 450 sq ft</li>
              </ul>
              <p className="text-lg font-semibold mt-2">${formData.price}/night</p>
            </div>
            
            <div 
              onClick={() => handleSelectRoom('Premium Double Queen')}
              className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg transition duration-300"
            >
              <h3 className="font-bold text-lg">Premium Double Queen</h3>
              <p className="text-gray-600">2 Queen Beds, Strip View</p>
              <ul className="mt-2 text-sm text-gray-600">
                <li>• Free WiFi</li>
                <li>• Non-smoking</li>
                <li>• 550 sq ft</li>
              </ul>
              <p className="text-lg font-semibold mt-2">${formData.price + 50}/night</p>
            </div>
            
            <div 
              onClick={() => handleSelectRoom('Luxury Suite')}
              className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg transition duration-300"
            >
              <h3 className="font-bold text-lg">Luxury Suite</h3>
              <p className="text-gray-600">1 King Bed, Panoramic View</p>
              <ul className="mt-2 text-sm text-gray-600">
                <li>• Free WiFi</li>
                <li>• Non-smoking</li>
                <li>• Separate living area</li>
                <li>• 850 sq ft</li>
              </ul>
              <p className="text-lg font-semibold mt-2">${formData.price + 150}/night</p>
            </div>
            
            <div 
              onClick={() => handleSelectRoom('Executive Suite')}
              className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg transition duration-300"
            >
              <h3 className="font-bold text-lg">Executive Suite</h3>
              <p className="text-gray-600">1 King Bed, Premium View</p>
              <ul className="mt-2 text-sm text-gray-600">
                <li>• Free WiFi</li>
                <li>• Non-smoking</li>
                <li>• Separate living area</li>
                <li>• Jetted tub</li>
                <li>• 1050 sq ft</li>
              </ul>
              <p className="text-lg font-semibold mt-2">${formData.price + 250}/night</p>
            </div>
          </div>
          
          <div className="mt-6">
            <button 
              onClick={() => setStep(1)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Add Extras */}
      {step === 3 && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Add Extras to Your Stay</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="breakfast"
                  className="mt-1"
                  checked={(formData.addOns as string[]).includes('breakfast')}
                  onChange={() => handleAddOnToggle('breakfast')}
                />
                <div className="ml-3">
                  <label htmlFor="breakfast" className="font-medium">Daily Breakfast Buffet</label>
                  <p className="text-gray-600 text-sm">Enjoy a full breakfast buffet each morning of your stay.</p>
                  <p className="text-pink-600 font-semibold">$35 per person per day</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="parking"
                  className="mt-1"
                  checked={(formData.addOns as string[]).includes('parking')}
                  onChange={() => handleAddOnToggle('parking')}
                />
                <div className="ml-3">
                  <label htmlFor="parking" className="font-medium">Valet Parking</label>
                  <p className="text-gray-600 text-sm">Unlimited in/out privileges during your stay.</p>
                  <p className="text-pink-600 font-semibold">$30 per day</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="spa"
                  className="mt-1"
                  checked={(formData.addOns as string[]).includes('spa')}
                  onChange={() => handleAddOnToggle('spa')}
                />
                <div className="ml-3">
                  <label htmlFor="spa" className="font-medium">Spa Credit</label>
                  <p className="text-gray-600 text-sm">$100 credit to use at our luxury spa.</p>
                  <p className="text-pink-600 font-semibold">$85</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="champagne"
                  className="mt-1"
                  checked={(formData.addOns as string[]).includes('champagne')}
                  onChange={() => handleAddOnToggle('champagne')}
                />
                <div className="ml-3">
                  <label htmlFor="champagne" className="font-medium">Champagne Welcome</label>
                  <p className="text-gray-600 text-sm">Bottle of premium champagne in your room upon arrival.</p>
                  <p className="text-pink-600 font-semibold">$75</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button 
              onClick={() => setStep(2)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
            >
              Back
            </button>
            <button 
              onClick={() => setStep(4)}
              className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
            >
              Continue to Review
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Review and Confirm */}
      {step === 4 && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Review Your Booking</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2">
              <h3 className="font-bold text-lg">{formData.hotelName}</h3>
              <button 
                onClick={() => setStep(1)}
                className="text-sm text-pink-600 hover:text-pink-800"
              >
                Change
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Check-in</p>
                <p className="font-medium">{formData.checkIn}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Check-out</p>
                <p className="font-medium">{formData.checkOut}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Room Type</p>
                <p className="font-medium">{formData.roomType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Guests</p>
                <p className="font-medium">{formData.guests}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Room Rate</p>
                <p className="font-medium">${formData.price}/night</p>
              </div>
              
              {(formData.addOns as string[]).length > 0 && (
                <div className="mt-2">
                  <p className="text-gray-600 mb-1">Add-ons:</p>
                  {(formData.addOns as string[]).includes('breakfast') && (
                    <div className="flex justify-between items-center text-sm pl-4">
                      <p>Daily Breakfast Buffet</p>
                      <p>${35 * (formData.guests as number)}/day</p>
                    </div>
                  )}
                  {(formData.addOns as string[]).includes('parking') && (
                    <div className="flex justify-between items-center text-sm pl-4">
                      <p>Valet Parking</p>
                      <p>$30/day</p>
                    </div>
                  )}
                  {(formData.addOns as string[]).includes('spa') && (
                    <div className="flex justify-between items-center text-sm pl-4">
                      <p>Spa Credit</p>
                      <p>$85</p>
                    </div>
                  )}
                  {(formData.addOns as string[]).includes('champagne') && (
                    <div className="flex justify-between items-center text-sm pl-4">
                      <p>Champagne Welcome</p>
                      <p>$75</p>
                    </div>
                  )}
                </div>
              )}
              
              <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center font-bold">
                <p>Estimated Total</p>
                <p className="text-xl text-pink-600">$1,245.00</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button 
              onClick={() => setStep(3)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
            >
              Back
            </button>
            <button 
              onClick={handleSubmit}
              className="px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 font-semibold"
            >
              Complete Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
