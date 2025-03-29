import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function PromoBanner() {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-8 md:p-12">
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Summer Collection 2025</h1>
          <p className="text-lg md:text-xl mb-6">Discover our new arrivals with up to 30% off on selected items.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/collection/summer">
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/sale">View Sale</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

