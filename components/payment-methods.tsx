"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Edit, Plus, Star, Trash2 } from "lucide-react"

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

// Mock payment methods data
const initialPaymentMethods = [
  {
    id: "pm1",
    cardType: "Visa",
    lastFourDigits: "4242",
    expiryMonth: "12",
    expiryYear: "2025",
    cardholderName: "Alex Johnson",
    isDefault: true,
  },
  {
    id: "pm2",
    cardType: "Mastercard",
    lastFourDigits: "5678",
    expiryMonth: "06",
    expiryYear: "2026",
    cardholderName: "Alex Johnson",
    isDefault: false,
  },
]

export function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods)
  const [isAddingPayment, setIsAddingPayment] = useState(false)
  const [editingPaymentId, setEditingPaymentId] = useState<string | null>(null)
  const [newPayment, setNewPayment] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    cardholderName: "",
    isDefault: false,
  })

  const handleAddPayment = () => {
    setIsAddingPayment(true)
    setNewPayment({
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvc: "",
      cardholderName: "",
      isDefault: false,
    })
  }

  const handleEditPayment = (paymentId: string) => {
    const paymentToEdit = paymentMethods.find((pm) => pm.id === paymentId)
    if (paymentToEdit) {
      setNewPayment({
        cardNumber: `**** **** **** ${paymentToEdit.lastFourDigits}`,
        expiryMonth: paymentToEdit.expiryMonth,
        expiryYear: paymentToEdit.expiryYear,
        cvc: "",
        cardholderName: paymentToEdit.cardholderName,
        isDefault: paymentToEdit.isDefault,
      })
      setEditingPaymentId(paymentId)
      setIsAddingPayment(true)
    }
  }

  const handleDeletePayment = (paymentId: string) => {
    setPaymentMethods(paymentMethods.filter((pm) => pm.id !== paymentId))
  }

  const handleSetDefaultPayment = (paymentId: string) => {
    setPaymentMethods(
      paymentMethods.map((pm) => ({
        ...pm,
        isDefault: pm.id === paymentId,
      })),
    )
  }

  const handleSavePayment = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would validate and process the card info here

    if (editingPaymentId) {
      // Update existing payment method
      setPaymentMethods(
        paymentMethods.map((pm) =>
          pm.id === editingPaymentId
            ? {
                ...pm,
                expiryMonth: newPayment.expiryMonth,
                expiryYear: newPayment.expiryYear,
                cardholderName: newPayment.cardholderName,
                isDefault: newPayment.isDefault,
              }
            : newPayment.isDefault
              ? { ...pm, isDefault: false }
              : pm,
        ),
      )
    } else {
      // Add new payment method
      const newId = `pm${paymentMethods.length + 1}`
      const lastFourDigits = newPayment.cardNumber.slice(-4)
      // Determine card type based on first digit (simplified)
      const firstDigit = newPayment.cardNumber.charAt(0)
      let cardType = "Unknown"
      if (firstDigit === "4") cardType = "Visa"
      else if (firstDigit === "5") cardType = "Mastercard"
      else if (firstDigit === "3") cardType = "American Express"
      else if (firstDigit === "6") cardType = "Discover"

      setPaymentMethods((prev) => [
        ...prev.map((pm) => (newPayment.isDefault ? { ...pm, isDefault: false } : pm)),
        {
          id: newId,
          cardType,
          lastFourDigits,
          expiryMonth: newPayment.expiryMonth,
          expiryYear: newPayment.expiryYear,
          cardholderName: newPayment.cardholderName,
          isDefault: newPayment.isDefault,
        },
      ])
    }

    setIsAddingPayment(false)
    setEditingPaymentId(null)
  }

  const getCardIcon = (cardType: string) => {
    // In a real app, you would use actual card brand logos
    return <CreditCard className="h-5 w-5" />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">Manage your saved payment methods</p>
        <Button onClick={handleAddPayment}>
          <Plus className="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      {/* Payment Methods List */}
      <div className="grid md:grid-cols-2 gap-4">
        {paymentMethods.map((payment) => (
          <Card key={payment.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getCardIcon(payment.cardType)}
                  <CardTitle className="text-base">{payment.cardType}</CardTitle>
                  {payment.isDefault && (
                    <Badge variant="secondary" className="ml-2">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Default
                    </Badge>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditPayment(payment.id)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit payment method</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => handleDeletePayment(payment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete payment method</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-1 text-sm">
                <p className="font-medium">•••• •••• •••• {payment.lastFourDigits}</p>
                <p>
                  Expires {payment.expiryMonth}/{payment.expiryYear}
                </p>
                <p className="text-muted-foreground">{payment.cardholderName}</p>
              </div>
            </CardContent>
            <CardFooter>
              {!payment.isDefault && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleSetDefaultPayment(payment.id)}
                >
                  <Star className="h-4 w-4 mr-2" />
                  Set as Default
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Add/Edit Payment Method Dialog */}
      <Dialog open={isAddingPayment} onOpenChange={setIsAddingPayment}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingPaymentId ? "Edit Payment Method" : "Add Payment Method"}</DialogTitle>
            <DialogDescription>
              {editingPaymentId
                ? "Update your payment method information below."
                : "Fill in the details for your new payment method."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSavePayment}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input
                  id="cardholderName"
                  value={newPayment.cardholderName}
                  onChange={(e) => setNewPayment({ ...newPayment, cardholderName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={newPayment.cardNumber}
                  onChange={(e) => setNewPayment({ ...newPayment, cardNumber: e.target.value })}
                  placeholder="1234 5678 9012 3456"
                  disabled={!!editingPaymentId}
                  required={!editingPaymentId}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryMonth">Month</Label>
                  <Select
                    value={newPayment.expiryMonth}
                    onValueChange={(value) => setNewPayment({ ...newPayment, expiryMonth: value })}
                  >
                    <SelectTrigger id="expiryMonth">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = (i + 1).toString().padStart(2, "0")
                        return (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryYear">Year</Label>
                  <Select
                    value={newPayment.expiryYear}
                    onValueChange={(value) => setNewPayment({ ...newPayment, expiryYear: value })}
                  >
                    <SelectTrigger id="expiryYear">
                      <SelectValue placeholder="YY" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = (new Date().getFullYear() + i).toString()
                        return (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    value={newPayment.cvc}
                    onChange={(e) => setNewPayment({ ...newPayment, cvc: e.target.value })}
                    placeholder="123"
                    required={!editingPaymentId}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isDefault"
                  checked={newPayment.isDefault}
                  onCheckedChange={(checked) => setNewPayment({ ...newPayment, isDefault: checked as boolean })}
                />
                <Label htmlFor="isDefault" className="text-sm font-normal">
                  Set as default payment method
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{editingPaymentId ? "Update Payment Method" : "Add Payment Method"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

