import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { getPastes, deletePaste, clearAllPastes, CodePaste } from "@/lib/storage";
import { PasteItem } from "@/components/PasteItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { History, Search, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const RecentPastes = () => {
  const navigate = useNavigate();
  const [pastes, setPastes] = useState<CodePaste[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPastes, setFilteredPastes] = useState<CodePaste[]>([]);

  const loadPastes = () => {
    const allPastes = getPastes();
    setPastes(allPastes);
    setFilteredPastes(allPastes);
  };

  useEffect(() => {
    loadPastes();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPastes(pastes);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = pastes.filter(
      (paste) =>
        paste.title.toLowerCase().includes(query) ||
        paste.language.toLowerCase().includes(query) ||
        paste.code.toLowerCase().includes(query)
    );
    setFilteredPastes(filtered);
  }, [searchQuery, pastes]);

  const handleDelete = (id: string) => {
    deletePaste(id);
    loadPastes();
    toast.success("Paste deleted");
  };

  const handleClearAll = () => {
    if (pastes.length === 0) return;

    if (confirm("Are you sure you want to clear all pastes?")) {
      clearAllPastes();
      loadPastes();
      toast.success("All pastes cleared");
    }
  };

  const handleLoadPaste = (paste: CodePaste) => {
    navigate("/editor", { state: { paste } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <History className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">Recent Pastes</h2>
              </div>
              <p className="text-muted-foreground">
                Browse and manage your code snippet history
              </p>
            </div>
            {pastes.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleClearAll}
                className="gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </Button>
            )}
          </div>

          {pastes.length > 0 && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, language, or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          )}

          {filteredPastes.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <History className="w-16 h-16 mx-auto text-muted-foreground opacity-50" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  {searchQuery ? "No pastes found" : "No pastes yet"}
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? "Try a different search term"
                    : "Start creating and sharing code snippets to see them here"}
                </p>
              </div>
              {!searchQuery && (
                <Button onClick={() => navigate("/editor")} className="mt-4">
                  Create Your First Paste
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPastes.map((paste) => (
                <PasteItem
                  key={paste.id}
                  paste={paste}
                  onLoad={handleLoadPaste}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {filteredPastes.length > 0 && (
            <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
              Showing {filteredPastes.length} of {pastes.length} pastes
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RecentPastes;
