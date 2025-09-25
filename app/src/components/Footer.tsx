import Link from 'next/link';
import { Github } from 'lucide-react';
import { Button } from './ui/button';

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved to Lucifer
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Created by Abdul Shaikh</span>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              asChild
            >
              <Link href="https://github.com/Abdul1028" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                @Abdul1028
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
} 