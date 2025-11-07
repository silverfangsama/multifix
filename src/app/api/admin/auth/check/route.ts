import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/adminAuth'

export async function GET() {
  try {
    const authenticated = await isAdminAuthenticated()
    return NextResponse.json({ 
      authenticated 
    })
  } catch (error) {
    console.error('Admin auth check error:', error)
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    )
  }
}

