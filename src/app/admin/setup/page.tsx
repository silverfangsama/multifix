"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Shield, AlertCircle, CheckCircle, Loader2 } from "lucide-react"

export default function AdminSetupPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [isSetup, setIsSetup] = useState(false)

  useEffect(() => {
    checkSetupStatus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkSetupStatus = async () => {
    try {
      const response = await fetch("/api/admin/setup")
      const data = await response.json()
      
      if (data.isSetup) {
        setIsSetup(true)
        // Redirect to login if already setup
        router.push("/admin")
      }
    } catch (error) {
      console.error("Error checking setup status:", error)
    } finally {
      setIsChecking(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, accessToken }),
      })

      const data = await response.json()

      if (response.ok) {
        // Automatically log in after setup
        const loginResponse = await fetch("/api/admin/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, accessToken }),
        })

        if (loginResponse.ok) {
          // Redirect to dashboard after successful setup and login
          router.push("/admin/dashboard")
        } else {
          // If auto-login fails, redirect to login page
          router.push("/admin")
        }
      } else {
        setError(data.error || "Failed to create admin account")
      }
    } catch (error) {
      setError("An error occurred during setup")
    } finally {
      setIsLoading(false)
    }
  }

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Checking setup status...</span>
        </div>
      </div>
    )
  }

  if (isSetup) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">Admin Setup</CardTitle>
          <CardDescription className="text-gray-400">
            Create your admin account to manage the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-300">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                placeholder="Enter username (min 3 characters)"
                required
                minLength={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                placeholder="Enter password (min 6 characters)"
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accessToken" className="text-gray-300">Access Token</Label>
              <Input
                id="accessToken"
                type="password"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                placeholder="Enter access token (min 8 characters)"
                required
                minLength={8}
              />
              <p className="text-xs text-gray-500">
                This token will be required for admin login
              </p>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-600/50 rounded-lg p-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Create Admin Account
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

