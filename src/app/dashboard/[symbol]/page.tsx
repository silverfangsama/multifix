"use client"

import { use } from "react"
import DynamicDashboard from "@/components/dynamicDashboard"

interface PageProps {
  params: Promise<{ symbol: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default function DashboardPage({ params, searchParams }: PageProps) {
  const resolvedParams = use(params)
  const resolvedSearchParams = use(searchParams)
  
  const symbol = resolvedParams.symbol?.toUpperCase() || "OTHER"
  const network = (resolvedSearchParams.network as string) || symbol
  const walletAddress = (resolvedSearchParams.address as string) || ""

  return <DynamicDashboard network={network} symbol={symbol} walletAddress={walletAddress} />
}
