// app/page.tsx
import Features from '@/components/features';
import '@/styles/globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Multifix Onchain Rectification protocol',
  description: 'Multifix Onchain Rectification protocol',
}


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Features />
    </main>
  );
}