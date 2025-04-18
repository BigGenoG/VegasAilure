'use client';

import { useState } from 'react';

interface ExcursionBookingProps {
  onComplete?: (data: any) => void;
}

export default function ExcursionBookingFlow({ onComplete }: ExcursionBookingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 2,
    selectedExcursion: null,
    selectedPackage: null,
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

  const handleSelectExcursion = (excursion: any) => {
    setFormData(prev => ({ ...prev, selectedExcursion: excursion }));
    setStep(2);
  };

  const handleSelectPackage = (pkg: any) => {
    setFormData(prev => ({ ...prev, selectedPackage: pkg }));
    setStep(3);
  };

  const handleSubmit = () => {
    if (onComplete) {
      onComplete(formData);
    }
    // In a real app, this would submit to an API
    alert('Excursion booking submitted successfully!');
  };

  // Mock excursion data
  const excursions = [
    { 
      id: 1, 
      name: "Grand Canyon Helicopter Tour", 
      location: "Grand Canyon", 
      category: "Adventure",
      image: "/images/excursion1.jpg",
      description: "Experience breathtaking views of the Grand Canyon from the air on this unforgettable helicopter tour.",
      price: 299
    },
    { 
      id: 2, 
      name: "Hoover Dam Express Tour", 
      location: "Hoover Dam", 
      category: "Sightseeing",
      image: "/images/excursion2.jpg",
      description: "Visit one of America's greatest engineering marvels on this half-day tour from Las Vegas.",
      price: 89
    },
    { 
      id: 3, 
      name: "Red Rock Canyon Adventure", 
      location: "Red Rock Canyon", 
      category: "Outdoor",
      image: "/images/excursion3.jpg",
      description: "Explore the stunning natural beauty of Red Rock Canyon with guided hiking and rock climbing.",
      price: 129
    }
  ];

  const packageOptions = [
    { id: 1, name: "Standard Package", description: "Basic tour experience", price: 0 },
    { id: 2, name: "Deluxe Package", description: "Enhanced experience with additional features", price: 50 },
    { id: 3, name: "Ultimate Package", description: "All-inclusive premium experience", price: 100 }
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white text-black rounded-lg shadow-xl overflow-hidden">
      {/* Progress Indicator */}
      <div className="bg-gray-100 p-4">
        <div className="flex justify-between">
          <div className={`flex flex-col items-center ${step >= 1 ? 'text-pink-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-pink-600 text-white' : 'bg-gray-300'}`}>1</div>
            <span className="text-xs mt-1">Select Excursion</span>
          </div>
          <div className={`flex flex-col items-center ${step >= 2 ? 'text-pink-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-pink-600 text-white' : 'bg-gray-300'}`}>2</div>
            <span className="text-xs mt-1">Choose Package</span>
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

      {/* Step 1: Select Excursion */}
      {step === 1 && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Select a Vegas Excursion</h2>
          
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
                <option value="8:00 AM">8:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="1:00 PM">1:00 PM</option>
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
            {/* Excursion Cards */}
            {excursions.map(excursion => (
              <div 
                key={excursion.id}
                onClick={() => handleSelectExcursion(excursion)}
                className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition duration-300"
              >
                <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url("${excursion.image}")` }} />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{excursion.name}</h3>
                  <p className="text-gray-600">{excursion.location}</p>
                  <p className="text-sm text-gray-500 mb-2">{excursion.category}</p>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{excursion.description}</p>
                  <p className="text-lg font-semibold mt-2">From ${excursion.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Choose Package */}
      {step === 2 && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Choose Your Package for {formData.selectedExcursion?.name}</h2>
          
          <div className="mb-6">
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-cover bg-center rounded-lg mr-4" 
                     style={{ backgroundImage: `url("${formData.selectedExcursion?.image}")` }} />
                <div>
                  <h3 className="font-bold">{formData.selectedExcursion?.name}</h3>
                  <p className="text-sm text-gray-600">{formData.selectedExcursion?.location} • {formData.date} • {formData.time}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {packageOptions.map(option => (
                <div 
                  key={option.id}
                  onClick={() => handleSelectPackage(option)}
                  className={`border ${formData.selectedPackage?.id === option.id ? 'border-pink-500 bg-pink-50' : 'border-gray-200'} rounded-lg p-4 cursor-pointer hover:shadow-md transition duration-300`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">{option.name}</h3>
                      <p className="text-gray-600">{option.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">
                        ${(formData.selectedExcursion?.price || 0) + option.price}
                      </p>
                      <p className="text-sm text-gray-500">per person</p>
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
          <h2 className="text-2xl font-bold mb-4">Add Extras to Your Excursion</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="transportation"
                  className="mt-1"
                  checked={(formData.addOns as string[]).includes('transportation')}
                  onChange={() => handleAddOnToggle('transportation')}
                />
                <div className="ml-3">
                  <label htmlFor="transportation" className="font-medium">Luxury Transportation</label>
                  <p className="text-gray-600 text-sm">Upgrade to a luxury SUV for your round-trip transportation.</p>
                  <p className="text-pink-600 font-semibold">$45 per person</p>
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
                  <label htmlFor="photoPackage" className="font-medium">Professional Photo Package</label>
                  <p className="text-gray-600 text-sm">A professional photographer will capture your experience.</p>
                  <p className="text-pink-600 font-semibold">$65</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="mealPackage"
                  className="mt-1"
                  checked={(formData.addOns as string[]).includes('mealPackage')}
                  onChange={() => handleAddOnToggle('mealPackage')}
                />
                <div className="ml-3">
                  <label htmlFor="mealPackage" className="font-medium">Gourmet Meal Package</label>
                  <p className="text-gray-600 text-sm">Enjoy a gourmet meal during your excursion.</p>
                  <p className="text-pink-600 font-semibold">$55 per person</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="privateGuide"
                  className="mt-1"
                  checked={(formData.addOns as string[]).includes('privateGuide')}
                  onChange={() => handleAddOnToggle('privateGuide')}
                />
                <div className="ml-3">
                  <label htmlFor="privateGuide" className="font-medium">Private Guide Upgrade</label>
                  <p className="text-gray-600 text-sm">Upgrade to a private guide for a more personalized experience.</p>
                  <p className="text-pink-600 font-semibold">$120</p>
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
          <h2 className="text-2xl font-bold mb-4">Review Your Excursion Booking</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2">
              <h3 className="font-bold text-lg">{formData.selectedExcursion?.name}</h3>
              <button 
                onClick={() => setStep(1)}
                className="text-sm text-pink-600 hover:text-pink-800"
              >
                Change
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium">{formData.selectedExcursion?.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date & Time</p>
                <p className="font-medium">{formData.date} at {formData.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Package</p>
                <p className="font-medium">{formData.selectedPackage?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Guests</p>
                <p className="font-medium">{formData.guests}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Excursion Price</p>
                <p className="font-medium">${((formData.selectedExcursion?.price || 0) + (formData.selectedPackage?.price || 0)) * (formData.guests as number)}</p>
              </div>
              
              {(formData.addOns as string[]).length > 0 && (
                <div className="mt-2">
                  <p className="text-gray-600 mb-1">Add-ons:</p>
                  {(formData.addOns as string[]).includes('transportation') && (
                    <div className="flex justify-between items-center text-sm pl-4">
                      <p>Luxury Transportation</p>
                      <p>${45 * (formData.guests as number)}</p>
                    </div>
                  )}
                  {(formData.addOns as string[]).includes('photoPackage') && (
                    <div className="flex justify-between items-center text-sm pl-4">
                      <p>Professional Photo Package</p>
                      <p>$65</p>
                    </div>
                  )}
                  {(formData.addOns as string[]).includes('mealPackage') && (
                    <div className="flex justify-between items-center text-sm pl-4">
                      <p>Gourmet Meal Package</p>
                      <p>${55 * (formData.guests as number)}</p>
                    </div>
                  )}
                  {(formData.addOns as string[]).includes('privateGuide') && (
                    <div className="flex justify-between items-center text-sm pl-4">
                      <p>Private Guide Upgrade</p>
                      <p>$120</p>
                    </div>
                  )}
                </div>
              )}
              
              <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center font-bold">
                <p>Estimated Total</p>
                <p className="text-xl text-pink-600">$798.00</p>
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
