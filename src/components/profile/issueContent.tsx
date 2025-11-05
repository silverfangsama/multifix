"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function EthereumWalletPage() {
  const [walletAddress, setWalletAddress] = useState("0x742d35Cc6634C0532925a3b8D527bBd94f4B4c1f")

  const validateAddress = (address: string) => {
    return address.startsWith("0x") && address.length === 42 && /^0x[a-fA-F0-9]{40}$/.test(address)
  }

  const isValid = validateAddress(walletAddress)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 text-white">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">Ξ</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Ethereum</h1>
              <p className="text-purple-200 text-sm">Enter your wallet address</p>
            </div>
          </div>
        </div>

        {/* Wallet Address Card */}
        <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-xl">Wallet Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-medium">Ethereum Address</label>
              <Input
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                placeholder="0x..."
              />
            </div>

            {/* Address Requirements */}
            <div className="space-y-3">
              <h3 className="text-gray-300 font-medium">Address Requirements:</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-gray-500">•</span>
                  Must start with &ldquo;0x&quot;
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-500">•</span>
                  Must be 42 characters long
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-500">•</span>
                  Contains only hexadecimal characters
                </li>
              </ul>
            </div>

            {/* Continue Button */}
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3" disabled={!isValid}>
              Continue to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
