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
            // Not an admin
            if (isMounted) setIsAuthenticated(false);
            router.push('/login');
            return;
          }
        } catch (e) {
          // Ignore JSON parse error and fallback to API check
        }
      }

      // Verify token with backend GET /api/auth/me
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
