"use client" // This component needs to be a client component to use next/link

import { Zap, Menu } from "lucide-react" // Import Menu icon
import { Button } from "@/components/ui/button"
import Link from "next/link" // Import Link for navigation

export default function PendingComponent() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo on the left */}
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {/* Navigation in the middle */}
          <nav className="flex space-x-8">
            <Link href={"/"} className="text-gray-600 hover:text-gray-900 font-medium">
              Home
            </Link>
            <Link href={"/"} className="text-gray-600 hover:text-gray-900 font-medium">
              Explore
            </Link>
          </nav>
          {/* Breadcrumb icon on the right */}
          <div className="text-gray-500">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Pending</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Error Box */}
          <div className="bg-white p-8 rounded-lg shadow-md w-full">
            {/* Faint horizontal line */}
            <div className="border-t border-gray-100 mb-6"></div>
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex-shrink-0"></div>
              <div className="flex flex-col space-y-3">
                <h2 className="text-gray-900 font-medium text-lg">Connection verification pending...</h2>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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
                <a href="#" className="block text-blue-100 hover:text-white transition-colors">
                  Explore
                </a>
                <a href="#" className="block text-blue-100 hover:text-white transition-colors">
                  Connect
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
