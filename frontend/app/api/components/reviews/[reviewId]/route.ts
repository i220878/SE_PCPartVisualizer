import { NextResponse } from 'next/server';
import { 
  getReviewById, 
  updateReview, 
  deleteReview,
  markReviewHelpful,
  likeReview,
  dislikeReview
} from '@/lib/store/reviews';

interface ReviewParams {
  params: {
    reviewId: string;
  };
}

export async function GET(request: Request, { params }: ReviewParams) {
  try {
    const { reviewId } = params;
    
    // Check if review exists
    const review = getReviewById(reviewId);
    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }
    
    // Return the review data
    return NextResponse.json(review);
  } catch (error) {
    console.error('Error retrieving review:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve review' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: ReviewParams) {
  try {
    const { reviewId } = params;
    const updateData = await request.json();
    
    // Update the review
    const updatedReview = updateReview(reviewId, updateData);
    if (!updatedReview) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedReview);
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: ReviewParams) {
  try {
    const { reviewId } = params;
    
    // Delete the review
    const success = deleteReview(reviewId);
    if (!success) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}