"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"

export function FeaturedProducts() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current
    if (!container) return

    setCanScrollLeft(container.scrollLeft > 0)
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkScrollButtons)
      // Initial check
      checkScrollButtons()

      // Check on window resize
      window.addEventListener("resize", checkScrollButtons)

      return () => {
        container.removeEventListener("scroll", checkScrollButtons)
        window.removeEventListener("resize", checkScrollButtons)
      }
    }
  }, [])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  // Sample featured products data
  const featuredProducts = [
    {
      id: "f1",
      name: "Premium Bluetooth Speaker",
      price: 129.99,
      rating: 4.7,
      reviewCount: 342,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "f2",
      name: "Wireless Earbuds",
      price: 89.99,
      rating: 4.5,
      reviewCount: 218,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "f3",
      name: "Smart Home Hub",
      price: 199.99,
      rating: 4.8,
      reviewCount: 156,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "f4",
      name: "Ultra HD Action Camera",
      price: 249.99,
      rating: 4.6,
      reviewCount: 203,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "f5",
      name: "Fitness Smartwatch",
      price: 179.99,
      rating: 4.4,
      reviewCount: 187,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "f6",
      name: "Noise Cancelling Headphones",
      price: 299.99,
      rating: 4.9,
      reviewCount: 412,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
  ]

  return (
    <div className="relative">
      <div ref={scrollContainerRef} className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x">
        {featuredProducts.map((product) => (
          <div key={product.id} className="min-w-[250px] max-w-[250px] snap-start">
            <ProductCard {...product} />
          </div>
        ))}
      </div>

      {/* Scroll buttons */}
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden md:block">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Scroll left</span>
        </Button>
      </div>
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm"
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Scroll right</span>
        </Button>
      </div>
    </div>
  )
}

