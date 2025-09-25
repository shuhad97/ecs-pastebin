import { prisma } from '@/lib/prisma';
import { PasteViewer } from './PasteViewer';
import { notFound } from 'next/navigation';

export default async function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const paste = await prisma.paste.findUnique({
    where: { id },
  });

  if (!paste) {
    notFound();
  }

  const serializedPaste = {
    ...paste,
    title: paste.title ?? undefined,
    createdAt: paste.createdAt.toISOString(),
  };

  return <PasteViewer paste={serializedPaste} />;
} 