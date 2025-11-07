import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import BlacklistedAddress from '@/models/BlacklistedAddress'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const searchParams = request.nextUrl.searchParams
    const address = searchParams.get('address')
    const network = searchParams.get('network') // Optional
    
    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      )
    }

    // Check if address is blacklisted (either globally or for specific network)
    const blacklisted = await BlacklistedAddress.findOne({
      address: address.toLowerCase().trim(),
      $or: [
        { network: null }, // Global blacklist
        { network: network || null }, // Network-specific blacklist
      ]
    })

    return NextResponse.json({
      isBlacklisted: !!blacklisted,
      reason: blacklisted?.reason || null,
      blacklistedAt: blacklisted?.blacklistedAt || null
    })
  } catch (error) {
    console.error('Error checking blacklist:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

