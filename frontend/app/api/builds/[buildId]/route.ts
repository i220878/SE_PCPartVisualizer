import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { buildId: string } }
) {
  try {
    // Properly destructure params without await
    const { buildId } = params;
    
    // Get build with correct relations
    const build = await prisma.userBuild.findUnique({
      where: { id: buildId },
      include: { 
        UserBuildComponent: {
          include: {
            Component: {
              include: {
                ComponentSpec: true
              }
            }
          }
        },
        User: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        },
        UserBuildImage: true
      }
    });

    if (!build) {
      return NextResponse.json(
        { error: 'Build not found' },
        { status: 404 }
      );
    }

    // Increment view counter
    await prisma.userBuild.update({
      where: { id: buildId },
      data: { likes: { increment: 1 } }
    });
    
    // Format response with components and image
    return NextResponse.json({
      ...build,
      components: build.UserBuildComponent.map(ubc => ({
        ...ubc.Component,
        specs: ubc.Component.ComponentSpec
      })),
      imageUrl: build.UserBuildImage[0]?.url || null
    });

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
    
    const existingBuild = await prisma.userBuild.findUnique({
      where: { id: buildId }
    });
    
    if (!existingBuild) {
      return NextResponse.json(
        { error: 'Build not found' },
        { status: 404 }
      );
    }
    
    const updatedBuild = await prisma.userBuild.update({
      where: { id: buildId },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
      include: {
        UserBuildComponent: {
          include: {
            Component: true
          }
        }
      }
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
    
    const existingBuild = await prisma.userBuild.findUnique({
      where: { id: buildId }
    });
    
    if (!existingBuild) {
      return NextResponse.json(
        { error: 'Build not found' },
        { status: 404 }
      );
    }
    
    await prisma.userBuild.delete({
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