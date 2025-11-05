import { Metadata } from 'next'
import ConnectPage from '@/components/submit'
import PendingComponent from '@/components/pending'

export const metadata: Metadata = {
  title: 'Submit | Decentralized Dapps - We are unifying Web3 by providing best-in-class, self-custodial, and multichain support',
  description: 'We are unifying Web3 by providing best-in-class, self-custodial, and multichain support',
}

export default function PendingPage() {
  return (
    <PendingComponent />
  )
}