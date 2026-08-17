'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/features/auth/api';

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      const userStr = localStorage.getItem('user');

      if (!token) {
        if (isMounted) setIsAuthenticated(false);
        router.push('/login');
        return;
      }

      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user && user.role === 'ADMIN') {
            if (isMounted) setIsAuthenticated(true);
            return;
          } else {
            
            if (isMounted) setIsAuthenticated(false);
            router.push('/login');
            return;
          }
        } catch (e) {
          
        }
      }

      
      const user = await authApi.getMe();
      if (isMounted) {
        if (user && user.role === 'ADMIN') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push('/login');
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [router]);

  // The access token lives for 15 minutes (ACCESS_TOKEN_EXPIRES_IN on the
  // backend). Proactively swap it for a fresh one every 12 minutes using the
  // 7-day refresh-token cookie so an open admin tab never hits the 15-minute
  // wall in the middle of a session. The 401-triggered refresh in
  // lib/api/client.ts remains as a fallback for tabs that were idle/backgrounded
  // past this interval.
  useEffect(() => {
    if (!isAuthenticated) return;

    const REFRESH_INTERVAL_MS = 12 * 60 * 1000;
    const interval = setInterval(async () => {
      const newToken = await authApi.refresh();
      if (!newToken) {
        router.push('/login?session=expired');
      }
    }, REFRESH_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[#050505] text-gray-500">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium animate-pulse">Verifying Admin Session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
