import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Input validation schema - removing power related parameters
const SearchParamsSchema = z.object({
  category: z.string().nullable().optional(),
  brand: z.string().nullable().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const validatedParams = SearchParamsSchema.parse({
      category: searchParams.get('category'),
      brand: searchParams.get('brand'),
    });

    // Build the where clause dynamically
    const where: any = {};
    
    if (validatedParams.category) {
      where.category = validatedParams.category;
    }
    
    if (validatedParams.brand) {
      where.brand = validatedParams.brand;
    }

    // Query components with the specified filters
    const components = await prisma.component.findMany({
      where,
      include: {
        specs: true,
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      orderBy: {
        brand: 'asc',
      },
    });

    // Calculate average ratings
    const componentsWithRatings = components.map(component => ({
      ...component,
      averageRating: component.reviews.length > 0
        ? component.reviews.reduce((acc, review) => acc + (review.rating || 0), 0) / component.reviews.length
        : null,
    }));
    
    return NextResponse.json(componentsWithRatings);
  } catch (error) {
    console.error('Failed to fetch components:', error);
    return NextResponse.json(
      { error: "Failed to fetch components" },
      { status: 500 }
    );
  }
}
