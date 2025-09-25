'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

export default function AdminPage() {
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    toast({
      variant: "destructive",
      title: "Admin Panel",
      description: "Currently under maintenance"
    });
    
    const timeout = setTimeout(() => {
      router.push('/');
    }, 1500);

    return () => clearTimeout(timeout);
  }, [router, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">Redirecting...</div>
    </div>
  );
} 
