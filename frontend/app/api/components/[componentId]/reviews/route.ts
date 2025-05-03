import { NextResponse } from 'next/server';
import { 
  getReviewsByComponentId,
  getAverageRatingForComponent,
  getReviewCountByRating
} from '@/lib/store/reviews';

interface ComponentParams {
  params: {
    componentId: string;
  };
}

export async function GET(request: Request, { params }: ComponentParams) {
  try {
    const { componentId } = params;
    
    // Get all reviews for this component
    const reviews = getReviewsByComponentId(componentId);
    
    // Get average rating for the component
    const averageRating = getAverageRatingForComponent(componentId);
    
    // Get review count by rating
    const ratingCounts = getReviewCountByRating(componentId);
    
    // Return reviews and statistics
    return NextResponse.json({
      reviews,
      stats: {
        totalReviews: reviews.length,
        averageRating,
        ratingCounts
      }
    });
  } catch (error) {
    console.error('Error retrieving component reviews:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve component reviews' },
      { status: 500 }
    );
  }
}