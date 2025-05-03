import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const builds = await prisma.userBuild.findMany({
            include: {
                author: true,
                components: {
                    include: {
                        component: {
                            include: {
                                specs: true,
                            }
                        }
                    }
                },
                images: true,
                comments: true
            }
        });
        return NextResponse.json(builds);
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to GET user builds. "}, { status: 500} );
    }
}