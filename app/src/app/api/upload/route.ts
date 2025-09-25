import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file: File | null = formData.get('file') as unknown as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert File to Blob and preserve the original content type
    const bytes = await file.arrayBuffer();
    const contentType = file.type || 'application/octet-stream'; // Default to binary if no type
    const blob = new Blob([bytes], { type: contentType });

    // Upload to Vercel Blob with explicit content type
    const response = await put(file.name, blob, {
      access: 'public',
      addRandomSuffix: true,
      contentType: contentType,
      multipart: true

    });
    
    return NextResponse.json({
      url: response.url,
      success: true
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 