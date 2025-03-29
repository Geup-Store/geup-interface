"use client"

import { useRef, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"

interface RecommendedProductsProps {
  currentProductId: string
}

export function RecommendedProducts({ currentProductId }: RecommendedProductsProps) {
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

  // Sample recommended products data
  const recommendedProducts = [
    {
      id: "r1",
      name: "Wireless Earbuds",
      price: 89.99,
      rating: 4.5,
      reviewCount: 218,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "r2",
      name: "Bluetooth Speaker",
      price: 129.99,
      rating: 4.7,
      reviewCount: 156,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "r3",
      name: "Portable Charger",
      price: 49.99,
      rating: 4.3,
      reviewCount: 92,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "r4",
      name: "Wireless Charging Pad",
      price: 39.99,
      rating: 4.2,
      reviewCount: 78,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "r5",
      name: "Smart Watch",
      price: 199.99,
      rating: 4.6,
      reviewCount: 203,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "r6",
      name: "Fitness Tracker",
      price: 79.99,
      rating: 4.4,
      reviewCount: 187,
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
  ]

  return (
    <div className="relative">
      <div ref={scrollContainerRef} className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x">
        {recommendedProducts.map((product) => (
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

