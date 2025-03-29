"use client"
import { Check, Info, MessageSquare, Settings } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ProductReviews } from "@/components/product-reviews"

interface ProductTabsProps {
  product: {
    features: string[]
    specifications: Record<string, string>
    reviewCount: number
  }
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="description" className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          <span className="hidden sm:inline">Description</span>
        </TabsTrigger>
        <TabsTrigger value="specifications" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Specifications</span>
        </TabsTrigger>
        <TabsTrigger value="reviews" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Reviews</span>
          <span className="text-xs bg-muted rounded-full px-2 py-0.5 ml-1">{product.reviewCount}</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="specifications">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
            <div className="grid gap-2">
              {Object.entries(product.specifications).map(([key, value], index) => (
                <div key={index}>
                  <div className="grid grid-cols-2 py-2">
                    <span className="text-muted-foreground">{key}</span>
                    <span>{value}</span>
                  </div>
                  {index < Object.entries(product.specifications).length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reviews">
        <Card>
          <CardContent className="pt-6">
            <ProductReviews reviewCount={product.reviewCount} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

