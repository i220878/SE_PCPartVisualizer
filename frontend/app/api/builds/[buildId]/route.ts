import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { buildId: string } }
) {
  try {
    const { buildId } = params;
    
    // Get build from database with components
    const build = await prisma.build.findUnique({
      where: { id: buildId },
      include: { 
        components: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        }
      }
    });

    // Check if build exists
    if (!build) {
      return NextResponse.json(
        { error: 'Build not found' },
        { status: 404 }
      );
    }

    // If build is not shared and no authentication/authorization is implemented yet,
    // we'll still return it for now (in production, you'd check user permissions)
    
    // Increment view counter
    await prisma.build.update({
      where: { id: buildId },
      data: { views: { increment: 1 } }
    });
    
    // Return the build data
    return NextResponse.json(build);
  } catch (error) {
    console.error('Error retrieving build:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve build' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { buildId: string } }
) {
  try {
    const { buildId } = params;
    const updateData = await request.json();
    
    // Check if build exists
    const existingBuild = await prisma.build.findUnique({
      where: { id: buildId }
    });
    
    if (!existingBuild) {
      return NextResponse.json(
        { error: 'Build not found' },
        { status: 404 }
      );
    }
    
    // Update the build with new data
    const updatedBuild = await prisma.build.update({
      where: { id: buildId },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
      include: { components: true }
    });
    
    return NextResponse.json(updatedBuild);
  } catch (error) {
    console.error('Error updating build:', error);
    return NextResponse.json(
      { error: 'Failed to update build' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { buildId: string } }
) {
  try {
    const { buildId } = params;
    
    // Check if build exists
    const existingBuild = await prisma.build.findUnique({
      where: { id: buildId }
    });
    
    if (!existingBuild) {
      return NextResponse.json(
        { error: 'Build not found' },
        { status: 404 }
      );
    }
    
    // Delete the build and its related components
    await prisma.build.delete({
      where: { id: buildId }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting build:', error);
    return NextResponse.json(
      { error: 'Failed to delete build' },
      { status: 500 }
    );
  }
}