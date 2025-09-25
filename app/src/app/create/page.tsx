import { PasteEditor } from '@/components/PasteEditor';
import { Header } from '@/components/Header';
import { prisma } from '@/lib/prisma';
import { PasteList } from '@/components/PasteList';
export const dynamic = 'force-dynamic';

export default async function CreatePage() {
  const recentPastes = await prisma.paste.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Create New Paste</h2>
            <p className="text-foreground/60">
              Share code snippets, logs, and more with others.
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-8 shadow-xl border border-border">
            <PasteEditor />
          </div>
        </div>
        <div className="space-y-8 flex flex-col h-full">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">Recent Pastes</h2>
            <p className="text-foreground/60">
              Browse the latest shared content from the community.
            </p>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div className="bg-white/5 rounded-xl p-6 shadow-lg border border-border h-full overflow-y-auto max-h-[600px]">
              <PasteList pastes={recentPastes} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 