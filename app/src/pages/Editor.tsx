import { useState } from "react";
import { Header } from "@/components/Header";
import { CodeEditor } from "@/components/CodeEditor";
import { EditorControls } from "@/components/EditorControls";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { toast } from "sonner";
import { savePaste, CodePaste } from "@/lib/storage";

const DEFAULT_CODE = `// Welcome to CodeShare!
// Start typing your code here...

function greet(name) {
  return \`Hello, \${name}! Welcome to CodeShare.\`;
}

console.log(greet("Developer"));`;

const Editor = () => {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState("javascript");
  const [currentPasteId, setCurrentPasteId] = useState<string>();
  const [refreshKey, setRefreshKey] = useState(0);

  const generateTitle = (code: string, language: string): string => {
    const firstLine = code.split('\n').find(line => line.trim().length > 0) || '';
    const cleaned = firstLine.replace(/^(\/\/|#|\/\*|\*|<!--|<!--)/, '').trim();
    if (cleaned.length > 30) {
      return cleaned.substring(0, 30) + '...';
    }
    return cleaned || `${language} snippet`;
  };

  const handleShare = () => {
    const title = generateTitle(code, language);
    const paste = savePaste({ code, language, title });
    setCurrentPasteId(paste.id);
    setRefreshKey(prev => prev + 1);
    
    const shareUrl = `${window.location.origin}/snippet/${paste.id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Share link copied to clipboard!", {
      description: shareUrl,
    });
  };

  const handleLoadPaste = (paste: CodePaste) => {
    setCode(paste.code);
    setLanguage(paste.language);
    setCurrentPasteId(paste.id);
    toast.success("Paste loaded");
  };

  const handlePastesChange = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 px-4 py-8 overflow-auto">
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">
                  Create & Share Code Snippets
                </h2>
                <p className="text-muted-foreground">
                  Write your code, select a language, and share instantly with others
                </p>
              </div>

              <EditorControls
                language={language}
                onLanguageChange={setLanguage}
                code={code}
                onShare={handleShare}
              />

              <CodeEditor
                code={code}
                language={language}
                onChange={(value) => setCode(value || "")}
              />

              <div className="flex items-center justify-center gap-8 py-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>Real-time syntax highlighting</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>16+ programming languages</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>Instant sharing</span>
                </div>
              </div>
            </div>
          </main>
        </div>

        <AppSidebar
          onLoadPaste={handleLoadPaste}
          currentPasteId={currentPasteId}
          onPastesChange={handlePastesChange}
          key={refreshKey}
        />
      </div>
    </SidebarProvider>
  );
};

export default Editor;
