"use client"

import type React from "react"

import { useState } from "react"
import { Check, Edit, Home, Plus, Trash2, Building, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

// Mock address data
const initialAddresses = [
  {
    id: "addr1",
    name: "Alex Johnson",
    line1: "123 Main Street",
    line2: "Apt 4B",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "United States",
    phone: "+1 (555) 123-4567",
    type: "home",
    isDefault: true,
  },
  {
    id: "addr2",
    name: "Alex Johnson",
    line1: "456 Market Street",
    line2: "Suite 200",
    city: "San Francisco",
    state: "CA",
    postalCode: "94103",
    country: "United States",
    phone: "+1 (555) 987-6543",
    type: "work",
    isDefault: false,
  },
]

export function AddressBook() {
  const [addresses, setAddresses] = useState(initialAddresses)
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null)
  const [newAddress, setNewAddress] = useState({
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    phone: "",
    type: "home",
    isDefault: false,
  })

  const handleAddAddress = () => {
    setIsAddingAddress(true)
    setNewAddress({
      name: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "United States",
      phone: "",
      type: "home",
      isDefault: false,
    })
  }

  const handleEditAddress = (addressId: string) => {
    const addressToEdit = addresses.find((addr) => addr.id === addressId)
    if (addressToEdit) {
      setNewAddress(addressToEdit)
      setEditingAddressId(addressId)
      setIsAddingAddress(true)
    }
  }

  const handleDeleteAddress = (addressId: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== addressId))
  }

  const handleSetDefaultAddress = (addressId: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      })),
    )
  }

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingAddressId) {
      // Update existing address
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingAddressId
            ? { ...newAddress, id: editingAddressId }
            : newAddress.isDefault
              ? { ...addr, isDefault: false }
              : addr,
        ),
      )
    } else {
      // Add new address
      const newId = `addr${addresses.length + 1}`
      setAddresses((prev) => [
        ...prev.map((addr) => (newAddress.isDefault ? { ...addr, isDefault: false } : addr)),
        { ...newAddress, id: newId },
      ])
    }

    setIsAddingAddress(false)
    setEditingAddressId(null)
  }

  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="h-4 w-4" />
      case "work":
        return <Building className="h-4 w-4" />
      default:
        return <Home className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">Manage your shipping and billing addresses</p>
        <Button onClick={handleAddAddress}>
          <Plus className="h-4 w-4 mr-2" />
          Add Address
        </Button>
      </div>

      {/* Address List */}
      <div className="grid md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <Card key={address.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getAddressIcon(address.type)}
                  <CardTitle className="text-base capitalize">{address.type}</CardTitle>
                  {address.isDefault && (
                    <Badge variant="secondary" className="ml-2">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Default
                    </Badge>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditAddress(address.id)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit address</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => handleDeleteAddress(address.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete address</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-1 text-sm">
                <p className="font-medium">{address.name}</p>
                <p>{address.line1}</p>
                {address.line2 && <p>{address.line2}</p>}
                <p>
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p>{address.country}</p>
                <p className="text-muted-foreground">{address.phone}</p>
              </div>
            </CardContent>
            <CardFooter>
              {!address.isDefault && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleSetDefaultAddress(address.id)}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Set as Default
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Add/Edit Address Dialog */}
      <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingAddressId ? "Edit Address" : "Add New Address"}</DialogTitle>
            <DialogDescription>
              {editingAddressId
                ? "Update your address information below."
                : "Fill in the details for your new address."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveAddress}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="line1">Address Line 1</Label>
                <Input
                  id="line1"
                  value={newAddress.line1}
                  onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="line2">Address Line 2 (Optional)</Label>
                <Input
                  id="line2"
                  value={newAddress.line2}
                  onChange={(e) => setNewAddress({ ...newAddress, line2: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State / Province</Label>
                  <Input
                    id="state"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={newAddress.postalCode}
                    onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={newAddress.country}
                    onValueChange={(value) => setNewAddress({ ...newAddress, country: value })}
                  >
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Address Type</Label>
                <Select
                  value={newAddress.type}
                  onValueChange={(value) => setNewAddress({ ...newAddress, type: value })}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isDefault"
                  checked={newAddress.isDefault}
                  onCheckedChange={(checked) => setNewAddress({ ...newAddress, isDefault: checked as boolean })}
                />
                <Label htmlFor="isDefault" className="text-sm font-normal">
                  Set as default address
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{editingAddressId ? "Update Address" : "Add Address"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

