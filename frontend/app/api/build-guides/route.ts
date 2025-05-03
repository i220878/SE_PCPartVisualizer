import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const guides = await prisma.buildGuide.findMany({
            include: {
                author: true,
                components: {
                    include: {
                        component: {
                            include: { 
                                specs: true
                            }
                        }
                    }
                },
                images: true,
            },
        });
        return NextResponse.json(guides);
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({error: "Failed to GET build guides "}, {status: 500});
    }
}

export async function POST(req: NextRequest) {
    try {
      const data = await req.json();
      // data should include: title, description, difficulty, estimatedTime, authorId, date, components (array of ids), images (array of urls)
      const guide = await prisma.buildGuide.create({
        data: {
          id: data.id,
          title: data.title,
          description: data.description,
          difficulty: data.difficulty,
          estimatedTime: data.estimatedTime,
          authorId: data.authorId,
          date: new Date(data.date),
          likes: data.likes ?? 0,
          views: data.views ?? 0,
          components: {
            create: data.components.map((componentId: string) => ({
              component: { connect: { id: componentId } },
            })),
          },
          images: {
            create: (data.images ?? []).map((url: string) => ({ url })),
          },
        },
      });
      return NextResponse.json(guide, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Failed to create build guide" }, { status: 500 });
    }
  }
  