import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.componentId || !body.content) {
      return NextResponse.json(
        { error: 'Component ID and content are required' },
        { status: 400 }
      )
    }

    // Create anonymous review (authorId omitted)
    const review = await prisma.review.create({
      data: {
        componentId: body.componentId,
        content: body.content,
        rating: body.rating || null,
      }
    })

    return NextResponse.json(review)

  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}