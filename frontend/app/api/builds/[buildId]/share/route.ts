import { NextResponse } from 'next/server';
// Double-check this import path and the file content
import { prisma } from '@/lib/prisma';

// Correct signature: use context
export async function POST(request: Request, context: { params: Promise<{ buildId: string }> }) {
  try {
    // --- FIX 1: Await params ---
    const resolvedParams = await context.params;
    const buildId = resolvedParams?.buildId;
    // --- End Fix 1 ---

    if (!buildId) { // Check the resolved buildId
      return NextResponse.json(
        { error: 'Build ID is required' },
        { status: 400 }
      );
    }

    // --- FIX 2: Ensure prisma is valid before using ---
    if (!prisma || !prisma.build) {
         console.error("Prisma client or prisma.build is not initialized correctly.");
         // Log the prisma object itself to see what it is
         console.log("Imported prisma object:", prisma);
         return NextResponse.json({ error: 'Server configuration error (Prisma)' }, { status: 500 });
    }
    // --- End Fix 2 ---


    // If buildId is 'current', create a new build from the request body
    if (buildId === 'current') {
      const buildData = await request.json();

      if (!buildData || !buildData.components || !buildData.components.length) {
        return NextResponse.json(
          { error: 'Invalid build data. Components are required.' },
          { status: 400 }
        );
      }

      try {
        // Now this should work if prisma is imported correctly
        const newBuild = await prisma.build.create({
          data: {
            name: buildData.name || 'Untitled Build',
            description: buildData.description || 'A build created with PC Part Visualizer',
            isShared: true, // Assuming new builds via 'current' are shared immediately
            userId: buildData.userId || null, // Make sure userId is provided if needed
            components: {
              create: buildData.components.map((component: any) => ({ // Add type safety if possible
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

        const shareableUrl = `/builds/${newBuild.id}`;

        return NextResponse.json({
          success: true,
          buildId: newBuild.id, // Return the ID of the *new* build
          shareableUrl,
          build: newBuild
        });
      } catch (error) {
        console.error('Prisma error creating build:', error);
        return NextResponse.json(
          { error: 'Database error while creating build' },
          { status: 500 }
        );
      }
    }

    // --- Logic for existing buildId ---
    let existingBuild;
    try {
      existingBuild = await prisma.build.findUnique({
        where: { id: buildId } // Use the resolved buildId
      });
    } catch (error) {
      console.error('Prisma error finding build:', error);
      return NextResponse.json(
        { error: 'Database error finding build' },
        { status: 500 }
      );
    }

    if (!existingBuild) {
      return NextResponse.json(
        { error: `Build not found with ID: ${buildId}` },
        { status: 404 }
      );
    }

    const updatedBuild = await prisma.build.update({
      where: { id: buildId },
      data: {
        isShared: true,
        updatedAt: new Date()
      },
      include: { components: true }
    });

    const shareableUrl = `/builds/${buildId}`;

    return NextResponse.json({
      success: true,
      buildId, // Return the existing buildId
      shareableUrl,
      build: updatedBuild
    });

  } catch (error) {
    // Catch potential errors like request.json() failing
    console.error('Error in POST /api/builds/[buildId]/share:', error);
    // Check if it's a SyntaxError from invalid JSON
    if (error instanceof SyntaxError) {
        return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to process share request' },
      { status: 500 }
    );
  }
}
