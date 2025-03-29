import Link from "next/link"
import { Search, ShoppingCart, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CategoryCard } from "@/components/category-card"
import { ProductCard } from "@/components/product-card"
import { PromoBanner } from "@/components/promo-banner"
import { FeaturedProducts } from "@/components/featured-products"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            <span className="text-xl font-bold">ShopMarket</span>
          </Link>

          <div className="hidden md:flex relative w-full max-w-sm mx-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search products..." className="w-full pl-8" />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-10">
        {/* Hero Banner */}
        <section className="w-full">
          <PromoBanner />
        </section>

        {/* Categories */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Shop by Category</h2>
            <Link href="/categories" className="text-sm font-medium text-primary">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <CategoryCard name="Electronics" imageUrl="/placeholder.svg?height=100&width=100" itemCount={120} />
            <CategoryCard name="Fashion" imageUrl="/placeholder.svg?height=100&width=100" itemCount={350} />
            <CategoryCard name="Home & Garden" imageUrl="/placeholder.svg?height=100&width=100" itemCount={210} />
            <CategoryCard name="Beauty" imageUrl="/placeholder.svg?height=100&width=100" itemCount={180} />
            <CategoryCard name="Sports" imageUrl="/placeholder.svg?height=100&width=100" itemCount={95} />
            <CategoryCard name="Toys & Kids" imageUrl="/placeholder.svg?height=100&width=100" itemCount={150} />
          </div>
        </section>

        {/* Featured Products */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Featured Products</h2>
            <Link href="/products" className="text-sm font-medium text-primary">
              View all
            </Link>
          </div>
          <FeaturedProducts />
        </section>

        {/* Popular Products */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Popular Right Now</h2>
            <Link href="/popular" className="text-sm font-medium text-primary">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ProductCard
              id="1"
              name="Wireless Headphones"
              price={79.99}
              rating={4.5}
              reviewCount={128}
              imageUrl="/placeholder.svg?height=200&width=200"
            />
            <ProductCard
              id="2"
              name="Smart Watch"
              price={149.99}
              rating={4.8}
              reviewCount={256}
              imageUrl="/placeholder.svg?height=200&width=200"
            />
            <ProductCard
              id="3"
              name="Portable Speaker"
              price={59.99}
              rating={4.2}
              reviewCount={87}
              imageUrl="/placeholder.svg?height=200&width=200"
            />
            <ProductCard
              id="4"
              name="Fitness Tracker"
              price={49.99}
              rating={4.6}
              reviewCount={192}
              imageUrl="/placeholder.svg?height=200&width=200"
            />
          </div>
        </section>

        {/* Special Offers */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Special Offers</h2>
            <Link href="/offers" className="text-sm font-medium text-primary">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative overflow-hidden rounded-lg bg-primary/10 p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Summer Sale</h3>
              <p className="mb-4">Up to 40% off on selected items</p>
              <Button>Shop Now</Button>
            </div>
            <div className="relative overflow-hidden rounded-lg bg-secondary/10 p-6 text-center">
              <h3 className="text-xl font-bold mb-2">New Arrivals</h3>
              <p className="mb-4">Check out the latest products</p>
              <Button variant="secondary">Explore</Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Best Sellers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Deals & Offers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Account</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Order History
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Help</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Customer Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">About</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2025 ShopMarket. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

