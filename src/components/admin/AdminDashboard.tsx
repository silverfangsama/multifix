"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Shield, 
  LogOut, 
  Plus, 
  Trash2, 
  Search, 
  AlertCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface BlacklistedAddress {
  _id: string
  address: string
  network?: string
  reason?: string
  notes?: string
  blacklistedAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [blacklistedAddresses, setBlacklistedAddresses] = useState<BlacklistedAddress[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNetwork, setSelectedNetwork] = useState<string>("all")

  // Form state
  const [newAddress, setNewAddress] = useState("")
  const [newNetwork, setNewNetwork] = useState("")
  const [newReason, setNewReason] = useState("")
  const [newNotes, setNewNotes] = useState("")
  const [formError, setFormError] = useState("")
  const [formSuccess, setFormSuccess] = useState("")
  
  // Delete confirmation modal state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchBlacklistedAddresses()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/auth/check")
      const data = await response.json()
      setIsAuthenticated(data.authenticated)
      if (!data.authenticated) {
        router.push("/admin")
      }
    } catch (error) {
      console.error("Auth check error:", error)
      setIsAuthenticated(false)
      router.push("/admin")
    }
  }

  const fetchBlacklistedAddresses = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/blacklist")
      if (response.ok) {
        const data = await response.json()
        setBlacklistedAddresses(data.addresses || [])
      } else if (response.status === 401) {
        router.push("/admin")
      }
    } catch (error) {
      console.error("Error fetching blacklisted addresses:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" })
      router.push("/admin")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError("")
    setFormSuccess("")
    setIsAdding(true)

    try {
      const response = await fetch("/api/blacklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: newAddress.trim(),
          network: newNetwork || null,
          reason: newReason || null,
          notes: newNotes || null,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setFormSuccess("Address added to blacklist successfully")
        setNewAddress("")
        setNewNetwork("")
        setNewReason("")
        setNewNotes("")
        fetchBlacklistedAddresses()
      } else {
        setFormError(data.error || "Failed to add address")
      }
    } catch (error) {
      setFormError("An error occurred while adding address")
    } finally {
      setIsAdding(false)
    }
  }

  const handleRemoveAddressClick = (address: string) => {
    setAddressToDelete(address)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!addressToDelete) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/blacklist?address=${encodeURIComponent(addressToDelete)}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchBlacklistedAddresses()
        setDeleteDialogOpen(false)
        setAddressToDelete(null)
      } else {
        const data = await response.json()
        setFormError(data.error || "Failed to remove address")
        setDeleteDialogOpen(false)
        setAddressToDelete(null)
      }
    } catch (error) {
      console.error("Error removing address:", error)
      setFormError("An error occurred while removing address")
      setDeleteDialogOpen(false)
      setAddressToDelete(null)
    } finally {
      setIsDeleting(false)
    }
  }

  const filteredAddresses = blacklistedAddresses.filter((addr) => {
    const matchesSearch = addr.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      addr.reason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      addr.notes?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesNetwork = selectedNetwork === "all" || addr.network === selectedNetwork || (!addr.network && selectedNetwork === "none")
    return matchesSearch && matchesNetwork
  })

  const uniqueNetworks = Array.from(
    new Set(blacklistedAddresses.map((addr) => addr.network).filter(Boolean))
  )

  if (isAuthenticated === null || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-400">Manage Blacklisted Addresses</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Address Form */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Address to Blacklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddAddress} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-300">Address *</Label>
                  <Input
                    id="address"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white"
                    placeholder="0x..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="network" className="text-gray-300">Network (Optional)</Label>
                  <Input
                    id="network"
                    value={newNetwork}
                    onChange={(e) => setNewNetwork(e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white"
                    placeholder="ETH, BTC, SOL, etc."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason" className="text-gray-300">Reason (Optional)</Label>
                <Input
                  id="reason"
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white"
                  placeholder="Why is this address blacklisted?"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-gray-300">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white"
                  placeholder="Additional notes..."
                  rows={3}
                />
              </div>
              {formError && (
                <div className="bg-red-900/30 border border-red-600/50 rounded-lg p-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400" />
                  <p className="text-red-300 text-sm">{formError}</p>
                </div>
              )}
              {formSuccess && (
                <div className="bg-green-900/30 border border-green-600/50 rounded-lg p-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <p className="text-green-300 text-sm">{formSuccess}</p>
                </div>
              )}
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isAdding}
              >
                {isAdding ? "Adding..." : "Add to Blacklist"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Blacklisted Addresses List */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Blacklisted Addresses ({filteredAddresses.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white pl-10"
                    placeholder="Search addresses, reasons, or notes..."
                  />
                </div>
              </div>
              <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                <SelectTrigger className="w-full sm:w-48 bg-gray-700/50 border-gray-600 text-white">
                  <SelectValue placeholder="Filter by network" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">All Networks</SelectItem>
                  <SelectItem value="none">No Network</SelectItem>
                  {uniqueNetworks.map((network) => (
                    <SelectItem key={network} value={network || ""}>
                      {network}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Addresses List */}
            {filteredAddresses.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No blacklisted addresses found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAddresses.map((addr) => (
                  <div
                    key={addr._id}
                    className="bg-gray-700/30 border border-gray-600 rounded-lg p-4 hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <code className="text-blue-400 font-mono text-sm break-all">
                            {addr.address}
                          </code>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          {addr.network && (
                            <span className="flex items-center gap-1">
                              <span className="text-gray-500">Network:</span>
                              <span className="text-gray-300">{addr.network}</span>
                            </span>
                          )}
                          {addr.reason && (
                            <span className="flex items-center gap-1">
                              <span className="text-gray-500">Reason:</span>
                              <span className="text-gray-300">{addr.reason}</span>
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <span className="text-gray-500">Added:</span>
                            <span className="text-gray-300">
                              {new Date(addr.blacklistedAt).toLocaleDateString()}
                            </span>
                          </span>
                        </div>
                        {addr.notes && (
                          <p className="text-gray-400 text-sm mt-2">{addr.notes}</p>
                        )}
                      </div>
                      <Button
                        onClick={() => handleRemoveAddressClick(addr.address)}
                        variant="outline"
                        size="sm"
                        className="bg-red-900/30 border-red-600/50 text-red-300 hover:bg-red-900/50 hover:text-red-200 ml-4"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <DialogTitle className="text-xl font-semibold">Remove from Blacklist</DialogTitle>
            </div>
            <DialogDescription className="text-gray-400 pt-2">
              Are you sure you want to remove this address from the blacklist?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-3">
              <p className="text-sm text-gray-400 mb-1">Address:</p>
              <code className="text-blue-400 font-mono text-sm break-all">
                {addressToDelete}
              </code>
            </div>
            <p className="text-gray-300 text-sm mt-4">
              This action cannot be undone. The address will be removed from the blacklist and users will be able to access it again.
            </p>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false)
                setAddressToDelete(null)
              }}
              className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Removing...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove from Blacklist
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

