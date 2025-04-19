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
    <section className="bg-black py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-center gap-12 text-white">
      
      {/* Agent Ailure Image */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-shrink-0"
      >
        <Image
          src="/agent-ailure-neon.png" // Updated to neon image
          alt="Agent Ailure"
          width={160}
          height={360}
          className="h-auto w-auto"
        />
      </motion.div>

      {/* Right-side Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-xl w-full"
      >
        <div className="bg-zinc-900 text-white rounded-lg p-6 text-lg leading-relaxed shadow-md border border-zinc-700">
          Hiya. I’m Ailure — your personal AI travel assistant. Ask questions, discover, plan and book your next Vegas adventure with me.
        </div>

        <div className="mt-4 flex items-start gap-3">
          <Image
            src="/images/ace-diamond.png"
            alt="Ace of Diamonds"
            width={32}
            height={32}
          />
          <div className="border rounded-md p-3 w-full text-sm text-black bg-white">
            Tell me about your plans for Las Vegas. There are so many options — let’s find the perfect fit.
          </div>
        </div>

        {/* CTA Buttons in one horizontal row */}
        <div className="mt-6 flex flex-wrap sm:flex-nowrap justify-center sm:justify-start gap-4">
          <button
            onClick={() => handleNavigate('/travel/plan')}
            className="bg-black border border-cyan-400 text-white px-6 py-2 rounded-full hover:bg-cyan-400 hover:text-black transition"
          >
            🎯 Build Me Itinerary
          </button>
          <button
            onClick={() => handleNavigate('/hotels?family=true')}
            className="bg-black border border-yellow-400 text-white px-6 py-2 rounded-full hover:bg-yellow-400 hover:text-black transition"
          >
            👨‍👩‍👧‍👦 Family Hotel
          </button>
          <button
            onClick={() => handleNavigate('/hotels?lux=true')}
            className="bg-black border border-pink-400 text-white px-6 py-2 rounded-full hover:bg-pink-400 hover:text-black transition"
          >
            🌟 Luxury Resort
          </button>
        </div>
      </motion.div>
    </section>
  );
}

