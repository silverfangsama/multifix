// app/page.tsx
import Features from '@/components/features';
import '@/styles/globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'noderectificationvip | Decentralized Dapps - We are unifying Web3 by providing best-in-class, self-custodial, and multichain support',
  description: 'We are unifying Web3 by providing best-in-class, self-custodial, and multichain support',
}


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Features />
    </main>
  );
}