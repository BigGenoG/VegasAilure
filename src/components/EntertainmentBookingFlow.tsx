'use client';

import { useState } from 'react';

interface EntertainmentBookingProps {
  onComplete?: (data: any) => void;
}

export default function EntertainmentBookingFlow({ onComplete }: EntertainmentBookingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 2,
    selectedShow: null,
    selectedSeating: null,
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

  const handleSelectShow = (show: any) => {
    setFormData(prev => ({ ...prev, selectedShow: show }));
    setStep(2);
  };

  const handleSelectSeating = (seating: any) => {
    setFormData(prev => ({ ...prev, selectedSeating: seating }));
    setStep(3);
  };

  const handleSubmit = () => {
    if (onComplete) {
      onComplete(formData);
    }
    // In a real app, this would submit to an API
    alert('Entertainment booking submitted successfully!');
  };

  // Mock entertainment data
  const shows = [
    { 
      id: 1, 
      name: "Cirque du Soleil: Mystère", 
      venue: "Treasure Island", 
      category: "Acrobatics",
      image: "/images/show1.jpg",
      description: "A thrilling acrobatic journey that explores the origins of life and the universe.",
      price: 129
    },
    { 
      id: 2, 
      name: "Magic Spectacular", 
      venue: "Luxor", 
      category: "Magic",
      image: "/images/show2.jpg",
      description: "Mind-bending illusions and spectacular magic tricks that will leave you amazed.",
      price: 99
    },
    { 
      id: 3, 
      name: "Vegas Headliner", 
      venue: "Caesars Palace", 
      category: "Concert",
      image: "/images/show3.jpg",
      description: "A world-class musical performance featuring chart-topping hits.",
      price: 149
    }
  ];

  const seatingOptions = [
    { id: 1, name: "General Admission", description: "Standard seating", price: 0 },
    { id: 2, name: "Premium View", description: "Enhanced viewing experience", price: 50 },
    { id: 3, name: "VIP Package", description: "Best seats with exclusive perks", price: 150 }
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white text-black rounded-lg shadow-xl overflow-hidden">
      {/* Progress Indicator */}
      <div className="bg-gray-100 p-4">
        <div className="flex justify-between">
          <div className={`flex flex-col items-center ${step >= 1 ? 'text-pink-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-pink-600 text-white' : 'bg-gray-300'}`}>1</div>
            <span className="text-xs mt-1">Select Show</span>
          </div>
          <div className={`flex flex-col items-center ${step >= 2 ? 'text-pink-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-pink-600 text-white' : 'bg-gray-300'}`}>2</div>
            <span className="text-xs mt-1">Choose Seating</span>
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

      {/* Step 1: Select Show */}
      {step === 1 && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Select a Vegas Show</h2>
          
          <div className="mb-4 flex flex-wrap gap-4">
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <select
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select a time</option>
                <option value="7:00 PM">7:00 PM</option>
                <option value="8:00 PM">8:00 PM</option>
                <option value="9:30 PM">9:30 PM</option>
              </select>
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
            {/* Show Cards */}
            {shows.map(show => (
              <div 
                key={show.id}
                onClick={() => handleSelectShow(show)}
                className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition duration-300"
              >
                <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url("${show.image}")` }} />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{show.name}</h3>
                  <p className="text-gray-600">{show.venue}</p>
                  <p className="text-sm text-gray-500 mb-2">{show.category}</p>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{show.description}</p>
                  <p className="text-lg font-semibold mt-2">From ${show.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Choose Seating */}
      {step === 2 && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Choose Your Seating for {formData.selectedShow?.name}</h2>
          
          <div className="mb-6">
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-cover bg-center rounded-lg mr-4" 
                     style={{ backgroundImage: `url("${formData.selectedShow?.image}")` }} />
                <div>
                  <h3 className="font-bold">{formData.selectedShow?.name}</h3>
                  <p className="text-sm text-gray-600">{formData.selectedShow?.venue} • {formData.date} • {formData.time}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {seatingOptions.map(option => (
                <div 
                  key={option.id}
                  onClick={() => handleSelectSeating(option)}
                  className={`border ${formData.selectedSeating?.id === option.id ? 'border-pink-500 bg-pink-50' : 'border-gray-200'} rounded-lg p-4 cursor-pointer hover:shadow-md transition duration-300`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">{option.name}</h3>
                      <p className="text-gray-600">{option.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">
                        ${(formData.selectedShow?.price || 0) + option.price}
                      </p>
                      <p className="text-sm text-gray-500">per ticket</p>
                    </div>
                  </div>
                </div>
              ))}
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
          <h2 className="text-2xl font-bold mb-4">Add Extras to Your Experience</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="vipAccess"
                  className="mt-1"
                  checked={(formData.addOns as string[]).includes('vipAccess')}
                  onChange={() => handleAddOnToggle('vipAccess')}
                />
                <div className="ml-3">
                  <label htmlFor="vipAccess" className="font-medium">VIP Access</label>
                  <p className="text-gray-600 text-sm">Skip the line and enjoy early entry to the venue.</p>
                  <p className="text-pink-600 font-semibold">$25 per person</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="drinkPackage"
                  className="mt-1"
                  checked={(formData.addOns as string[]).includes('drinkPackage')}
                  onChange={() => handleAddOnToggle('drinkPackage')}
                />
                <div className="ml-3">
                  <label htmlFor="drinkPackage" className="font-medium">Premium Drink Package</label>
                  <p className="text-gray-600 text-sm">Includes 2 premium drinks per person during the show.</p>
                  <p className="text-pink-600 font-semibold">$35 per person</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="dinnerPackage"
                  className="mt-1"
                  checked={(formData.addOns as string[]).includes('dinnerPackage')}
                  onChange={() => handleAddOnToggle('dinnerPackage')}
                />
                <div className="ml-3">
                  <label htmlFor="dinnerPackage" className="font-medium">Pre-Show Dinner</label>
                  <p className="text-gray-600 text-sm">Enjoy a 3-course dinner at a nearby restaurant before the show.</p>
                  <p className="text-pink-600 font-semibold">$75 per person</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="photoPackage"
                  className="mt-1"
                  checked={(formData.addOns as string[]).includes('photoPackage')}
                  onChange={() => handleAddOnToggle('photoPackage')}
                />
                <div className="ml-3">
                  <label htmlFor="photoPackage" className="font-medium">Souvenir Photo Package</label>
                  <p className="text-gray-600 text-sm">Receive a digital and printed photo from the show.</p>
                  <p className="text-pink-600 font-semibold">$30</p>
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
          <h2 className="text-2xl font-bold mb-4">Review Your Entertainment Booking</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2">
              <h3 className="font-bold text-lg">{formData.selectedShow?.name}</h3>
              <button 
                onClick={() => setStep(1)}
                className="text-sm text-pink-600 hover:text-pink-800"
              >
                Change
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Venue</p>
                <p className="font-medium">{formData.selectedShow?.venue}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date & Time</p>
                <p className="font-medium">{formData.date} at {formData.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Seating</p>
                <p className="font-medium">{formData.selectedSeating?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Guests</p>
                <p className="font-medium">{formData.guests}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Ticket Price</p>
                <p className="font-medium">${((formData.selectedShow?.price || 0) + (formData.selectedSeating?.price || 0)) * (formData.guests as number)}</p>
              </div>
              
              {(formData.addOns as string[]).length > 0 && (
                <div className="mt-2">
                  <p className="text-gray-600 mb-1">Add-ons:</p>
                  {(formData.addOns as string[]).includes('vipAccess') && (
                    <div className="flex justify-between items-center text-sm pl-4">
                      <p>VIP Access</p>
                      <p>${25 * (formData.guests as number)}</p>
                    </div>
                  )}
                  {(formData.addOns as string[]).includes('drinkPackage') && (
                    <div className="flex justify-between items-center text-sm pl-4">
                      <p>Premium Drink Package</p>
                      <p>${35 * (formData.guests as number)}</p>
                    </div>
                  )}
                  {(formData.addOns as string[]).includes('dinnerPackage') && (
                    <div className="flex justify-between items-center text-sm pl-4">
                      <p>Pre-Show Dinner</p>
                      <p>${75 * (formData.guests as number)}</p>
                    </div>
                  )}
                  {(formData.addOns as string[]).includes('photoPackage') && (
                    <div className="flex justify-between items-center text-sm pl-4">
                      <p>Souvenir Photo Package</p>
                      <p>$30</p>
                    </div>
                  )}
                </div>
              )}
              
              <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center font-bold">
                <p>Estimated Total</p>
                <p className="text-xl text-pink-600">$468.00</p>
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
