import { Header } from '@/components/Header';
import { FileUploader } from '@/components/FileUploader';

export default function FilesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Temporary File Sharing</h1>
            <p className="text-foreground/60">
              Upload and share files temporarily. Files are automatically deleted after 24 hours.
            </p>
          </div>
          
          <FileUploader />
        </div>
      </main>
    </div>
  );
} 