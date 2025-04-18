'use client';

import { useState } from 'react';

interface FlightBookingProps {
  onComplete?: (data: any) => void;
}

export default function FlightBookingFlow({ onComplete }: FlightBookingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    origin: '',
    destination: 'Las Vegas, NV',
    departDate: '',
    returnDate: '',
    passengers: 1,
    flightClass: 'economy',
    selectedOutbound: null,
    selectedReturn: null,
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

  const handleSelectOutbound = (flight: any) => {
    setFormData(prev => ({ ...prev, selectedOutbound: flight }));
  };

  const handleSelectReturn = (flight: any) => {
    setFormData(prev => ({ ...prev, selectedReturn: flight }));
  };

  const handleSubmit = () => {
    if (onComplete) {
      onComplete(formData);
    }
    // In a real app, this would submit to an API
    alert('Flight booking submitted successfully!');
  };

  // Mock flight data
  const outboundFlights = [
    { id: 1, airline: 'Desert Air', flightNumber: 'DA1234', departure: '08:30 AM', arrival: '10:15 AM', duration: '1h 45m', price: 199 },
    { id: 2, airline: 'Vegas Express', flightNumber: 'VE789', departure: '11:45 AM', arrival: '1:30 PM', duration: '1h 45m', price: 249 },
    { id: 3, airline: 'Silver State', flightNumber: 'SS456', departure: '3:20 PM', arrival: '5:05 PM', duration: '1h 45m', price: 179 }
  ];

  const returnFlights = [
    { id: 1, airline: 'Desert Air', flightNumber: 'DA4321', departure: '09:15 AM', arrival: '11:00 AM', duration: '1h 45m', price: 219 },
    { id: 2, airline: 'Vegas Express', flightNumber: 'VE987', departure: '1:30 PM', arrival: '3:15 PM', duration: '1h 45m', price: 259 },
    { id: 3, airline: 'Silver State', flightNumber: 'SS654', departure: '6:45 PM', arrival: '8:30 PM', duration: '1h 45m', price: 189 }
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white text-black rounded-lg shadow-xl overflow-hidden">
      {/* Progress Indicator */}
      <div className="bg-gray-100 p-4">
        <div className="flex justify-between">
          <div className={`flex flex-col items-center ${step >= 1 ? 'text-pink-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-pink-600 text-white' : 'bg-gray-300'}`}>1</div>
            <span className="text-xs mt-1">Search</span>
          </div>
          <div className={`flex flex-col items-center ${step >= 2 ? 'text-pink-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-pink-600 text-white' : 'bg-gray-300'}`}>2</div>
            <span className="text-xs mt-1">Select Flights</span>
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

      {/* Step 1: Search Flights */}
      {step === 1 && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Search Flights to Vegas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <input
                type="text"
                name="origin"
                placeholder="City or airport"
                value={formData.origin}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Depart</label>
              <input
                type="date"
                name="departDate"
                value={formData.departDate}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Return</label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
              <select
                name="passengers"
                value={formData.passengers}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <select
                name="flightClass"
                value={formData.flightClass}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="economy">Economy</option>
                <option value="premium">Premium Economy</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <button 
              onClick={() => {
                if (formData.origin && formData.departDate && formData.returnDate) {
                  setStep(2);
                } else {
                  alert('Please fill in all required fields');
                }
              }}
              className="px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 font-semibold"
            >
              Search Flights
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Select Flights */}
      {step === 2 && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Select Your Flights</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Outbound: {formData.origin} to Las Vegas</h3>
            <div className="space-y-3">
              {outboundFlights.map(flight => (
                <div 
                  key={flight.id}
                  onClick={() => handleSelectOutbound(flight)}
                  className={`border ${formData.selectedOutbound?.id === flight.id ? 'border-pink-500 bg-pink-50' : 'border-gray-200'} rounded-lg p-4 cursor-pointer hover:shadow-md transition duration-300`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{flight.airline}</p>
                      <p className="text-sm text-gray-600">Flight {flight.flightNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${flight.price}</p>
                      <p className="text-sm text-gray-600">{formData.flightClass}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div>
                      <p className="text-lg font-bold">{flight.departure}</p>
                      <p className="text-sm text-gray-600">{formData.origin}</p>
                    </div>
                    <div className="flex-1 mx-4 text-center">
                      <p className="text-xs text-gray-500">{flight.duration}</p>
                      <div className="relative h-0.5 bg-gray-300 my-1">
                        <div className="absolute w-2 h-2 bg-gray-500 rounded-full -top-0.75 left-0"></div>
                        <div className="absolute w-2 h-2 bg-gray-500 rounded-full -top-0.75 right-0"></div>
                      </div>
                      <p className="text-xs text-gray-500">Direct</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{flight.arrival}</p>
                      <p className="text-sm text-gray-600">Las Vegas</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Return: Las Vegas to {formData.origin}</h3>
            <div className="space-y-3">
              {returnFlights.map(flight => (
                <div 
                  key={flight.id}
                  onClick={() => handleSelectReturn(flight)}
                  className={`border ${formData.selectedReturn?.id === flight.id ? 'border-pink-500 bg-pink-50' : 'border-gray-200'} rounded-lg p-4 cursor-pointer hover:shadow-md transition duration-300`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{flight.airline}</p>
                      <p className="text-sm text-gray-600">Flight {flight.flightNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${flight.price}</p>
                      <p className="text-sm text-gray-600">{formData.flightClass}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div>
                      <p className="text-lg font-bold">{flight.departure}</p>
                      <p className="text-sm text-gray-600">Las Vegas</p>
                    </div>
                    <div className="flex-1 mx-4 text-center">
                      <p className="text-xs text-gray-500">{flight.duration}</p>
                      <div className="relative h-0.5 bg-gray-300 my-1">
                        <div className="absolute w-2 h-2 bg-gray-500 rounded-full -top-0.75 left-0"></div>
                        <div className="absolute w-2 h-2 bg-gray-500 rounded-full -top-0.75 right-0"></div>
                      </div>
                      <p className="text-xs text-gray-500">Direct</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{flight.arrival}</p>
                      <p className="text-sm text-gray-600">{formData.origin}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button 
              onClick={() => setStep(1)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
            >
              Back
            </button>
            <button 
              onClick={() => {
                if (formData.selectedOutbound && formData.selectedReturn) {
                  setStep(3);
                } else {
                  alert('Please select both outbound and return flights');
                }
              }}
              className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Add Extras */}
      {step === 3 && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Add Travel Extras</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="earlyBoarding"
                  className="mt-1"
                  checked={(formData.addOns as string[]).includes('earlyBoarding')}
                  onChange={() => handleAddOnToggle('earlyBoarding')}
                />
                <div className="ml-3">
                  <label htmlFor="earlyBoarding" className="font-medium">Early Boarding</label>
                  <p className="text-gray-600 text-sm">Be among the first to board and secure overhead bin space.</p>
                  <p className="text-pink-600 font-semibold">$15 per person per flight</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="extraLegroom"
                  className="mt-1"
                  checked={(formData.addOns as string[]).includes('extraLegroom')}
                  onChange={() => handleAddOnToggle('extraLegroom')}
                />
                <div className="ml-3">
                  <label htmlFor="extraLegroom" className="font-medium">Extra Legroom Seats</label>
                  <p className="text-gray-600 text-sm">Enjoy more space and comfort during your flight.</p>
                  <p className="text-pink-600 font-semibold">$45 per person per flight</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="priorityBaggage"
                  className="mt-1"
                  checked={(formData.addOns as string[]).includes('priorityBaggage')}
                  onChange={() => handleAddOnToggle('priorityBaggage')}
                />
                <div className="ml-3">
                  <label htmlFor="priorityBaggage" className="font-medium">Priority Baggage Handling</label>
                  <p className="text-gray-600 text-sm">Your bags will be among the first to arrive at baggage claim.</p>
                  <p className="text-pink-600 font-semibold">$20 per person</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="travelInsurance"
                  className="mt-1"
                  checked={(formData.addOns as string[]).includes('travelInsurance')}
                  onChange={() => handleAddOnToggle('travelInsurance')}
                />
                <div className="ml-3">
                  <label htmlFor="travelInsurance" className="font-medium">Travel Insurance</label>
                  <p className="text-gray-600 text-sm">Protect your trip against cancellations, delays, and more.</p>
                  <p className="text-pink-600 font-semibold">$35 per person</p>
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
          <h2 className="text-2xl font-bold mb-4">Review Your Flight Booking</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="border-b border-gray-200 pb-3 mb-3">
              <h3 className="font-bold text-lg mb-2">Flight Details</h3>
              
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <div className="w-24 text-gray-600">Outbound:</div>
                  <div>
                    <p className="font-medium">{formData.selectedOutbound?.airline} {formData.selectedOutbound?.flightNumber}</p>
                    <p className="text-sm">{formData.origin} to Las Vegas • {formData.departDate}</p>
                    <p className="text-sm">{formData.selectedOutbound?.departure} - {formData.selectedOutbound?.arrival} ({formData.selectedOutbound?.duration})</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-24 text-gray-600">Return:</div>
                  <div>
                    <p className="font-medium">{formData.selectedReturn?.airline} {formData.selectedReturn?.flightNumber}</p>
                    <p className="text-sm">Las Vegas to {formData.origin} • {formData.returnDate}</p>
                    <p className="text-sm">{formData.selectedReturn?.departure} - {formData.selectedReturn?.arrival} ({formData.selectedReturn?.duration})</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div>
                  <p className="text-sm text-gray-600">Passengers</p>
                  <p className="font-medium">{formData.passengers} {formData.passengers === 1 ? 'Passenger' : 'Passengers'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Class</p>
                  <p className="font-medium capitalize">{formData.flightClass}</p>
                </div>
              </div>
            </div>
            
            <div className="border-b border-gray-200 pb-3 mb-3">
              <h3 className="font-bold text-lg mb-2">Price Breakdown</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p>Outbound Flight ({formData.passengers} {formData.passengers === 1 ? 'passenger' : 'passengers'})</p>
                  <p>${(formData.selectedOutbound?.price || 0) * (formData.passengers as number)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Return Flight ({formData.passengers} {formData.passengers === 1 ? 'passenger' : 'passengers'})</p>
                  <p>${(formData.selectedReturn?.price || 0) * (formData.passengers as number)}</p>
                </div>
                
                {(formData.addOns as string[]).length > 0 && (
                  <div className="pt-2">
                    <p className="font-medium mb-1">Add-ons:</p>
                    {(formData.addOns as string[]).includes('earlyBoarding') && (
                      <div className="flex justify-between text-sm pl-4">
                        <p>Early Boarding</p>
                        <p>${15 * (formData.passengers as number) * 2}</p>
                      </div>
                    )}
                    {(formData.addOns as string[]).includes('extraLegroom') && (
                      <div className="flex justify-between text-sm pl-4">
                        <p>Extra Legroom Seats</p>
                        <p>${45 * (formData.passengers as number) * 2}</p>
                      </div>
                    )}
                    {(formData.addOns as string[]).includes('priorityBaggage') && (
                      <div className="flex justify-between text-sm pl-4">
                        <p>Priority Baggage Handling</p>
                        <p>${20 * (formData.passengers as number)}</p>
                      </div>
                    )}
                    {(formData.addOns as string[]).includes('travelInsurance') && (
                      <div className="flex justify-between text-sm pl-4">
                        <p>Travel Insurance</p>
                        <p>${35 * (formData.passengers as number)}</p>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex justify-between pt-2 font-bold">
                  <p>Taxes & Fees</p>
                  <p>$78.40</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center font-bold text-lg pt-2">
              <p>Total</p>
              <p className="text-xl text-pink-600">$968.40</p>
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
