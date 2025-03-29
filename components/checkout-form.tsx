"use client"

import Link from "next/link"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

export function CheckoutForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect to confirmation page
    router.push("/checkout/confirmation")
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Shipping Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="flex items-center justify-center rounded-full bg-primary/10 w-6 h-6 text-primary text-sm">
              1
            </span>
            Shipping Information
          </CardTitle>
          <CardDescription>Enter your shipping address details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Street Address</Label>
            <Input id="address" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
            <Input id="address2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postal-code">Postal Code</Label>
              <Input id="postal-code" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select defaultValue="us">
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State / Province</Label>
              <Select defaultValue="ny">
                <SelectTrigger id="state">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ny">New York</SelectItem>
                  <SelectItem value="ca">California</SelectItem>
                  <SelectItem value="tx">Texas</SelectItem>
                  <SelectItem value="fl">Florida</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Method */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="flex items-center justify-center rounded-full bg-primary/10 w-6 h-6 text-primary text-sm">
              2
            </span>
            Shipping Method
          </CardTitle>
          <CardDescription>Select your preferred shipping option</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="standard" className="space-y-3">
            <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="font-normal cursor-pointer">
                  <div>Standard Shipping</div>
                  <div className="text-sm text-muted-foreground">3-5 business days</div>
                </Label>
              </div>
              <div className="font-medium">$4.99</div>
            </div>
            <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="express" id="express" />
                <Label htmlFor="express" className="font-normal cursor-pointer">
                  <div>Express Shipping</div>
                  <div className="text-sm text-muted-foreground">1-2 business days</div>
                </Label>
              </div>
              <div className="font-medium">$12.99</div>
            </div>
            <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="overnight" id="overnight" />
                <Label htmlFor="overnight" className="font-normal cursor-pointer">
                  <div>Overnight Shipping</div>
                  <div className="text-sm text-muted-foreground">Next business day</div>
                </Label>
              </div>
              <div className="font-medium">$24.99</div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="flex items-center justify-center rounded-full bg-primary/10 w-6 h-6 text-primary text-sm">
              3
            </span>
            Payment Information
          </CardTitle>
          <CardDescription>Enter your payment details</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="card">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="card" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Credit Card
              </TabsTrigger>
              <TabsTrigger value="paypal">
                <svg className="h-4 w-4 mr-2 inline" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19.5 8.5H4.5C3.4 8.5 2.5 9.4 2.5 10.5V17.5C2.5 18.6 3.4 19.5 4.5 19.5H19.5C20.6 19.5 21.5 18.6 21.5 17.5V10.5C21.5 9.4 20.6 8.5 19.5 8.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 15.5H7.01"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.5 11.5H20.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                PayPal
              </TabsTrigger>
              <TabsTrigger value="apple">
                <svg className="h-4 w-4 mr-2 inline" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 15V9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 12H15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Apple Pay
              </TabsTrigger>
            </TabsList>

            <TabsContent value="card" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="card-name">Name on Card</Label>
                <Input id="card-name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="1234 5678 9012 3456" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" required />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="save-card" />
                <Label htmlFor="save-card" className="text-sm font-normal">
                  Save card for future purchases
                </Label>
              </div>
            </TabsContent>

            <TabsContent value="paypal" className="mt-4">
              <div className="text-center p-6 border rounded-md">
                <p className="mb-4">You will be redirected to PayPal to complete your payment.</p>
                <Button type="button" className="w-full">
                  Continue with PayPal
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="apple" className="mt-4">
              <div className="text-center p-6 border rounded-md">
                <p className="mb-4">You will be redirected to Apple Pay to complete your payment.</p>
                <Button type="button" className="w-full">
                  Continue with Apple Pay
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex-col space-y-4">
          <Separator />
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" required />
            <Label htmlFor="terms" className="text-sm font-normal">
              I agree to the{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Complete Purchase"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

