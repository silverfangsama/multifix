import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Admin from '@/models/Admin'

export async function GET() {
  try {
    await dbConnect()
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne()
    
    return NextResponse.json({ 
      isSetup: !!existingAdmin 
    })
  } catch (error) {
    console.error('Admin setup check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne()
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin account already exists' },
        { status: 409 }
      )
    }

    const body = await request.json()
    const { username, password, accessToken } = body

    if (!username || !password || !accessToken) {
      return NextResponse.json(
        { error: 'Username, password, and access token are required' },
        { status: 400 }
      )
    }

    // Validate minimum requirements
    if (username.length < 3) {
      return NextResponse.json(
        { error: 'Username must be at least 3 characters' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    if (accessToken.length < 8) {
      return NextResponse.json(
        { error: 'Access token must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Create admin account
    const admin = await Admin.create({
      username: username.trim(),
      password, // Will be hashed by pre-save hook
      accessToken: accessToken.trim()
    })

    return NextResponse.json({ 
      success: true,
      message: 'Admin account created successfully',
      admin: {
        username: admin.username,
        createdAt: admin.createdAt
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Admin setup error:', error)
    
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { error: 'Username or access token already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

