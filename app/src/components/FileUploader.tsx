'use client';

import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Upload, Link, AlertCircle, FileIcon, Loader2, Clock, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from './ui/skeleton';

interface UploadedFile {
  url: string;
  name: string;
  uploadedAt: Date;
  size?: number;
}

export function FileUploader() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/files');
      const data = await response.json();
      
      if (data.files) {
        setUploadedFiles(data.files.map((file: any) => ({
          ...file,
          uploadedAt: new Date(file.uploadedAt)
        })));
      }
    } catch (error) {
      console.error('Failed to fetch files:', error);
      toast({
        title: "Error",
        description: "Failed to load files",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

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

    setUploading(true);
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
      if (result.success) {
        setUploadedFiles(prev => [...prev, { 
          url: result.url, 
          name: file.name,
          uploadedAt: new Date()
        }]);
        
        toast({
          description: "File uploaded successfully!",
        });
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
      // Reset file input
      e.target.value = '';
    }
  };

  const handleDownload = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName.split('/').pop() || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      toast({
        description: "Download started!",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Error",
        description: "Failed to download file",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        description: "Link copied to clipboard!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to copy link",
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  return (
    <div className="space-y-8">
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-center w-full">
          <label className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg ${
            uploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-foreground/5'
          }`}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {uploading ? (
                <>
                  <Loader2 className="w-12 h-12 mb-4 text-foreground/60 animate-spin" />
                  <p className="mb-2 text-sm text-foreground/60">
                    Uploading...
                  </p>
                </>
              ) : (
                <>
                  <Upload className="w-12 h-12 mb-4 text-foreground/60" />
                  <p className="mb-2 text-sm text-foreground/60">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-foreground/60">
                    Files up to 50MB (24-hour storage)
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Uploaded Files</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchFiles}
            disabled={loading}
          >
            <Clock className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : uploadedFiles.length > 0 ? (
          <div className="grid gap-4">
            {uploadedFiles.map((file, index) => (
              <Card key={index} className="p-4 hover:bg-foreground/5 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-foreground/5 p-2 rounded-lg">
                      <FileIcon className="w-8 h-8 text-foreground/60" />
                    </div>
                    <div>
                      <p className="font-medium truncate max-w-[200px] sm:max-w-[300px]">
                        {file.name.split('/').pop()}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-foreground/60">
                        <span>{formatDistanceToNow(file.uploadedAt, { addSuffix: true })}</span>
                        {file.size && <span>• {formatFileSize(file.size)}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(file.url)}
                    >
                      <Link className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(file.url, file.name)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8">
            <div className="text-center text-foreground/60">
              <FileIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No files uploaded yet</p>
            </div>
          </Card>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm text-foreground/60">
        <AlertCircle className="w-4 h-4" />
        <p>Files are automatically deleted after 24 hours</p>
      </div>
    </div>
  );
} 