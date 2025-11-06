import { Code2, History, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Code2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CodeShare
              </h1>
              <p className="text-sm text-muted-foreground">Share code instantly</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Share Code Snippets
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Instantly
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Modern code sharing platform with real-time syntax highlighting for 16+
              programming languages. Create, share, and manage your code snippets
              effortlessly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Card className="p-8 hover:border-primary/50 transition-all cursor-pointer group shadow-card">
              <button
                onClick={() => navigate("/editor")}
                className="w-full text-left space-y-4"
              >
                <div className="p-3 bg-gradient-primary rounded-xl w-fit group-hover:shadow-glow transition-all">
                  <Code2 className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground flex items-center justify-between">
                    Create Paste
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="text-muted-foreground">
                    Write and share code with syntax highlighting, multiple language
                    support, and instant clipboard sharing
                  </p>
                </div>
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Monaco Editor</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>16+ Languages</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>One-Click Share</span>
                  </div>
                </div>
              </button>
            </Card>

            <Card className="p-8 hover:border-primary/50 transition-all cursor-pointer group shadow-card">
              <button
                onClick={() => navigate("/recent")}
                className="w-full text-left space-y-4"
              >
                <div className="p-3 bg-secondary rounded-xl w-fit group-hover:bg-primary/10 transition-all">
                  <History className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground flex items-center justify-between">
                    Recent Pastes
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="text-muted-foreground">
                    Browse your paste history, search through snippets, and manage your
                    saved code library
                  </p>
                </div>
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Smart Search</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Quick Load</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Easy Management</span>
                  </div>
                </div>
              </button>
            </Card>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground pt-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Instant sharing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Local storage</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Free forever</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
