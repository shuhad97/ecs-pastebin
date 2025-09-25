import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Creating paste with body:', body);

    const paste = await prisma.paste.create({
      data: {
        content: body.content,
        language: body.language,
        title: body.title || null,
        authorName: body.authorName,
      },
    });
    
    console.log('Paste created successfully:', paste);
    return NextResponse.json(paste);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to create paste', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 