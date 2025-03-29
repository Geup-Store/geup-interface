"use client"

import { useState } from "react"
import { Star, ThumbsDown, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProductReviewsProps {
  reviewCount: number
}

export function ProductReviews({ reviewCount }: ProductReviewsProps) {
  // Mock review data
  const reviews = [
    {
      id: 1,
      author: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2 months ago",
      title: "Excellent sound quality and comfort",
      content:
        "I've been using these headphones for about a month now and I'm extremely impressed with the sound quality. The noise cancellation is top-notch and they're very comfortable to wear for extended periods. Battery life is also excellent.",
      helpful: 24,
      unhelpful: 2,
    },
    {
      id: 2,
      author: "Sarah Miller",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "3 months ago",
      title: "Great headphones, minor connectivity issues",
      content:
        "The sound quality is amazing and the noise cancellation works really well. My only complaint is that I occasionally experience some connectivity issues with my laptop. Otherwise, these are fantastic headphones.",
      helpful: 18,
      unhelpful: 3,
    },
    {
      id: 3,
      author: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "1 month ago",
      title: "Worth every penny",
      content:
        "These are by far the best headphones I've ever owned. The sound is crisp and clear, the noise cancellation is incredible, and they're very comfortable. I can wear them all day without any discomfort.",
      helpful: 32,
      unhelpful: 1,
    },
  ]

  // Mock rating distribution
  const ratingDistribution = {
    5: 70,
    4: 20,
    3: 7,
    2: 2,
    1: 1,
  }

  const [helpfulClicks, setHelpfulClicks] = useState<Record<number, string>>({})

  const handleHelpfulClick = (reviewId: number, type: "helpful" | "unhelpful") => {
    setHelpfulClicks((prev) => {
      // If already clicked the same button, remove the vote
      if (prev[reviewId] === type) {
        const newState = { ...prev }
        delete newState[reviewId]
        return newState
      }
      // Otherwise set or change the vote
      return { ...prev, [reviewId]: type }
    })
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Customer Reviews</h3>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="font-medium">4.6 out of 5</span>
          </div>
          <p className="text-sm text-muted-foreground">Based on {reviewCount} reviews</p>
        </div>

        <div className="space-y-2">
          {Object.entries(ratingDistribution)
            .sort((a, b) => Number(b[0]) - Number(a[0]))
            .map(([rating, percentage]) => (
              <div key={rating} className="flex items-center gap-2">
                <div className="w-12 text-sm">{rating} stars</div>
                <Progress value={percentage} className="h-2" />
                <div className="w-8 text-xs text-muted-foreground">{percentage}%</div>
              </div>
            ))}
        </div>
      </div>

      <Separator />

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={review.avatar} alt={review.author} />
                <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{review.author}</div>
                <div className="text-xs text-muted-foreground">{review.date}</div>
              </div>
            </div>

            <div className="flex items-center gap-1 my-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                />
              ))}
            </div>

            <h4 className="font-medium">{review.title}</h4>
            <p className="text-sm text-muted-foreground">{review.content}</p>

            <div className="flex items-center gap-4 mt-2">
              <Button
                variant="ghost"
                size="sm"
                className={helpfulClicks[review.id] === "helpful" ? "bg-muted" : ""}
                onClick={() => handleHelpfulClick(review.id, "helpful")}
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                Helpful ({helpfulClicks[review.id] === "helpful" ? review.helpful + 1 : review.helpful})
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={helpfulClicks[review.id] === "unhelpful" ? "bg-muted" : ""}
                onClick={() => handleHelpfulClick(review.id, "unhelpful")}
              >
                <ThumbsDown className="h-4 w-4 mr-2" />
                Not helpful ({helpfulClicks[review.id] === "unhelpful" ? review.unhelpful + 1 : review.unhelpful})
              </Button>
            </div>

            <Separator className="mt-4" />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center">
        <Button variant="outline">Load More Reviews</Button>
      </div>
    </div>
  )
}

