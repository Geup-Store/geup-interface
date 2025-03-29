"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

// Mock cart data - in a real app, this would come from a cart context or API
const cartItems = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 299.99,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export function OrderSummary() {
  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 4.99 // Standard shipping
  const tax = subtotal * 0.08 // 8% tax rate
  const total = subtotal + shipping + tax

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Cart Items */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative h-20 w-20 rounded-md overflow-hidden border bg-background">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium line-clamp-1">{item.name}</h4>
                <div className="text-sm text-muted-foreground mt-1">
                  ${item.price.toFixed(2)} × {item.quantity}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="outline" size="icon" className="h-6 w-6">
                    <Minus className="h-3 w-3" />
                    <span className="sr-only">Decrease quantity</span>
                  </Button>
                  <span className="text-sm">{item.quantity}</span>
                  <Button variant="outline" size="icon" className="h-6 w-6">
                    <Plus className="h-3 w-3" />
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                </div>
              </div>
              <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Promo Code */}
        <div className="space-y-2">
          <div className="text-sm font-medium">Promo Code</div>
          <div className="flex gap-2">
            <Input placeholder="Enter code" className="flex-1" />
            <Button variant="outline">Apply</Button>
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between font-medium text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/cart">Edit Cart</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

