import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import BlacklistedAddress from '@/models/BlacklistedAddress'
import { getAdminAuthFromRequest } from '@/lib/adminAuth'

// GET - List all blacklisted addresses
export async function GET(request: NextRequest) {
  try {
    const isAuthenticated = await getAdminAuthFromRequest(request)
    
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await dbConnect()
    
    const searchParams = request.nextUrl.searchParams
    const network = searchParams.get('network')
    
    const query: { network?: string } = {}
    if (network) {
      query.network = network
    }
    
    const blacklisted = await BlacklistedAddress.find(query)
      .sort({ blacklistedAt: -1 })
      .lean()

    return NextResponse.json({ addresses: blacklisted })
  } catch (error) {
    console.error('Error fetching blacklist:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Add address to blacklist
export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await getAdminAuthFromRequest(request)
    
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await dbConnect()
    
    const body = await request.json()
    const { address, network, reason, notes } = body

    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      )
    }

    // Check if already blacklisted
    const existing = await BlacklistedAddress.findOne({
      address: address.toLowerCase().trim()
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Address is already blacklisted', address: existing },
        { status: 409 }
      )
    }

    const blacklistedAddress = await BlacklistedAddress.create({
      address: address.toLowerCase().trim(),
      network: network || null,
      reason: reason || null,
      notes: notes || null,
      blacklistedBy: 'admin',
      blacklistedAt: new Date()
    })

    return NextResponse.json(
      { message: 'Address blacklisted successfully', address: blacklistedAddress },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error adding to blacklist:', error)
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { error: 'Address is already blacklisted' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Remove address from blacklist
export async function DELETE(request: NextRequest) {
  try {
    const isAuthenticated = await getAdminAuthFromRequest(request)
    
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await dbConnect()
    
    const searchParams = request.nextUrl.searchParams
    const address = searchParams.get('address')

    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      )
    }

    const result = await BlacklistedAddress.findOneAndDelete({
      address: address.toLowerCase().trim()
    })

    if (!result) {
      return NextResponse.json(
        { error: 'Address not found in blacklist' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'Address removed from blacklist successfully' }
    )
  } catch (error) {
    console.error('Error removing from blacklist:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

