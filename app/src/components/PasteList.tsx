import Link from 'next/link';
import { Paste } from '@prisma/client';

interface PasteListProps {
  pastes: Paste[];
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function PasteList({ pastes }: PasteListProps) {
  return (
    <div className="space-y-4">
      {pastes.map((paste) => (
        <Link
          key={paste.id}
          href={`/paste/${paste.id}`}
          className="block p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">
                {paste.title || 'Untitled Paste'}
              </h3>
              <div className="text-sm text-foreground/60 mt-1">
                <span>{paste.authorName}</span>
                <span className="mx-2">•</span>
                <span>{formatDate(paste.createdAt)}</span>
              </div>
            </div>
            <span className="px-2 py-1 rounded-md bg-foreground/10 text-xs font-medium">
              {paste.language}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
} 