import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserProfile } from "@/components/user-profile"
import { AddressBook } from "@/components/address-book"
import { OrderHistory } from "@/components/order-history"
import { PaymentMethods } from "@/components/payment-methods"
import { AccountSettings } from "@/components/account-settings"
import { Wishlist } from "@/components/wishlist"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container py-6 space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">My Account</h1>

        {/* User Profile Summary */}
        <UserProfile />

        {/* Profile Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 h-auto">
            <TabsTrigger value="orders" className="py-2">
              Orders
            </TabsTrigger>
            <TabsTrigger value="addresses" className="py-2">
              Addresses
            </TabsTrigger>
            <TabsTrigger value="payments" className="py-2">
              Payments
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="py-2">
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="settings" className="py-2">
              Settings
            </TabsTrigger>
            <TabsTrigger value="security" className="py-2">
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <h2 className="text-xl font-semibold">Order History</h2>
            <OrderHistory />
          </TabsContent>

          <TabsContent value="addresses" className="space-y-4">
            <h2 className="text-xl font-semibold">Address Book</h2>
            <AddressBook />
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <h2 className="text-xl font-semibold">Payment Methods</h2>
            <PaymentMethods />
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-4">
            <h2 className="text-xl font-semibold">My Wishlist</h2>
            <Wishlist />
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <h2 className="text-xl font-semibold">Account Settings</h2>
            <AccountSettings />
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <h2 className="text-xl font-semibold">Security</h2>
            <div className="grid gap-6">
              <div className="space-y-4">
                <h3 className="font-medium">Change Password</h3>
                <form className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <label htmlFor="current-password" className="text-sm font-medium">
                      Current Password
                    </label>
                    <input id="current-password" type="password" className="w-full px-3 py-2 border rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="new-password" className="text-sm font-medium">
                      New Password
                    </label>
                    <input id="new-password" type="password" className="w-full px-3 py-2 border rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirm-password" className="text-sm font-medium">
                      Confirm New Password
                    </label>
                    <input id="confirm-password" type="password" className="w-full px-3 py-2 border rounded-md" />
                  </div>
                  <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md">
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

