import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

type Props = {
  params: {
    id: string;
  };
};



export async function GET() {
  return NextResponse.json({ message: 'Not need to implement get route used for only delete' });
}

export async function DELETE(
  request: NextRequest,
  { params }: Props
) {
  try {
    await prisma.paste.delete({
      where: {
        id: params.id,
      },
    });
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Failed to delete paste:', error);
    return NextResponse.json(
      { error: 'Failed to delete paste' },
      { status: 500 }
    );
  }
} 