import { CodePaste } from "@/lib/storage";
import { Clock, Code2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface PasteItemProps {
  paste: CodePaste;
  onLoad: (paste: CodePaste) => void;
  onDelete: (id: string) => void;
  isActive?: boolean;
}

export const PasteItem = ({ paste, onLoad, onDelete, isActive }: PasteItemProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(paste.id);
  };

  return (
    <button
      onClick={() => onLoad(paste)}
      className={`w-full text-left p-3 rounded-lg border transition-all hover:border-primary/50 hover:bg-secondary/50 group ${
        isActive ? "border-primary bg-secondary" : "border-border bg-card"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Code2 className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="font-medium text-sm truncate">{paste.title}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleDelete}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
      
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="px-2 py-0.5 rounded bg-secondary border border-border">
          {paste.language}
        </span>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{formatDistanceToNow(paste.timestamp, { addSuffix: true })}</span>
        </div>
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground font-mono truncate">
        {paste.code.split('\n')[0] || "Empty snippet"}
      </div>
    </button>
  );
};
