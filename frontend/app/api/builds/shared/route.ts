import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch all shared builds with their components
    const sharedBuilds = await prisma.build.findMany({
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
      }
    });
    
    return NextResponse.json(sharedBuilds);
  } catch (error) {
    console.error('Error fetching shared builds:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve shared builds' },
      { status: 500 }
    );
  }
}