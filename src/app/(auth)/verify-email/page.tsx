'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { authApi } from '@/features/auth/api';

const LoaderIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
);
const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
);
const AlertCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);
const MailIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setErrorMsg('Verification token is missing from the URL.');
      return;
    }

    const verify = async () => {
      try {
        await authApi.verifyEmail(token);
        setStatus('success');
      } catch (err: any) {
        setStatus('error');
        setErrorMsg(err.message || 'Verification failed. Link may be expired.');
      }
    };

    verify();
  }, [token]);

  return (
    <div className="w-full text-center">
      <div className="bg-white/70 dark:bg-[#0a0a0a]/60 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10 p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden">
        
        {status === 'success' && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 bg-teal-500/20 blur-3xl rounded-full" />
        )}

        <div className="relative z-10 flex flex-col items-center">
          
          {status === 'verifying' && (
            <>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-6 relative">
                <LoaderIcon className="w-10 h-10 animate-spin absolute" />
                <MailIcon className="w-6 h-6 animate-pulse" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                Verifying your email
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Please wait a moment while we verify your email address...
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 mb-6">
                <CheckCircleIcon className="w-10 h-10" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                Email Verified!
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Your email address has been successfully verified. You can now sign in to your account.
              </p>
              <Link 
                href="/login" 
                className="w-full max-w-xs py-3.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-medium rounded-xl shadow-lg shadow-teal-500/25 transition-all active:scale-[0.98]"
              >
                Continue to Login
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 mb-6">
                <AlertCircleIcon className="w-10 h-10" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                Verification Failed
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                {errorMsg}
              </p>
              <Link 
                href="/login" 
                className="w-full max-w-xs py-3.5 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white font-medium rounded-xl transition-all"
              >
                Back to Login
              </Link>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="w-full text-center p-8 bg-white/70 dark:bg-[#0a0a0a]/60 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10 rounded-3xl">
        <LoaderIcon className="w-8 h-8 animate-spin mx-auto text-teal-500 mb-2" />
        <p className="text-sm text-gray-500">Loading email verification...</p>
      </div>
    }>
      <VerifyEmailForm />
    </Suspense>
  );
}
