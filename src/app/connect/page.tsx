import { Metadata } from 'next'
import ProfileLayout from '@/components/profile/profileLayout'
import ConnectComponent from '@/components/connectComponent'

export const metadata: Metadata = {
  title: 'Connect | Decentralized Dapps - We are unifying Web3 by providing best-in-class, self-custodial, and multichain support',
  description: 'We are unifying Web3 by providing best-in-class, self-custodial, and multichain support',
}

export default function ConnectPage() {
  return (
    <ConnectComponent />
  )
}