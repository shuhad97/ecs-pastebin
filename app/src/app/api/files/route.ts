import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET() {
  try {
    const { blobs } = await list();
    
    // Sort by uploadedAt in descending order
    const files = blobs.map(blob => ({
      url: blob.url,
      name: blob.pathname,
      uploadedAt: blob.uploadedAt,
      size: blob.size
    })).sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());

    return NextResponse.json({ files });
  } catch (error) {
    console.error('Failed to list files:', error);
    return NextResponse.json(
      { error: 'Failed to list files' },
      { status: 500 }
    );
  }
} 