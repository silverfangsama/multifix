"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface WalletAddressProps {
  network: string
  symbol: string
  color: string
}

interface NetworkConfig {
  name: string
  placeholder: string
  requirements: string[]
  validator: (address: string) => boolean
  color: string
}

export default function WalletAddress({ network, symbol, color }: WalletAddressProps) {
  const router = useRouter()
  const [walletAddress, setWalletAddress] = useState("")

  const networkConfigs: { [key: string]: NetworkConfig } = {
    BTC: {
      name: "Bitcoin",
      placeholder: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      requirements: [
        "Must start with '1', '3', or 'bc1'",
        "Must be 26-62 characters long",
        "Contains only alphanumeric characters"
      ],
      validator: (address: string) => {
        return /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/.test(address)
      },
      color: "bg-orange-500"
    },
    ETH: {
      name: "Ethereum",
      placeholder: "0x742d35Cc6634C0532925a3b8D527bBd94f4B4c1f",
      requirements: [
        "Must start with '0x'",
        "Must be 42 characters long",
        "Contains only hexadecimal characters"
      ],
      validator: (address: string) => {
        return address.startsWith("0x") && address.length === 42 && /^0x[a-fA-F0-9]{40}$/.test(address)
      },
      color: "bg-blue-500"
    },
    SOL: {
      name: "Solana",
      placeholder: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      requirements: [
        "Must be 32-44 characters long",
        "Contains only Base58 characters",
        "No special characters allowed"
      ],
      validator: (address: string) => {
        return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)
      },
      color: "bg-purple-500"
    },
    XRP: {
      name: "XRP",
      placeholder: "rDNa96Q2KaPYAyj4FrKwtxkSEjejvkjX2x",
      requirements: [
        "Must start with 'r'",
        "Must be 25-34 characters long",
        "Contains only alphanumeric characters"
      ],
      validator: (address: string) => {
        return /^r[1-9A-HJ-NP-Za-km-z]{24,33}$/.test(address)
      },
      color: "bg-blue-400"
    },
    ADA: {
      name: "Cardano",
      placeholder: "addr1q8x2kd30422dm4ezze8ufg0qh2glygr5ds0",
      requirements: [
        "Must start with 'addr1'",
        "Must be 58-103 characters long",
        "Contains only alphanumeric characters"
      ],
      validator: (address: string) => {
        return /^addr1[a-z0-9]{54,99}$/.test(address)
      },
      color: "bg-blue-600"
    },
    APT: {
      name: "Aptos",
      placeholder: "0x1234567890abcdef1234567890abcdef12345678",
      requirements: [
        "Must start with '0x'",
        "Must be 66 characters long",
        "Contains only hexadecimal characters"
      ],
      validator: (address: string) => {
        return address.startsWith("0x") && address.length === 66 && /^0x[a-fA-F0-9]{64}$/.test(address)
      },
      color: "bg-green-500"
    },
    DOT: {
      name: "Polkadot",
      placeholder: "1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg",
      requirements: [
        "Must start with '1'",
        "Must be 47-48 characters long",
        "Contains only Base58 characters"
      ],
      validator: (address: string) => {
        return /^1[1-9A-HJ-NP-Za-km-z]{46,47}$/.test(address)
      },
      color: "bg-pink-500"
    },
    CRO: {
      name: "Cronos",
      placeholder: "0x742d35Cc6634C0532925a3b8D527bBd94f4B4c1f",
      requirements: [
        "Must start with '0x'",
        "Must be 42 characters long",
        "Contains only hexadecimal characters"
      ],
      validator: (address: string) => {
        return address.startsWith("0x") && address.length === 42 && /^0x[a-fA-F0-9]{40}$/.test(address)
      },
      color: "bg-blue-700"
    },
    TON: {
      name: "TON",
      placeholder: "EQD4FPq-PRDieyQKkizFTRtSDyucUIqrj0v_zXJmqaDp6_0t",
      requirements: [
        "Must start with 'EQ' or 'UQ'",
        "Must be 48 characters long",
        "Contains Base64 characters"
      ],
      validator: (address: string) => {
        return /^(EQ|UQ)[A-Za-z0-9+/]{46}$/.test(address)
      },
      color: "bg-blue-500"
    },
    VENOM: {
      name: "Venom",
      placeholder: "0:742d35cc6634c0532925a3b8d527bbd94f4b4c1f",
      requirements: [
        "Must start with '0:'",
        "Must be 67 characters long",
        "Contains only hexadecimal characters"
      ],
      validator: (address: string) => {
        return /^0:[a-fA-F0-9]{64}$/.test(address)
      },
      color: "bg-green-600"
    },
    SUI: {
      name: "Sui",
      placeholder: "0x742d35cc6634c0532925a3b8d527bbd94f4b4c1f",
      requirements: [
        "Must start with '0x'",
        "Must be 66 characters long",
        "Contains only hexadecimal characters"
      ],
      validator: (address: string) => {
        return address.startsWith("0x") && address.length === 66 && /^0x[a-fA-F0-9]{64}$/.test(address)
      },
      color: "bg-cyan-500"
    },
    XRD: {
      name: "Radix",
      placeholder: "rdx1qsp0wd0k8jzql8xa3j8k0fhm6q9gwh5gp9p4j8e7h4k3r8v",
      requirements: [
        "Must start with 'rdx1'",
        "Must be 65 characters long",
        "Contains only alphanumeric characters"
      ],
      validator: (address: string) => {
        return /^rdx1[a-z0-9]{61}$/.test(address)
      },
      color: "bg-red-500"
    },
    RON: {
      name: "Ronin",
      placeholder: "ronin:742d35Cc6634C0532925a3b8D527bBd94f4B4c1f",
      requirements: [
        "Must start with 'ronin:'",
        "Must be 47 characters long",
        "Contains only hexadecimal characters"
      ],
      validator: (address: string) => {
        return /^ronin:[a-fA-F0-9]{40}$/.test(address)
      },
      color: "bg-blue-600"
    },
    RUNE: {
      name: "THORChain",
      placeholder: "thor1qsp0wd0k8jzql8xa3j8k0fhm6q9gwh5gp9p4j8e",
      requirements: [
        "Must start with 'thor1'",
        "Must be 43 characters long",
        "Contains only alphanumeric characters"
      ],
      validator: (address: string) => {
        return /^thor1[a-z0-9]{38}$/.test(address)
      },
      color: "bg-green-500"
    },
    HBAR: {
      name: "Hedera",
      placeholder: "0.0.123456",
      requirements: [
        "Must follow format '0.0.x'",
        "Account number must be numeric",
        "Contains only numbers and dots"
      ],
      validator: (address: string) => {
        return /^0\.0\.\d+$/.test(address)
      },
      color: "bg-purple-600"
    },
    FLR: {
      name: "Flare",
      placeholder: "0x742d35Cc6634C0532925a3b8D527bBd94f4B4c1f",
      requirements: [
        "Must start with '0x'",
        "Must be 42 characters long",
        "Contains only hexadecimal characters"
      ],
      validator: (address: string) => {
        return address.startsWith("0x") && address.length === 42 && /^0x[a-fA-F0-9]{40}$/.test(address)
      },
      color: "bg-red-500"
    },
    KPLR: {
      name: "Cosmos (Keplr)",
      placeholder: "cosmos1qsp0wd0k8jzql8xa3j8k0fhm6q9gwh5gp9p4j8e",
      requirements: [
        "Must start with 'cosmos1'",
        "Must be 45 characters long",
        "Contains only alphanumeric characters"
      ],
      validator: (address: string) => {
        return /^cosmos1[a-z0-9]{38}$/.test(address)
      },
      color: "bg-purple-500"
    },
    OTHER: {
      name: "Other Wallets",
      placeholder: "Enter your wallet address",
      requirements: [
        "Check your wallet documentation",
        "Ensure address format is correct",
        "Double-check before submitting"
      ],
      validator: (address: string) => {
        return address.length > 10 // Basic validation for other wallets
      },
      color: "bg-gray-500"
    }
  }

  const config = networkConfigs[symbol] || networkConfigs.OTHER
  const isValid = config.validator(walletAddress)

  const handleBack = () => {
    router.back()
  }

  const handleContinue = () => {
    if (isValid) {
      router.push(`/dashboard/${symbol.toLowerCase()}?network=${encodeURIComponent(config.name)}&address=${encodeURIComponent(walletAddress)}`)
    }
  }

  return (
    <div className="min-h-screen bg-darkBlueCustom relative overflow-hidden">
      {/* Crypto Ticker */}
      <div
        className="bg-black/30 backdrop-blur-sm border-b border-white/10"
        style={{ height: "40px", padding: 0, margin: 0, width: "100%" }}
      >
        <iframe
          src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=dark&pref_coin_id=1505&invert_hover=no"
          width="100%"
          height="36px"
          scrolling="auto"
          marginWidth={0}
          marginHeight={0}
          frameBorder="0"
          style={{ border: 0, margin: 0, padding: 0 }}
          title="Cryptocurrency Price Ticker"
        />
      </div>

      {/* Background Pattern - Same as homepage */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <path d="M100,500 Q300,200 500,500 T900,500" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
          <path d="M0,300 Q200,100 400,300 T800,300" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
          <circle cx="100" cy="200" r="3" fill="rgba(255,255,255,0.3)" />
          <circle cx="900" cy="300" r="2" fill="rgba(255,255,255,0.2)" />
          <circle cx="800" cy="700" r="4" fill="rgba(255,255,255,0.1)" />
        </svg>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 text-white">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10"
              onClick={handleBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${config.color} rounded-full`}>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{config.name}</h1>
                <p className="text-purple-200 text-sm">Enter your wallet address</p>
              </div>
            </div>
          </div>

          {/* Wallet Address Card */}
          <Card className="bg-black/20 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-xl">Wallet Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-medium">{config.name} Address</label>
                <Input
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                  placeholder={config.placeholder}
                />
              </div>

              {/* Address Requirements */}
              <div className="space-y-3">
                <h3 className="text-gray-300 font-medium">Address Requirements:</h3>
                <ul className="space-y-1 text-sm text-gray-400">
                  {config.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-gray-500">•</span>
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Continue Button */}
              <Button 
                className={`w-full ${config.color} hover:opacity-90 text-white font-medium py-3`}
                disabled={!isValid}
                onClick={handleContinue}
              >
                Continue to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
