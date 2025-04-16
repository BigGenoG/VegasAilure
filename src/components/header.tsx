'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-beige py-2 px-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center">
        <button 
          className="mr-4 text-2xl bg-transparent p-0 hover:bg-transparent text-gray-700 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
        <Link href="/" className="flex items-center">
          <Image 
            src="/vegas_ailure_text_logo.png" 
            alt="Vegas Ailure" 
            width={120} 
            height={35} 
            className="h-auto"
            priority
          />
        </Link>
      </div>
      
      <nav className="hidden md:flex items-center justify-center mx-auto">
        <Link href="/hotels" className="text-gray-800 hover:text-coral-500 transition font-medium mx-3 px-4 py-2 border-r border-gray-300">Stays</Link>
        <Link href="/flights" className="text-gray-800 hover:text-coral-500 transition font-medium mx-3 px-4 py-2 border-r border-gray-300">Flights</Link>
        <Link href="/entertainment" className="text-gray-800 hover:text-coral-500 transition font-medium mx-3 px-4 py-2 border-r border-gray-300">Entertainment</Link>
        <Link href="/clubs" className="text-gray-800 hover:text-coral-500 transition font-medium mx-3 px-4 py-2 border-r border-gray-300">Clubs</Link>
        <Link href="/packages" className="text-gray-800 hover:text-coral-500 transition font-medium mx-3 px-4 py-2">Packages</Link>
      </nav>
      
      <div className="flex items-center">
        <Link href="/travel/plan" className="mr-4">
          <span className="relative">
            {/* Ace of Diamonds SVG - Enlarged and Enhanced */}
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#ff3333" stroke="#ff3333" strokeWidth="1.5" className="text-coral-500 block drop-shadow-md">
              <path d="M12 2L5 12L12 22L19 12L12 2Z" />
              <path d="M12 7L10 12L12 17L14 12L12 7Z" fill="white" />
              <text x="11" y="14" fontSize="8" fill="white" fontWeight="bold" style={{textShadow: '0px 1px 1px rgba(0,0,0,0.5) '}}>A</text>
            </svg>
            <span className="absolute -top-2 -right-2 bg-coral-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center border-2 border-white font-bold">0</span>
          </span>
        </Link>
        <Link href="/login">
          <button className="bg-coral-500 hover:bg-coral-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-md border-2 border-white transition-all transform hover:scale-105">
            Sign In
          </button>
        </Link>
      </div>
      
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-beige shadow-md md:hidden">
          <div className="flex flex-col p-4">
            <Link href="/hotels" className="py-2 text-gray-800 hover:text-coral-500">Stays</Link>
            <Link href="/flights" className="py-2 text-gray-800 hover:text-coral-500">Flights</Link>
            <Link href="/entertainment" className="py-2 text-gray-800 hover:text-coral-500">Entertainment</Link>
            <Link href="/clubs" className="py-2 text-gray-800 hover:text-coral-500">Clubs</Link>
            <Link href="/packages" className="py-2 text-gray-800 hover:text-coral-500">Packages</Link>
          </div>
        </div>
      )}
    </header>
  );
}
