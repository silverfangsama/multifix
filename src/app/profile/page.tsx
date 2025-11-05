import { Metadata } from 'next'
import ProfileLayout from '@/components/profile/profileLayout'

export const metadata: Metadata = {
  title: 'Explore | Decentralized Dapps - We are unifying Web3 by providing best-in-class, self-custodial, and multichain support',
  description: 'We are unifying Web3 by providing best-in-class, self-custodial, and multichain support',
}

export default function ProfilePage() {
  return (
    <ProfileLayout />
  )
}