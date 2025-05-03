import { NextResponse } from 'next/server';
import { 
  getGuideById, 
  updateGuide, 
  deleteGuide,
  incrementGuideViews 
} from '@/lib/store/guides';

interface GuideParams {
  params: {
    guideId: string;
  };
}

export async function GET(request: Request, { params }: GuideParams) {
  try {
    const { guideId } = params;
    
    // Check if guide exists
    const guide = getGuideById(guideId);
    if (!guide) {
      return NextResponse.json(
        { error: 'Guide not found' },
        { status: 404 }
      );
    }
    
    // Increment view counter
    incrementGuideViews(guideId);
    
    // Return the guide data
    return NextResponse.json(guide);
  } catch (error) {
    console.error('Error retrieving guide:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve guide' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: GuideParams) {
  try {
    const { guideId } = params;
    const updateData = await request.json();
    
    // Update the guide with new data
    const updatedGuide = updateGuide(guideId, updateData);
    if (!updatedGuide) {
      return NextResponse.json(
        { error: 'Guide not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedGuide);
  } catch (error) {
    console.error('Error updating guide:', error);
    return NextResponse.json(
      { error: 'Failed to update guide' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: GuideParams) {
  try {
    const { guideId } = params;
    
    // Delete the guide
    const success = deleteGuide(guideId);
    if (!success) {
      return NextResponse.json(
        { error: 'Guide not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting guide:', error);
    return NextResponse.json(
      { error: 'Failed to delete guide' },
      { status: 500 }
    );
  }
}