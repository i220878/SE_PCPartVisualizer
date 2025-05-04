import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

// Optional: set this in your .env
const PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, authorId, components, shared } = body;

    // Validate payload
    if (!components || !Array.isArray(components) || components.length === 0) {
      return NextResponse.json(
        { error: 'Invalid payload: components array required.' },
        { status: 400 }
      );
    }

    // Generate an ID for the build
    const id = randomUUID();
    const now = new Date();

    // Create the UserBuild and its components
    const userBuild = await prisma.UserBuild.create({
      data: {
        id: uuidv4(),
        title: title?.trim() ?? 'Untitled Build',
        description: description?.trim() ?? '',
        authorId: authorId ?? undefined,
        date: now,
        shared: shared ?? false,
        UserBuildComponent: {
          create: components.map((c: any) => ({
            name: c.name,
            brand: c.brand,
            category: c.category,
            price: c.price,
            specs: c.specs ?? {}
          }))
        }
      },
      include: {
        UserBuildComponent: true
      }
    });

    let shareableUrl: string | null = null;
    let linkRecord = null;

    if (userBuild.shared) {
      // Derive full URL
      const origin = new URL(request.url).origin;
      const base = PUBLIC_BASE_URL ?? origin;
      shareableUrl = `${base}/builds/${userBuild.id}`;

      // Persist link
      linkRecord = await prisma.UserBuildImage.create({
        data: {
          userBuildId: userBuild.id,
          url: shareableUrl
        }
      });
    }

    return NextResponse.json({
      success: true,
      build: userBuild,
      shareableUrl,
      linkRecord
    });
  } catch (e) {
    console.error('POST /api/builds/shared error:', e);
    return NextResponse.json(
      { error: 'Failed to create shared build.' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const sharedBuilds = await prisma.UserBuild.findMany({
      where: { shared: true },
      include: {
        UserBuildComponent: true,
        User: {
          select: { id: true, name: true, image: true }
        },
        UserBuildImage: {
          select: { id: true, url: true }
        }
      },
      orderBy: { date: 'desc' },
      take: 10
    });

    return NextResponse.json(sharedBuilds);
  } catch (e) {
    console.error('GET /api/builds/shared error:', e);
    return NextResponse.json(
      { error: 'Failed to retrieve shared builds.' },
      { status: 500 }
    );
  }
}
