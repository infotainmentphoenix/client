'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/features/auth/api';

const LoaderIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
);

export default function GoogleCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const finishLogin = async () => {
      // The backend already set our session cookies; it hands the access
      // token back in the URL fragment (never sent to servers/logs) so the
      // frontend can mirror the same localStorage-backed session that a
      // normal email/password login produces.
      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
      const accessToken = hashParams.get('accessToken');

      // Strip the token out of the URL immediately, whether or not it's present.
      window.history.replaceState(null, '', window.location.pathname);

      if (!accessToken) {
        setError('Google sign-in did not complete. Please try again.');
        return;
      }

      try {
        const user = await authApi.completeGoogleLogin(accessToken);
        if (!user) {
          setError('Could not verify your Google account. Please try again.');
          return;
        }
        router.push('/admin/dashboard');
      } catch (err: any) {
        setError(err.message || 'Google authentication failed.');
      }
    };

    finishLogin();
  }, [router]);

  return (
    <div className="w-full text-center">
      <div className="bg-white/70 dark:bg-[#0a0a0a]/60 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10 p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        {error ? (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Authentication Error</h1>
            <p className="text-red-500 mb-6">{error}</p>
            <button
              onClick={() => router.push('/login')}
              className="px-6 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-black transition-colors"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <LoaderIcon className="w-5 h-5 animate-spin text-blue-500" />
              <span className="font-medium text-lg">Finishing sign in...</span>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              Please wait while we set up your session.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
