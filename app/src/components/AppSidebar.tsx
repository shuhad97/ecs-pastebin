import { useEffect, useState } from "react";
import { History, Trash2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { CodePaste, getPastes, deletePaste, clearAllPastes } from "@/lib/storage";
import { PasteItem } from "@/components/PasteItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface AppSidebarProps {
  onLoadPaste: (paste: CodePaste) => void;
  currentPasteId?: string;
  onPastesChange: () => void;
}

export function AppSidebar({ onLoadPaste, currentPasteId, onPastesChange }: AppSidebarProps) {
  const { open } = useSidebar();
  const [pastes, setPastes] = useState<CodePaste[]>([]);

  const loadPastes = () => {
    setPastes(getPastes());
  };

  useEffect(() => {
    loadPastes();
  }, []);

  const handleDelete = (id: string) => {
    deletePaste(id);
    loadPastes();
    onPastesChange();
    toast.success("Paste deleted");
  };

  const handleClearAll = () => {
    if (pastes.length === 0) return;
    
    if (confirm("Are you sure you want to clear all pastes?")) {
      clearAllPastes();
      loadPastes();
      onPastesChange();
      toast.success("All pastes cleared");
    }
  };

  return (
    <Sidebar collapsible="icon" className={open ? "w-80" : "w-14"} side="right">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <SidebarTrigger />
        {open && (
          <div className="flex items-center gap-2 flex-1 ml-2">
            <History className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Recent Pastes</h2>
          </div>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          {open && (
            <>
              <div className="flex items-center justify-between px-4 py-2">
                <SidebarGroupLabel>History ({pastes.length})</SidebarGroupLabel>
                {pastes.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearAll}
                    className="h-7 text-xs"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Clear All
                  </Button>
                )}
              </div>

              <SidebarGroupContent>
                <SidebarMenu>
                  <ScrollArea className="h-[calc(100vh-180px)]">
                    <div className="space-y-2 px-4 pb-4">
                      {pastes.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground text-sm">
                          <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>No pastes yet</p>
                          <p className="text-xs mt-1">Share code to save it here</p>
                        </div>
                      ) : (
                        pastes.map((paste) => (
                          <PasteItem
                            key={paste.id}
                            paste={paste}
                            onLoad={onLoadPaste}
                            onDelete={handleDelete}
                            isActive={paste.id === currentPasteId}
                          />
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </SidebarMenu>
              </SidebarGroupContent>
            </>
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
