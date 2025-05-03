// In-memory database store for component reviews
// This would be replaced with a real database in production

export interface ComponentReview {
  id: string;
  componentId: string;
  componentType: string; // e.g., 'cpu', 'gpu', 'motherboard', etc.
  userId: string;
  username: string;
  rating: number; // 1-5 stars
  title: string;
  content: string;
  pros?: string[];
  cons?: string[];
  verifiedPurchase?: boolean;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  dislikes: number;
  helpfulCount: number;
  reported?: boolean;
}

// Global variable to store reviews across API routes
const reviewsStore: Record<string, ComponentReview> = {};

export function getAllReviews(): ComponentReview[] {
  return Object.values(reviewsStore);
}

export function getReviewById(id: string): ComponentReview | null {
  return reviewsStore[id] || null;
}

export function getReviewsByComponentId(componentId: string): ComponentReview[] {
  return Object.values(reviewsStore)
    .filter(review => review.componentId === componentId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getReviewsByUserId(userId: string): ComponentReview[] {
  return Object.values(reviewsStore)
    .filter(review => review.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function createReview(reviewData: Partial<ComponentReview> & { id: string; componentId: string; userId: string }): ComponentReview {
  const review: ComponentReview = {
    rating: 0,
    title: '',
    content: '',
    componentType: 'unknown',
    username: 'Anonymous',
    createdAt: new Date().toISOString(),
    likes: 0,
    dislikes: 0,
    helpfulCount: 0,
    ...reviewData,
  };
  
  reviewsStore[review.id] = review;
  return review;
}

export function updateReview(id: string, updateData: Partial<ComponentReview>): ComponentReview | null {
  if (!reviewsStore[id]) return null;
  
  reviewsStore[id] = {
    ...reviewsStore[id],
    ...updateData,
    updatedAt: new Date().toISOString(),
  };
  
  return reviewsStore[id];
}

export function deleteReview(id: string): boolean {
  if (!reviewsStore[id]) return false;
  
  delete reviewsStore[id];
  return true;
}

export function markReviewHelpful(id: string): boolean {
  if (!reviewsStore[id]) return false;
  
  reviewsStore[id].helpfulCount += 1;
  return true;
}

export function likeReview(id: string): boolean {
  if (!reviewsStore[id]) return false;
  
  reviewsStore[id].likes += 1;
  return true;
}

export function dislikeReview(id: string): boolean {
  if (!reviewsStore[id]) return false;
  
  reviewsStore[id].dislikes += 1;
  return true;
}

export function getAverageRatingForComponent(componentId: string): number | null {
  const reviews = getReviewsByComponentId(componentId);
  if (reviews.length === 0) return null;
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
}

export function getReviewCountByRating(componentId: string): Record<number, number> {
  const reviews = getReviewsByComponentId(componentId);
  const ratingCounts: Record<number, number> = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
  
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating] += 1;
    }
  });
  
  return ratingCounts;
}