'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function HomepageHero() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <section className="bg-[#f5f3f0] py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-center gap-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-shrink-0"
      >
        <Image
          src="/images/VegasAilure_transparent_logo.png"
          alt="Agent Ailure"
          width={120}
          height={120}
          className="rounded-full shadow-lg"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-xl w-full"
      >
        <div className="bg-black text-white rounded-lg p-6 text-lg leading-relaxed shadow-md">
          Hiya. I’m Ailure your personal AI travel assistant — ask questions, discover, plan and book your next Vegas adventure with me.
        </div>

        <div className="mt-4 flex items-start gap-3">
          <Image
            src="/images/ace-diamond.png"
            alt="Ace of Diamonds"
            width={32}
            height={32}
          />
          <div className="border rounded-md p-3 w-full text-sm text-gray-800 bg-white">
            Tell me about your plans for Las Vegas. Vegas has so many options — let’s discover the perfect fit.
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handleNavigate('/travel/plan')}
            className="px-4 py-2 border border-gray-600 rounded-full hover:bg-gray-100"
          >
            Build me Itinerary
          </button>
          <button
            onClick={() => handleNavigate('/hotels?family=true')}
            className="px-4 py-2 border border-gray-600 rounded-full hover:bg-gray-100"
          >
            Need a Family Hotel
          </button>
          <button
            onClick={() => handleNavigate('/hotels?lux=true')}
            className="px-4 py-2 border border-gray-600 rounded-full hover:bg-gray-100"
          >
            Find a Luxurious Resort Hotel
          </button>
        </div>
      </motion.div>
    </section>
  );
}
