import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { createReview, getAllReviews } from '@/lib/store/reviews';

export async function POST(request: Request) {
  try {
    const reviewData = await request.json();
    
    // Validate review data
    if (!reviewData || !reviewData.componentId || !reviewData.userId || !reviewData.rating) {
      return NextResponse.json(
        { error: 'Invalid review data. Component ID, user ID, and rating are required.' },
        { status: 400 }
      );
    }

    // Generate a unique ID for the review
    const reviewId = randomUUID();
    
    // Store the review
    const review = createReview({
      id: reviewId,
      componentId: reviewData.componentId,
      userId: reviewData.userId,
      ...reviewData,
    });

    return NextResponse.json({
      success: true,
      reviewId,
      review,
    });
  } catch (error) {
    console.error('Error creating component review:', error);
    return NextResponse.json(
      { error: 'Failed to create component review' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Return all reviews
    const reviews = getAllReviews();
    
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve reviews' },
      { status: 500 }
    );
  }
}