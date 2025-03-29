import Link from "next/link"
import Image from "next/image"

interface CategoryCardProps {
  name: string
  imageUrl: string
  itemCount: number
}

export function CategoryCard({ name, imageUrl, itemCount }: CategoryCardProps) {
  return (
    <Link href={`/category/${name.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="group flex flex-col items-center p-4 rounded-lg border bg-background hover:bg-accent transition-colors">
        <div className="relative w-16 h-16 mb-3">
          <Image src={imageUrl || "/placeholder.svg"} alt={name} fill className="object-contain" />
        </div>
        <h3 className="text-sm font-medium">{name}</h3>
        <p className="text-xs text-muted-foreground">{itemCount} items</p>
      </div>
    </Link>
  )
}

