import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminCredentials } from '@/lib/adminAuth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password, accessToken } = body

    if (!username || !password || !accessToken) {
      return NextResponse.json(
        { error: 'Username, password, and access token are required' },
        { status: 400 }
      )
    }

    const isValid = await verifyAdminCredentials({ username, password, accessToken })

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const response = NextResponse.json({ 
      success: true,
      message: 'Login successful' 
    })

    // Set admin session cookie
    response.cookies.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return response
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

