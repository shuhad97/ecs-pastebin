import { NextResponse } from 'next/server';
import { list, del } from '@vercel/blob';

// Vercel Blob automatically handles expiration, so we don't need to do anything
export async function GET() {
  try {
    const { blobs } = await list();
    let deleted = 0;
    const now = Date.now();
    for (const blob of blobs) {
      if (now - new Date(blob.uploadedAt).getTime() > 24 * 60 * 60 * 1000) {
        await del(blob.url);
        deleted++;
      }
    }
    return NextResponse.json({ message: `Deleted ${deleted} blobs older than 24 hours.` });
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 });
  }
} 