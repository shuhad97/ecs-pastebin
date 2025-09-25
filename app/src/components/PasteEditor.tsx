'use client';

import { Editor } from '@monaco-editor/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type * as Monaco from 'monaco-editor';
import { useToast } from "@/hooks/use-toast";

export const LANGUAGE_OPTIONS = [
  { value: 'plaintext', label: 'Plain Text' },
  { value: 'java', label: 'Java' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'rust', label: 'Rust' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'scala', label: 'Scala' },
  { value: 'shell', label: 'Shell/Bash' },
  { value: 'json', label: 'JSON' },
  { value: 'xml', label: 'XML' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'sql', label: 'SQL' },
  { value: 'yaml', label: 'YAML' },
  { value: 'perl', label: 'Perl' },
  { value: 'r', label: 'R' },
  { value: 'dart', label: 'Dart' },
  { value: 'objective-c', label: 'Objective-C' },
  { value: 'matlab', label: 'MATLAB' },
  { value: 'powershell', label: 'PowerShell' },
  { value: 'typescriptreact', label: 'TSX (TypeScript React)' },
  { value: 'javascriptreact', label: 'JSX (JavaScript React)' },
  { value: 'csv', label: 'CSV' },
].sort((a, b) => a.label.localeCompare(b.label));

export const LANGUAGE_EXTENSION_MAP: Record<string, string> = {
  plaintext: 'txt',
  java: 'java',
  javascript: 'js',
  typescript: 'ts',
  python: 'py',
  html: 'html',
  css: 'css',
  c: 'c',
  cpp: 'cpp',
  csharp: 'cs',
  go: 'go',
  php: 'php',
  ruby: 'rb',
  rust: 'rs',
  swift: 'swift',
  kotlin: 'kt',
  scala: 'scala',
  shell: 'sh',
  json: 'json',
  xml: 'xml',
  markdown: 'md',
  sql: 'sql',
  yaml: 'yml',
  perl: 'pl',
  r: 'r',
  dart: 'dart',
  'objective-c': 'm',
  matlab: 'm',
  powershell: 'ps1',
  typescriptreact: 'tsx',
  javascriptreact: 'jsx',
  csv: 'csv',
};

interface MonacoEditorProps {
  value: string | undefined;
  language: string;
  // Add other props as needed
}

export function PasteEditor() {
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('plaintext');
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ url: string, name: string }>>([]);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      toast({
        title: "Error",
        description: "File size should be less than 50MB",
        variant: "destructive"
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const result = await response.json();
      setUploadedFiles(prev => [...prev, { url: result.url, name: file.name }]);
      
      toast({
        description: "File uploaded successfully!",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const data = { 
        content, 
        language, 
        title,
        authorName: authorName || 'Anonymous'
      };
      
      const response = await fetch('/api/pastes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to create paste');
      }
      toast({
        title: "Success",
        description: "Paste created successfully!"
      });
      router.refresh();
      router.push(`/paste/${result.id}`);
    } catch (error) {
      console.error('Failed to create paste:', error);
      toast({
        title: "Error",
        description: "Failed to create paste",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditorWillMount = (monaco: typeof Monaco) => {
    if (!monaco.languages.getLanguages().some((lang: { id: string }) => lang.id === 'java')) {
      monaco.languages.register({ id: 'java' });
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    setContent(value || '');
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-foreground/70">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="My awesome code"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="author" className="block text-sm font-medium text-foreground/70">
            Your Name
          </label>
          <input
            id="author"
            type="text"
            placeholder="Anonymous"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="language" className="block text-sm font-medium text-foreground/70">
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20"
          >
            {LANGUAGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2 sm:self-end">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full px-4 py-2 rounded-lg font-medium transition-opacity focus:outline-none focus:ring-2 focus:ring-foreground/20
              ${isLoading ? 'bg-gray-400 cursor-not-allowed opacity-70' : 'bg-foreground text-background hover:opacity-90'}
            `}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-background" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
                </svg>
                Creating...
              </span>
            ) : (
              "Create Paste"
            )}
          </button>
        </div>
      </div>

      <hr className="my-6 border-foreground/10" />

      <div className="space-y-6">
        <div className="space-y-2 bg-background/80 rounded-lg p-4 border border-foreground/10">
          <label className="block text-sm font-medium text-foreground/70">
            Attach Files (Optional)
          </label>
          <input
            type="file"
            onChange={handleFileUpload}
            className="w-full px-4 py-2 rounded-lg border border-foreground/20 bg-background"
          />
          {uploadedFiles.length > 0 && (
            <div className="space-y-2 mt-2">
              <p className="text-sm font-medium text-foreground/70">Uploaded Files:</p>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline hover:text-blue-700 transition-colors"
                    >
                      {file.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-foreground/20 overflow-hidden mt-4">
          <Editor
            height="600px"
            defaultLanguage="plaintext"
            language={language}
            value={content}
            onChange={handleEditorChange}
            theme="vs-dark"
            beforeMount={handleEditorWillMount}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              tabSize: 2,
              autoIndent: 'advanced',
            }}
          />
        </div>
      </div>
    </div>
  );
} 