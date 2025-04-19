'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { fetchOpenAIResponse } from '../lib/openai';
import styles from './AgentChatWindow.module.css';

const pathToGreeting: Record<string, string> = {
  '/': "Ready to plan your Vegas getaway? I’ve got just the thing…",
  '/hotels': "Ah, the hunt for the perfect stay — I like your taste.",
  '/flights': "Wheels up soon? Let’s scout the skies together.",
  '/clubs': "Planning to dance the night away? I’ve got ideas…",
  '/entertainment': "Vegas shows? Only the best. Let’s dig in.",
  '/packages': "A bundled Vegas plan? We love efficiency."
};

export default function AgentChatWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hiya, I'm Agent Ailure — how can I help plan your perfect Vegas adventure today?" }
  ]);
  const [input, setInput] = useState('');
  const pathname = usePathname();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pathname) return;
    const normalizedPath = pathname.toLowerCase();
    const greetingText = messages[0].content;

    supabase.from('chat_logs').insert({
      pathname: normalizedPath,
      greeting: greetingText,
    }).then(({ error }) => {
      if (error) {
        console.error('[Agent Ailure Log Error]', error.message);
      } else {
        console.log(`[Agent Ailure Logged] ${normalizedPath}`);
      }
    });
  }, [pathname]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    try {
      const assistantReply = await fetchOpenAIResponse(newMessages);
      setMessages([...newMessages, { role: 'assistant', content: assistantReply }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
    }
  };

  return (
    <div className={styles.chatContainer}>
      {isOpen ? (
        <div className={styles.chatShell}>
          <div className={styles.chatHeader}>
            Agent Ailure
            <button
              className={styles.minimizeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Minimize chat"
            >
              🗕
            </button>
          </div>
          <div className={styles.chatMessages}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={msg.role === 'user' ? styles.userMsg : styles.assistantMsg}
              >
                {msg.content}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleSubmit} className={styles.chatInputArea}>
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={styles.inputField}
              autoFocus
            />
            <button type="submit" className={styles.sendButton}>➤</button>
          </form>
        </div>
      ) : (
        <div className={styles.minimizedBubble} onClick={() => setIsOpen(true)}>
          <Image
            src="/agent_chat_icon.png"
            alt="Agent Ailure Icon"
            width={40}
            height={40}
            className={styles.avatar}
          />
          <span className={styles.tooltip}>Click to chat</span>
        </div>
      )}
    </div>
  );
}
