"use client"

import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AccountSettings() {
  const [settings, setSettings] = useState({
    email: "alex.johnson@example.com",
    marketingEmails: true,
    orderUpdates: true,
    productRecommendations: false,
    darkMode: false,
    language: "english",
    currency: "usd",
  })

  const handleToggle = (key: string) => {
    setSettings({
      ...settings,
      [key]: !settings[key as keyof typeof settings],
    })
  }

  return (
    <Tabs defaultValue="preferences" className="space-y-4">
      <TabsList>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
      </TabsList>

      <TabsContent value="preferences" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>General Preferences</CardTitle>
            <CardDescription>Manage your account preferences and settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select
                id="language"
                className="w-full p-2 border rounded-md"
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <select
                id="currency"
                className="w-full p-2 border rounded-md"
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              >
                <option value="usd">USD ($)</option>
                <option value="eur">EUR (€)</option>
                <option value="gbp">GBP (£)</option>
                <option value="cad">CAD ($)</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>Manage which emails you receive from us</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing">Marketing emails</Label>
                <p className="text-sm text-muted-foreground">Receive emails about new products, features, and more.</p>
              </div>
              <Switch
                id="marketing"
                checked={settings.marketingEmails}
                onCheckedChange={() => handleToggle("marketingEmails")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="orders">Order updates</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails about your orders, shipping, and delivery.
                </p>
              </div>
              <Switch
                id="orders"
                checked={settings.orderUpdates}
                onCheckedChange={() => handleToggle("orderUpdates")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="recommendations">Product recommendations</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails with personalized product recommendations.
                </p>
              </div>
              <Switch
                id="recommendations"
                checked={settings.productRecommendations}
                onCheckedChange={() => handleToggle("productRecommendations")}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="appearance" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how the app looks and feels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Switch between light and dark mode.</p>
              </div>
              <div className="flex items-center">
                <Sun className="h-4 w-4 mr-2" />
                <Switch id="dark-mode" checked={settings.darkMode} onCheckedChange={() => handleToggle("darkMode")} />
                <Moon className="h-4 w-4 ml-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

