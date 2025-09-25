'use client';
import { Editor } from '@monaco-editor/react';
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, Copy, Check, Download, Clock, User, Code2, Link, MessageCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import dynamic from 'next/dynamic';
import { LANGUAGE_EXTENSION_MAP } from '@/components/PasteEditor';

const MonacoEditor = dynamic(() => import('@monaco-editor/react').then(mod => mod.Editor), {
  ssr: false,
  loading: () => <div style={{ height: 600, background: '#1e1e1e' }} />,
});

interface PasteViewerProps {
  paste: {
    content: string;
    language: string;
    title?: string;
    authorName: string;
    createdAt: Date | string;
  };
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

export function PasteViewer({ paste }: PasteViewerProps) {
  const [copied, setCopied] = useState(false);
  const { content, language, title, authorName, createdAt } = paste;
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      // Try using the Clipboard API
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        description: "Content copied to clipboard!",
        duration: 2000,
      });
    } catch (_err) {
      // Fallback method using textarea
      const textarea = document.createElement('textarea');
      textarea.value = content;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast({
          description: "Content copied to clipboard!",
          duration: 2000,
        });
      } catch (_err) {
        toast({
          variant: "destructive",
          title: "Failed to copy",
          description: "Please try selecting and copying manually.",
        });
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title || 'Shared Paste',
          text: `Check out this paste: ${title || 'Untitled'}`,
          url: window.location.href,
        });
        toast({
          description: "Share dialog opened!",
        });
      } else {
        // Fallback to copying URL
        await navigator.clipboard.writeText(window.location.href);
        toast({
          description: "Link copied to clipboard!",
        });
      }
    } catch (_err) {
      toast({
        variant: "destructive",
        title: "Failed to share",
        description: "Please try copying the URL manually.",
      });
    }
  };

  const handleDownload = () => {
    const extension = LANGUAGE_EXTENSION_MAP[language] || 'txt';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title || 'paste'}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        description: "Link copied to clipboard!",
        duration: 2000,
      });
    } catch (_err) {
      toast({
        variant: "destructive",
        title: "Failed to copy link",
        description: "Please try copying the URL manually.",
      });
    }
  };

  const handleWhatsAppShare = () => {
    const text = `${title || 'Untitled Paste'}\n${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Embed code logic
  const embedUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/embed/paste/${typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : ''}`
    : '';
  const embedCode = `<iframe src=\"${embedUrl}\" width=\"100%\" height=\"400\" frameborder=\"0\" style=\"border-radius:8px; background:#1a1a1a;\" allowfullscreen></iframe>`;

  const handleCopyEmbed = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      toast({ description: 'Embed code copied to clipboard!' });
    } catch {
      toast({ title: 'Failed to copy', description: 'Please copy manually.' });
    }
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto p-4">
      <Card className="border-none shadow-2xl bg-background/60 backdrop-blur rounded-2xl">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{title || 'Untitled Paste'}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{authorName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  <span className="capitalize">{language}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 self-end md:self-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="gap-2 hover:bg-foreground/10 active:bg-foreground/20"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {typeof navigator !== 'undefined' && !!navigator.share && (
                    <DropdownMenuItem onClick={handleShare}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share via...
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleWhatsAppShare}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Share on WhatsApp
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleCopyLink}>
                    <Link className="mr-2 h-4 w-4" />
                    Copy link
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="secondary"
                size="sm"
                className="gap-2 hover:bg-foreground/10 active:bg-foreground/20"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="gap-2 hover:bg-foreground/10 active:bg-foreground/20"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          <hr className="my-6 border-foreground/10" />

          <div className="rounded-2xl overflow-hidden border bg-background/70 shadow-lg">
            <MonacoEditor
              height="600px"
              language={language.toLowerCase()}
              value={content}
              theme="vs-dark"
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                padding: { top: 16, bottom: 16 },
                renderLineHighlight: 'all',
                renderWhitespace: 'selection',
                smoothScrolling: true,
                contextmenu: false,
              }}
            />
          </div>

          {/* Embed Section */}
          <div className="mt-10 bg-background/60 rounded-xl p-5 border border-border flex flex-col gap-2">
            <div className="font-semibold mb-1">Embed this paste:</div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                value={embedCode}
                readOnly
                className="w-full px-2 py-1 rounded bg-background border border-border text-xs font-mono focus:outline-none focus:ring-2 focus:ring-foreground/20"
                onFocus={e => e.target.select()}
              />
              <Button size="sm" className="shrink-0 hover:bg-foreground/10 active:bg-foreground/20" onClick={handleCopyEmbed}>Copy</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 