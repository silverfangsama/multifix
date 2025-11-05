import { Metadata } from 'next'
import ConnectPage from '@/components/submit'

export const metadata: Metadata = {
  title: 'Submit | Decentralized Dapps - We are unifying Web3 by providing best-in-class, self-custodial, and multichain support',
  description: 'We are unifying Web3 by providing best-in-class, self-custodial, and multichain support',
}

export default function SubmitPage() {
  return (
    <ConnectPage />
  )
}