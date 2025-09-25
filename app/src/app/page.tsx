'use client';

import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Github, Loader2 } from 'lucide-react';
import { CodeIcon, ShareIcon, SpeedIcon } from '@/components/icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isLoadingRecent, setIsLoadingRecent] = useState(false);
  const router = useRouter();

  const handleViewRecent = () => {
    setIsLoadingRecent(true);
    router.push('/recent');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-24 px-4 text-center bg-gradient-to-b from-foreground/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="max-w-3xl mx-auto space-y-8 relative">
          <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            Share Code Snippets Instantly
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            A modern, fast, and easy-to-use pastebin for developers.
            Share code snippets, logs, and more with syntax highlighting.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/create">Create Paste</Link>
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={handleViewRecent}
              disabled={isLoadingRecent}
            >
              {isLoadingRecent ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                'View Recent Pastes'
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-gradient-to-t from-foreground/5 to-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-background/50 backdrop-blur-sm border-foreground/10">
              <CardHeader>
                <div className="w-12 h-12 mb-4 text-foreground/80">
                  <CodeIcon />
                </div>
                <CardTitle>Syntax Highlighting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/60">
                  Support for multiple programming languages with beautiful syntax highlighting.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border-foreground/10">
              <CardHeader>
                <div className="w-12 h-12 mb-4 text-foreground/80">
                  <SpeedIcon />
                </div>
                <CardTitle>Fast & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/60">
                  Built with Next.js and PostgreSQL for maximum performance and reliability.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border-foreground/10">
              <CardHeader>
                <div className="w-12 h-12 mb-4 text-foreground/80">
                  <ShareIcon />
                </div>
                <CardTitle>Easy Sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/60">
                  One-click copy and share functionality for your code snippets.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="space-y-8">
            <Card className="bg-background/50 backdrop-blur-sm border-foreground/10">
              <CardContent className="flex gap-6 p-6">
                <div className="w-12 h-12 shrink-0 rounded-full bg-foreground/10 flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Create a Paste</h3>
                  <p className="text-foreground/60">
                    Write or paste your code, select the language, and add a title.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border-foreground/10">
              <CardContent className="flex gap-6 p-6">
                <div className="w-12 h-12 shrink-0 rounded-full bg-foreground/10 flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Share the Link</h3>
                  <p className="text-foreground/60">
                    Get a unique URL for your paste that you can share with anyone.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border-foreground/10">
              <CardContent className="flex gap-6 p-6">
                <div className="w-12 h-12 shrink-0 rounded-full bg-foreground/10 flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">View and Copy</h3>
                  <p className="text-foreground/60">
                    Recipients can view your code with syntax highlighting and copy it with one click.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-bold">Credits</h2>
          <p className="text-foreground/60">
            Designed and developed with ❤️ by Abdul Shaikh
          </p>
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            asChild
          >
            <Link href="https://github.com/Abdul1028" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5" />
              Follow @Abdul1028 on GitHub
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
