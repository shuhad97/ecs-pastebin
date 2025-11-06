import { Button } from "@/components/ui/button";
import { Copy, Share2, Download } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import { toast } from "sonner";

interface EditorControlsProps {
  language: string;
  onLanguageChange: (value: string) => void;
  code: string;
  onShare: () => void;
}

export const EditorControls = ({ language, onLanguageChange, code, onShare }: EditorControlsProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy code");
    }
  };

  const handleDownload = () => {
    const extensions: Record<string, string> = {
      javascript: "js",
      typescript: "ts",
      python: "py",
      java: "java",
      cpp: "cpp",
      csharp: "cs",
      go: "go",
      rust: "rs",
      php: "php",
      ruby: "rb",
      sql: "sql",
      html: "html",
      css: "css",
      json: "json",
      yaml: "yaml",
      markdown: "md",
    };

    const extension = extensions[language] || "txt";
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `snippet.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Code downloaded!");
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <LanguageSelector value={language} onChange={onLanguageChange} />
      <div className="flex gap-2 ml-auto">
        <Button variant="secondary" size="sm" onClick={handleCopy}>
          <Copy className="w-4 h-4 mr-2" />
          Copy
        </Button>
        <Button variant="secondary" size="sm" onClick={handleDownload}>
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
        <Button size="sm" onClick={onShare} className="bg-gradient-primary hover:opacity-90">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
};
