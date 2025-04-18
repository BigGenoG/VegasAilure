'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
}

export default function AilureChat() {
  const [inputText, setInputText] = useState('');
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: 'intro',
    text: "Hiya. I'm Agent Ailure — your personal AI travel investigator. Ready to uncover the perfect Vegas plan?",
    sender: 'agent',
  }]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handlePromptClick = (text: string) => {
    setMessages([...messages, { id: Date.now().toString(), text, sender: 'user' }]);
    setInputText('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-xl rounded-lg max-w-sm w-[350px] p-4 border border-gray-300"
          >
            <div className="flex items-center mb-3">
              <Image
                src="/images/VegasAilure_transparent_logo.png"
                alt="Agent Ailure"
                width={50}
                height={50}
                className="mr-3 rounded-full"
              />
              <span className="font-bold text-gray-800">Agent Ailure</span>
            </div>

            <div className="space-y-2">
              {messages.map(msg => (
                <div key={msg.id} className={`text-sm ${msg.sender === 'agent' ? 'text-gray-700' : 'text-right text-pink-600'}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2">
              <button onClick={() => handlePromptClick('🎉 Show me epic pool parties')} className="text-left bg-gray-100 hover:bg-gray-200 text-sm p-2 rounded">
                🎉 Show me epic pool parties
              </button>
              <button onClick={() => handlePromptClick('🎟️ Find me a show')} className="text-left bg-gray-100 hover:bg-gray-200 text-sm p-2 rounded">
                🎟️ Find me a show
              </button>
              <button onClick={() => handlePromptClick('🛏️ Recommend hotels')} className="text-left bg-gray-100 hover:bg-gray-200 text-sm p-2 rounded">
                🛏️ Recommend hotels
              </button>
            </div>

            <div className="mt-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 text-sm"
                placeholder="Ask me anything..."
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
