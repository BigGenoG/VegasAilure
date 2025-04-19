import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
// import AilureChat from '@/components/AilureChat';
import AgentChatWindow from '../components/AgentChatWindow'; // ← if you’re not using @/ yet

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vegas Ailure',
  description: 'Your personal AI travel assistant for Las Vegas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Header />
        {children}
       
        <AgentChatWindow />
      </body>
    </html>
  );
}
