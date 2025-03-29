import Link from "next/link"
import { CheckCircle, Package, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ConfirmationPage() {
  // Mock order details - in a real app, this would come from a database or API
  const orderDetails = {
    orderNumber: "ORD-12345-6789",
    date: "March 28, 2025",
    total: 549.97,
    paymentMethod: "Credit Card (ending in 4242)",
    shippingAddress: "123 Main St, Apt 4B, New York, NY 10001, United States",
    items: [
      {
        name: "Wireless Headphones",
        price: 299.99,
        quantity: 1,
      },
      {
        name: "Smart Watch",
        price: 199.99,
        quantity: 1,
      },
    ],
    shipping: 4.99,
    tax: 45.0,
  }

  const subtotal = orderDetails.items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container py-12 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <CheckCircle className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Order Confirmed!</h1>
          <p className="text-muted-foreground mt-2">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order #{orderDetails.orderNumber}</CardTitle>
            <CardDescription>Placed on {orderDetails.date}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Status */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Your order is being prepared</p>
                  <p className="text-sm text-muted-foreground">
                    You will receive a shipping confirmation email when your order ships.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="space-y-4">
              <h3 className="font-semibold">Order Details</h3>

              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground"> × {item.quantity}</span>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${orderDetails.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${orderDetails.tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${orderDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="space-y-2">
              <h3 className="font-semibold">Shipping Information</h3>
              <p>{orderDetails.shippingAddress}</p>
            </div>

            {/* Payment Information */}
            <div className="space-y-2">
              <h3 className="font-semibold">Payment Method</h3>
              <p>{orderDetails.paymentMethod}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" asChild>
              <Link href="/">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
            <Button variant="outline" className="w-full">
              View Order Status
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

