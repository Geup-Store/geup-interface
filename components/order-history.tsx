"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ChevronUp, ExternalLink, Package, Search, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock order data
const orders = [
  {
    id: "ORD-12345-6789",
    date: "March 25, 2025",
    status: "Delivered",
    total: 299.99,
    items: [
      {
        id: "1",
        name: "Wireless Headphones",
        price: 299.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  {
    id: "ORD-98765-4321",
    date: "March 15, 2025",
    status: "Shipped",
    total: 199.99,
    trackingNumber: "TRK123456789",
    estimatedDelivery: "March 30, 2025",
    items: [
      {
        id: "2",
        name: "Smart Watch",
        price: 199.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  {
    id: "ORD-45678-9012",
    date: "February 28, 2025",
    status: "Processing",
    total: 129.99,
    items: [
      {
        id: "3",
        name: "Bluetooth Speaker",
        price: 129.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
]

export function OrderHistory() {
  const [expandedOrders, setExpandedOrders] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "success"
      case "shipped":
        return "default"
      case "processing":
        return "secondary"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-base">Order #{order.id}</CardTitle>
                    <CardDescription>Placed on {order.date}</CardDescription>
                  </div>
                  <Badge variant={getStatusBadgeVariant(order.status) as any}>{order.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex justify-between">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Total: </span>
                    <span className="font-medium">${order.total.toFixed(2)}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 h-auto p-0"
                    onClick={() => toggleOrderExpand(order.id)}
                  >
                    {expandedOrders.includes(order.id) ? (
                      <>
                        <span>Hide Details</span>
                        <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <span>View Details</span>
                        <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                {expandedOrders.includes(order.id) && (
                  <div className="mt-4 space-y-4">
                    {/* Order Status */}
                    {order.status === "Shipped" && (
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Truck className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">Your order is on the way</p>
                            <p className="text-sm text-muted-foreground">Tracking Number: {order.trackingNumber}</p>
                            <p className="text-sm text-muted-foreground">
                              Estimated Delivery: {order.estimatedDelivery}
                            </p>
                            <Button variant="link" className="h-auto p-0 text-primary" asChild>
                              <Link href="#">
                                Track Package
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {order.status === "Processing" && (
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Package className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">Your order is being processed</p>
                            <p className="text-sm text-muted-foreground">We're preparing your items for shipment.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <Separator />

                    {/* Order Items */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Items in this order</h4>
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="relative h-16 w-16 rounded-md overflow-hidden border bg-background">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium line-clamp-1">{item.name}</h5>
                            <div className="text-sm text-muted-foreground mt-1">
                              ${item.price.toFixed(2)} × {item.quantity}
                            </div>
                          </div>
                          <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/order/${order.id}`}>View Order</Link>
                </Button>
                {order.status === "Delivered" && (
                  <Button variant="secondary" size="sm">
                    Buy Again
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg">
          <div className="inline-flex items-center justify-center p-4 bg-muted rounded-full mb-4">
            <Package className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No orders found</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filter criteria."
              : "You haven't placed any orders yet."}
          </p>
          <Button asChild>
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

