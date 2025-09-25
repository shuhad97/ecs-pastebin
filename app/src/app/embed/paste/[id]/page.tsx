import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EmbedViewer from './EmbedViewer';

export default async function EmbedPastePage({ params }: { params: { id: string } }) {
  const paste = await prisma.paste.findUnique({
    where: { id: params.id },
  });

  if (!paste) notFound();

  return (
    <EmbedViewer content={paste.content} language={paste.language} title={paste.title ?? undefined} />
  );
} 