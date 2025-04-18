'use client';

import Image from 'next/image';
import HomepageHero from '@/components/HomepageHero';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f3f0] flex flex-col items-center justify-center p-8 sm:p-12">
      <HomepageHero />

      {/* Add more homepage sections below as needed */}
    </div>
  );
}
