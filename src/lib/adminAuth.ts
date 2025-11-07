import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import dbConnect from './mongodb'
import Admin from '@/models/Admin'

export interface AdminCredentials {
  username: string
  password: string
  accessToken: string
}

export async function verifyAdminCredentials(credentials: AdminCredentials): Promise<boolean> {
  try {
    await dbConnect()
    
    const admin = await Admin.findOne({ 
      username: credentials.username.trim(),
      accessToken: credentials.accessToken.trim()
    })

    if (!admin) {
      return false
    }

    // Verify password
    const isPasswordValid = await admin.comparePassword(credentials.password)
    
    if (isPasswordValid) {
      // Update last login
      admin.lastLogin = new Date()
      await admin.save()
      return true
    }

    return false
  } catch (error) {
    console.error('Error verifying admin credentials:', error)
    return false
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get('admin_session')
  return adminSession?.value === 'authenticated'
}

export async function getAdminAuthFromRequest(request: NextRequest): Promise<boolean> {
  const adminSession = request.cookies.get('admin_session')
  return adminSession?.value === 'authenticated'
}

export async function setAdminSession() {
  const cookieStore = await cookies()
  cookieStore.set('admin_session', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  })
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
}

