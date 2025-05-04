import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function POST(
  request: Request,
  { params }: { params: { buildId: string } }
) {
  try {
    const { buildId } = await params;
    
    if (!buildId) {
      return NextResponse.json({ error: 'Build ID is required' }, { status: 400 });
    }

    if (buildId === 'current') {
      const body = await request.json();
      
      // Validate component data format
      if (!body?.components?.length || !body.components.every((c: any) => 
        c.name && c.brand && c.category && typeof c.price === 'number'
      )) {
        return NextResponse.json(
          { error: 'Invalid component data structure' },
          { status: 400 }
        );
      }

      try {
        const newBuild = await prisma.userBuild.create({
          data: {
            id: uuidv4(),
            title: body.title || 'Untitled Build',
            description: body.description || '',
            date: new Date(),
            shared: true,
            authorId: body.authorId ? Number(body.authorId) : undefined,
            UserBuildComponent: {
              create: await Promise.all(
                body.components.map(async (component) => ({
                  Component: {
                    connectOrCreate: {
                      where: {
                        name_brand_category_price: { // Corrected constraint name
                          name: component.name,
                          brand: component.brand,
                          category: component.category,
                          price: component.price
                        }
                      },
                      create: {
                        name: component.name,
                        brand: component.brand,
                        category: component.category,
                        price: Number(component.price),
                        ComponentSpec: {
                          connectOrCreate: (component.specs || []).map(spec => ({
                            where: {
                              component_spec_unique: {
                                componentId: "", // Will be bound automatically
                                name: spec.name
                              }
                            },
                            create: {
                              name: spec.name.substring(0, 255),
                              value: String(spec.value).substring(0, 511)
                            }
                          }))
                        }
                      }
                    }
                  }
                }))
              )
            }
          },
          include: {
            UserBuildComponent: {
              include: {
                Component: {
                  include: {
                    ComponentSpec: true
                  }
                }
              }
            }
          }
        });

        const origin = process.env.NEXTAUTH_URL || "http://localhost:3000"; ;
        const shareableUrl = `/builds/${newBuild.id}`;

        await prisma.userBuildImage.upsert({
          where: { userBuildId: newBuild.id },
          create: { userBuildId: newBuild.id, url: shareableUrl },
          update: { url: shareableUrl }
        });

        return NextResponse.json({
          success: true,
          shareableUrl,
          build: {
            ...newBuild,
            components: newBuild.UserBuildComponent.map(ubc => ubc.Component)
          }
        });

      } catch (error) {
        console.error('Prisma error:', error);
        return NextResponse.json(
          { error: 'Database operation failed. Check data formats.' },
          { status: 500 }
        );
      }
    }

    // Rest of your existing code for non-current builds...

    // Handle existing build sharing
    const existingBuild = await prisma.userBuild.findUnique({
      where: { id: buildId },
      include: {
        UserBuildComponent: {
          include: {
            component: {
              include: {
                ComponentSpec: true
              }
            }
          }
        }
      }
    });

    if (!existingBuild) {
      return NextResponse.json(
        { error: `No build found for ID ${buildId}` },
        { status: 404 }
      );
    }

    const origin = process.env.NEXTAUTH_URL || "http://localhost:3000"; ;
    const shareableUrl = `/builds/${existingBuild.id}`;

    await prisma.userBuildImage.upsert({
      where: { userBuildId: existingBuild.id },
      update: { url: shareableUrl },
      create: { userBuildId: existingBuild.id, url: shareableUrl }
    });

    return NextResponse.json({
      success: true,
      shareableUrl,
      build: existingBuild
    });

  } catch (error) {
    console.error('Global error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}