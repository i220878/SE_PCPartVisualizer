import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { getGuidesByBuildId, createGuide } from '@/lib/store/guides';
import { getBuildById } from '@/lib/store/builds';

interface BuildGuidesParams {
  params: {
    buildId: string;
  };
}

export async function GET(request: Request, { params }: BuildGuidesParams) {
  try {
    const { buildId } = params;
    
    // Check if build exists
    const build = getBuildById(buildId);
    if (!build) {
      return NextResponse.json(
        { error: 'Build not found' },
        { status: 404 }
      );
    }
    
    // Get all guides for this build
    const guides = getGuidesByBuildId(buildId);
    
    return NextResponse.json(guides);
  } catch (error) {
    console.error('Error retrieving guides for build:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve guides' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request, { params }: BuildGuidesParams) {
  try {
    const { buildId } = params;
    const guideData = await request.json();
    
    // Check if build exists
    const build = getBuildById(buildId);
    if (!build) {
      return NextResponse.json(
        { error: 'Build not found' },
        { status: 404 }
      );
    }
    
    // Validate guide data
    if (!guideData || !guideData.title) {
      return NextResponse.json(
        { error: 'Invalid guide data. Title required.' },
        { status: 400 }
      );
    }

    // Generate a unique ID for the guide
    const guideId = randomUUID();
    
    // Create guide with build reference
    const guide = createGuide({
      id: guideId,
      buildId,
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