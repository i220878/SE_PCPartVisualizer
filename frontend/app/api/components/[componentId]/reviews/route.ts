import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { componentId: string } }
) {
  try {
    // Get all reviews for this component
    const reviews = await prisma.review.findMany({
      where: { componentId: params.componentId },
      orderBy: { createdAt: 'desc' },
      include: {
        User: {
          select: {
            name: true,
            image: true
          }
        }
      }
    })

    // Calculate average rating
    const averageResult = await prisma.review.aggregate({
      where: { componentId: params.componentId },
      _avg: { rating: true }
    })

    // Calculate rating distribution
    const ratingDistribution = await prisma.review.groupBy({
      by: ['rating'],
      where: { componentId: params.componentId },
      _count: { rating: true }
    })

    // Format rating distribution
    const distributionMap = [0, 0, 0, 0, 0]
    ratingDistribution.forEach(({ rating, _count }) => {
      if (rating >= 1 && rating <= 5) {
        distributionMap[rating - 1] = _count.rating
      }
    })

    return NextResponse.json({
      reviews: reviews.map(review => ({
        id: review.id,
        title: review.title || '',
        content: review.content,
        rating: review.rating,
        createdAt: review.createdAt.toISOString(),
        author: {
          name: review.User?.name || 'Anonymous',
          avatar: review.User?.image || '/placeholder.svg'
        }
      })),
      stats: {
        averageRating: averageResult._avg.rating || 0,
        ratingDistribution: distributionMap
      }
    })

  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve reviews' },
      { status: 500 }
    )
  }
}