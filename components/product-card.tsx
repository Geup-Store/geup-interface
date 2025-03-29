import Link from "next/link"
import Image from "next/image"
import { Heart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ProductCardProps {
  id: string
  name: string
  price: number
  rating: number
  reviewCount: number
  imageUrl: string
}

export function ProductCard({ id, name, price, rating, reviewCount, imageUrl }: ProductCardProps) {
  return (
    <Card className="overflow-hidden group">
      <div className="relative">
        <Link href={`/product/${id}`}>
          <div className="aspect-square overflow-hidden">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={name}
              width={300}
              height={300}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />
          </div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Add to wishlist</span>
        </Button>
      </div>
      <CardContent className="p-4">
        <Link href={`/product/${id}`} className="block">
          <h3 className="font-medium line-clamp-1 mb-1">{name}</h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-xs text-muted-foreground">({reviewCount})</span>
        </div>
        <p className="font-semibold">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

