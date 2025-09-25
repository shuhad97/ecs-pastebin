'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  const pathname = usePathname();
  
  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          PasteBin
        </Link>
        
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <Link
              href="/create"
              className={`hover:text-foreground/80 transition-colors ${
                pathname === '/create' ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Create
            </Link>
            <Link
              href="/recent"
              className={`hover:text-foreground/80 transition-colors ${
                pathname === '/recent' ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Recent
            </Link>
            <Link
              href="/files"
              className={`hover:text-foreground/80 transition-colors ${
                pathname === '/files' ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Files
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
} 