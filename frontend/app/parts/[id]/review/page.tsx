"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"

export default function ReviewFormPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const [rating, setRating] = useState<number | null>(null)
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          componentId: params.id,
          content,
          rating  // rating remains optional
        }),
      })

      if (!response.ok) throw new Error('Submission failed')
      
      router.push(`/parts/${params.id}`)
    } catch (error) {
      console.error('Review submission error:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto p-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Write a Review</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Rating (optional)
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                type="button"
                key={value}
                onClick={() => setRating(prev => prev === value ? null : value)}
                className={`p-2 rounded-md ${
                  rating && rating >= value ? 'bg-amber-500 text-white' : 'bg-gray-100'
                }`}
              >
                <Star className="h-5 w-5 fill-current" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Review *
          </label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[150px]"
            placeholder="Share your experience with this component..."
            required
          />
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </div>
      </form>
    </div>
  )
}