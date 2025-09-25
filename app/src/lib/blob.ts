import { PutBlobResult, del, put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

export async function uploadToBlob(file: File): Promise<PutBlobResult> {
  const blob = await put(file.name, file, {
    access: 'public',
    addRandomSuffix: true
  });
  
  return blob;
}

export async function deleteBlob(url: string) {
  await del(url);
  revalidatePath('/');
} 