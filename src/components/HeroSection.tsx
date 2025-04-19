'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const router = useRouter();
  const [input, setInput] = useState('');

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      router.push(`/search?query=${encodeURIComponent(input.trim())}`);
    }
  };

  return (
    <section className={styles.hero}>
      {/* Agent Ailure Image */}
      <div className={styles.agentAilureWrapper}>
        <Image
          src="/images/Agent_Ailure_Booker.png"
          alt="Agent Ailure Booker"
          className={styles.agentAilure}
          width={180}
          height={500}
        />
      </div>

      {/* Chat Box UI */}
      <div className={styles.chatBox}>
        <div className={styles.chatText}>
          Hiya, I'm Ailure—your personal AI travel assistant. Let's plan your next Vegas adventure.
        </div>

        {/* Text Input */}
        <form onSubmit={handleSubmit}>
        <input
         type="text"
        placeholder="Ask anything..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={styles.chatInput}
/>
        
              
       
       </form>

        {/* Pill Buttons */}
        <div className={styles.chatOptions}>
          <div className={styles.buttonGroup}>
            <button
              className={styles.pillButton}
              onClick={() => handleNavigate('/travel/plan')}
            >
              🗺️ Build Me Itinerary
            </button>
            <button
              className={styles.pillButton}
              onClick={() => handleNavigate('/hotels?family=true')}
            >
              👨‍👩‍👧‍👦 Need a Family Hotel
            </button>
            <button
              className={styles.pillButton}
              onClick={() => handleNavigate('/hotels?lux=true')}
            >
              ✨ Find a Luxurious Resort
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
