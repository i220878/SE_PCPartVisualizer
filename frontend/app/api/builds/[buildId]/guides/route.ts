import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export async function GET(
  _request: Request,
  { params }: { params: { buildId: string } }
) {
  const { buildId } = params;
  // 1) ensure the build exists
  const build = await prisma.UserBuild.findUnique({ where: { id: buildId } });
  if (!build) {
    return NextResponse.json(
      { error: 'Build not found' },
      { status: 404 }
    );
  }
  // 2) fetch its guides
  const guides = await prisma.BuildGuide.findMany({
    where: { buildId },
    orderBy: { createdAt: 'asc' }
  });
  return NextResponse.json(guides);
}

export async function POST(
  request: Request,
  { params }: { params: { buildId: string } }
) {
  const { buildId } = params;
  const build = await prisma.UserBuild.findUnique({ where: { id: buildId } });
  if (!build) {
    return NextResponse.json(
      { error: 'Build not found' },
      { status: 404 }
    );
  }

  const body = await request.json();
  if (!body?.title) {
    return NextResponse.json(
      { error: 'Invalid guide data. Title is required.' },
      { status: 400 }
    );
  }

  const newGuide = await prisma.BuildGuide.create({
    data: {
      id: randomUUID(),
      buildId,
      title: body.title,
      description: body.description,
      difficulty: body.difficulty ?? 'beginner',
      steps: body.steps ?? [],
    }
  });

  return NextResponse.json({ success: true, guide: newGuide });
}
