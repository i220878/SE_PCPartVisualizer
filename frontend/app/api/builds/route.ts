import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const buildData = await request.json();
    
    // Validate build data
    if (!buildData || !buildData.components || !buildData.components.length) {
      return NextResponse.json(
        { error: 'Invalid build data. Components required.' },
        { status: 400 }
      );
    }

    // Create the build with its components
    const build = await prisma.UserBuild.create({
      data: {
        id: uuidv4(),
        name: buildData.name || 'Untitled Build',
        description: buildData.description,
        isShared: buildData.isShared || false,
        userId: buildData.userId || null,
        // Create components through a nested write
        components: {
          create: buildData.components.map(component => ({
            name: component.name,
            brand: component.brand,
            category: component.category,
            price: component.price,
            specs: component.specs || {}
          }))
        }
      },
      include: {
        components: true
      }
    });

    // Generate shareable URL if the build is shared
    const shareableUrl = build.isShared ? `/builds/${build.id}` : null;
    
    return NextResponse.json({
      success: true,
      buildId: build.id,
      shareableUrl,
      build
    });
  } catch (error) {
    console.error('Error creating build:', error);
    return NextResponse.json(
      { error: 'Failed to create build' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Fetch recent builds, maybe just limit to public/shared ones for now
    const builds = await prisma.build.findMany({
      where: { 
        isShared: true 
      },
      include: {
        components: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10 // Limit to 10 most recent
    });
    
    return NextResponse.json(builds);
  } catch (error) {
    console.error('Error fetching builds:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve builds' },
      { status: 500 }
    );
  }
}