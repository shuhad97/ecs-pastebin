import { Header } from '@/components/Header';
import { PasteList } from '@/components/PasteList';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function RecentPage() {
  const recentPastes = await prisma.paste.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: 50 // Show more pastes on the recent page
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-2 pt-2">
            <h1 className="text-3xl font-extrabold tracking-tight">Recent Pastes</h1>
            <p className="text-foreground/60">
              Browse the latest shared content from the community.
            </p>
            <hr className="my-4 border-foreground/10" />
          </div>
          <div className="bg-white/5 rounded-2xl p-8 shadow-2xl border border-border">
            {recentPastes.length > 0 ? (
              <PasteList pastes={recentPastes} />
            ) : (
              <div className="text-center py-12 text-foreground/60 bg-background/80 rounded-lg border border-foreground/10">
                No pastes found. Be the first to create one!
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 