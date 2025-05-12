import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { componentId: string } }
) {
  try {
    const specs = await prisma.componentSpec.findMany({
      where: { componentId: params.componentId },
      select: {
        name: true,
        value: true
      }
    })

    return NextResponse.json(specs)
    
  } catch (error) {
    console.error('Error fetching specs:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve specifications' },
      { status: 500 }
    )
  }
}