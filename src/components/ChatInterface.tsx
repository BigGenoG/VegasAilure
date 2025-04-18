'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hiya. I'm Agent Ailure your personal AI travel assistant, ask questions, discover, plan and book your next Vegas adventure with me.",
      sender: 'agent'
    }
  ]);
  const [inputText, setInputText] = useState('Tell me about your plans for Las Vegas so many options lets discover.');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    
    // Simulate agent response (in a real app, this would call an API)
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'd be happy to help you plan your Vegas trip! Would you like to explore hotels, shows, or restaurants first?",
        sender: 'agent'
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Agent Ailure image */}
        <div className="hidden md:block w-1/3">
          <div className="bg-gradient-to-r from-black to-pink-900 p-4 rounded-lg">
            <div className="relative w-full aspect-square">
              {/* Replace with actual Agent Ailure image */}
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center">
                <div className="text-6xl">🎭</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chat interface */}
        <div className="w-full md:w-2/3 bg-black bg-opacity-70 rounded-lg overflow-hidden">
          <div className="h-64 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`p-3 rounded-lg max-w-[80%] ${
                  message.sender === 'agent' 
                    ? 'bg-white text-black ml-0 mr-auto' 
                    : 'bg-blue-100 text-black ml-auto mr-0'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-700">
            <div className="flex">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-white bg-opacity-10 text-white border border-gray-600 rounded-l-lg px-4 py-2 focus:outline-none focus:border-pink-500"
                placeholder="Ask Agent Ailure..."
              />
              <button 
                onClick={handleSendMessage}
                className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-r-lg"
              >
                Send
              </button>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="bg-white text-black text-sm px-3 py-1 rounded-full hover:bg-gray-200">
                Build a Itinerary
              </button>
              <button className="bg-white text-black text-sm px-3 py-1 rounded-full hover:bg-gray-200">
                Need a Family Hotel
              </button>
              <button className="bg-white text-black text-sm px-3 py-1 rounded-full hover:bg-gray-200">
                Find a Lux Hotel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
