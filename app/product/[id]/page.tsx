import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ProductGallery } from "@/components/product-gallery"
import { ProductInfo } from "@/components/product-info"
import { ProductTabs } from "@/components/product-tabs"
import { RecommendedProducts } from "@/components/recommended-products"

// This would typically come from a database or API
const getProductData = (id: string) => {
  // Mock product data
  return {
    id,
    name: "Premium Wireless Noise-Cancelling Headphones",
    price: 299.99,
    originalPrice: 349.99,
    rating: 4.8,
    reviewCount: 412,
    description:
      "Experience premium sound quality with our wireless noise-cancelling headphones. Featuring advanced acoustic technology, these headphones deliver crystal-clear audio with deep bass and crisp highs. The active noise cancellation blocks out ambient noise, allowing you to focus on your music or calls without distractions.",
    features: [
      "Active Noise Cancellation Technology",
      "40-hour Battery Life",
      "Premium Sound Quality",
      "Comfortable Over-Ear Design",
      "Bluetooth 5.0 Connectivity",
      "Built-in Microphone for Calls",
      "Touch Controls on Ear Cups",
      "Fast Charging (5 hours playback from 10 minutes charge)",
    ],
    specifications: {
      Brand: "ShopMarket Audio",
      Model: "SM-WH1000",
      "Color Options": "Black, Silver, Blue",
      Connectivity: "Bluetooth 5.0, 3.5mm Audio Jack",
      "Battery Life": "Up to 40 hours",
      "Charging Time": "3 hours",
      Weight: "250g",
      Dimensions: "7.5 x 6.5 x 3.5 inches",
      Warranty: "2 Years",
    },
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Silver", value: "#C0C0C0" },
      { name: "Blue", value: "#0000FF" },
    ],
    inStock: true,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Electronics",
    subcategory: "Audio",
    tags: ["headphones", "wireless", "noise-cancelling", "premium"],
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductData(params.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container py-6 space-y-10">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4 mr-1" />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/category/${product.category.toLowerCase()}`}>{product.category}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/category/${product.category.toLowerCase()}/${product.subcategory.toLowerCase()}`}>
                {product.subcategory}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <span className="truncate max-w-[200px] inline-block">{product.name}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Gallery */}
          <ProductGallery images={product.images} />

          {/* Product Info */}
          <ProductInfo product={product} />
        </div>

        {/* Product Tabs */}
        <ProductTabs product={product} />

        {/* Recommended Products */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">You May Also Like</h2>
            <Link href="/products" className="text-sm font-medium text-primary">
              View more
            </Link>
          </div>
          <RecommendedProducts currentProductId={product.id} />
        </section>
      </main>
    </div>
  )
}

