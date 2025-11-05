"use client"

import { use } from "react"
import WalletAddress from "@/components/walletAddress"

interface PageProps {
  params: Promise<{ symbol: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default function WalletPage({ params, searchParams }: PageProps) {
  const resolvedParams = use(params)
  const resolvedSearchParams = use(searchParams)
  
  const symbol = resolvedParams.symbol?.toUpperCase() || "OTHER"
  const network = (resolvedSearchParams.network as string) || symbol
  const color = (resolvedSearchParams.color as string) || "#6B7280"

  return <WalletAddress network={network} symbol={symbol} color={color} />
}
