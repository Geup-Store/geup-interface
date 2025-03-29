"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: string[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative rounded-lg overflow-hidden border bg-white aspect-square">
        <div
          className={cn(
            "relative w-full h-full transition-transform duration-300",
            isZoomed ? "cursor-zoom-out" : "cursor-zoom-in",
          )}
          onClick={toggleZoom}
        >
          <Image
            src={images[currentImage] || "/placeholder.svg"}
            alt="Product image"
            fill
            className={cn("object-contain transition-transform duration-300", isZoomed ? "scale-150" : "scale-100")}
          />
        </div>

        {/* Zoom button */}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={toggleZoom}
        >
          <ZoomIn className="h-4 w-4" />
          <span className="sr-only">Zoom image</span>
        </Button>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next image</span>
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={cn(
                "relative w-20 h-20 rounded-md overflow-hidden border flex-shrink-0 transition-all",
                currentImage === index ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100",
              )}
              onClick={() => setCurrentImage(index)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Product thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

