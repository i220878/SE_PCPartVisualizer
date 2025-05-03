import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { createGuide, getAllGuides } from '@/lib/store/guides';

export async function POST(request: Request) {
  try {
    const guideData = await request.json();
    
    // Validate guide data
    if (!guideData || !guideData.title) {
      return NextResponse.json(
        { error: 'Invalid guide data. Title required.' },
        { status: 400 }
      );
    }

    // Generate a unique ID for the guide
    const guideId = randomUUID();
    
    // Store the guide with metadata
    const guide = createGuide({
      id: guideId,
      ...guideData,
    });

    return NextResponse.json({
      success: true,
      guideId,
      guide,
    });
  } catch (error) {
    console.error('Error creating build guide:', error);
    return NextResponse.json(
      { error: 'Failed to create build guide' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Return all guides
    const guides = getAllGuides();
    
    return NextResponse.json(guides);
  } catch (error) {
    console.error('Error fetching guides:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve guides' },
      { status: 500 }
    );
  }
}