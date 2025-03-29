"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock wishlist data
const initialWishlistItems = [
  {
    id: "w1",
    name: "Noise Cancelling Headphones",
    price: 299.99,
    rating: 4.9,
    reviewCount: 412,
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
  },
  {
    id: "w2",
    name: "Smart Home Hub",
    price: 199.99,
    rating: 4.7,
    reviewCount: 156,
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
  },
  {
    id: "w3",
    name: "Ultra HD Action Camera",
    price: 249.99,
    rating: 4.6,
    reviewCount: 203,
    image: "/placeholder.svg?height=200&width=200",
    inStock: false,
  },
]

export function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)
  const [sortBy, setSortBy] = useState("date-added")
  const [searchTerm, setSearchTerm] = useState("")

  const handleRemoveFromWishlist = (itemId: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== itemId))
  }

  const filteredItems = wishlistItems.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "name-desc":
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input placeholder="Search wishlist..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-added">Date Added</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="name-asc">Name: A to Z</SelectItem>
            <SelectItem value="name-desc">Name: Z to A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Wishlist Items */}
      {sortedItems.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative">
                <Link href={`/product/${item.id}`}>
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full transition-transform hover:scale-105"
                    />
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 text-destructive"
                  onClick={() => handleRemoveFromWishlist(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove from wishlist</span>
                </Button>
              </div>
              <CardContent className="p-4">
                <Link href={`/product/${item.id}`} className="block">
                  <h3 className="font-medium line-clamp-1 mb-1">{item.name}</h3>
                </Link>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span className="text-sm font-medium">{item.rating}</span>
                  <span className="text-xs text-muted-foreground">({item.reviewCount})</span>
                </div>
                <p className="font-semibold">${item.price.toFixed(2)}</p>
                <p className={`text-sm ${item.inStock ? "text-green-600" : "text-destructive"}`}>
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" size="sm" disabled={!item.inStock}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg">
          <div className="inline-flex items-center justify-center p-4 bg-muted rounded-full mb-4">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm ? "No items match your search criteria." : "Save items you're interested in for later."}
          </p>
          <Button asChild>
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

