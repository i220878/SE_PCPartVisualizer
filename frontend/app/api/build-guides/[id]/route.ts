import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const guide = await prisma.buildGuide.findUnique({
      where: { id: params.id },
      include: {
        author: true,
        components: {
          include: { component: { include: { specs: true } } }
        },
        images: true,
        comments: true,
      },
    });
    if (!guide) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(guide);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch build guide" }, { status: 500 });
  }
}
