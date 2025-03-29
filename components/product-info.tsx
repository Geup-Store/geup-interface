"use client"

import { useState } from "react"
import { Heart, Minus, Plus, Share2, ShoppingCart, Star, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

interface ProductInfoProps {
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
    rating: number
    reviewCount: number
    description: string
    colors: { name: string; value: string }[]
    inStock: boolean
    category: string
    subcategory: string
    tags: string[]
  }
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name)
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>

        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
              />
            ))}
            <span className="ml-2 text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">{product.reviewCount} reviews</span>
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
        {product.originalPrice && (
          <>
            <span className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            <Badge variant="destructive" className="ml-2">
              {discount}% OFF
            </Badge>
          </>
        )}
      </div>

      <p className="text-muted-foreground">{product.description}</p>

      <Separator />

      {/* Color Selection */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <Label htmlFor="color-options" className="text-base">
            Color: <span className="font-medium">{selectedColor}</span>
          </Label>
        </div>
        <RadioGroup
          id="color-options"
          defaultValue={product.colors[0].name}
          onValueChange={setSelectedColor}
          className="flex gap-3"
        >
          {product.colors.map((color) => (
            <div key={color.name} className="flex flex-col items-center gap-1">
              <Label htmlFor={`color-${color.name}`} className="relative cursor-pointer">
                <RadioGroupItem id={`color-${color.name}`} value={color.name} className="sr-only" />
                <div
                  className={`h-8 w-8 rounded-full border-2 ${
                    selectedColor === color.name ? "border-primary" : "border-transparent"
                  }`}
                >
                  <div className="h-full w-full rounded-full" style={{ backgroundColor: color.value }} />
                </div>
              </Label>
              <span className="text-xs">{color.name}</span>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Quantity */}
      <div className="space-y-2">
        <Label htmlFor="quantity" className="text-base">
          Quantity
        </Label>
        <div className="flex items-center">
          <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <div className="w-12 text-center font-medium">{quantity}</div>
          <Button variant="outline" size="icon" onClick={increaseQuantity}>
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
      </div>

      {/* Add to Cart */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="flex-1" size="lg">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
        <Button variant="outline" size="lg">
          <Heart className="mr-2 h-5 w-5" />
          Add to Wishlist
        </Button>
      </div>

      {/* Shipping Info */}
      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="font-medium">Free shipping</p>
            <p className="text-sm text-muted-foreground">Delivery within 3-5 business days</p>
          </div>
        </div>
      </div>

      {/* Share */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {product.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}

