'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authApi } from '@/features/auth/api';

import {
  ShieldLockIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  LoaderIcon,
  GoogleIcon,
} from '@/components/icons/AuthIcons';
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    // Read directly off window instead of useSearchParams so this static
    // page doesn't need a Suspense boundary just to surface an OAuth error.
    const params = new URLSearchParams(window.location.search);
    const oauthError = params.get('error');
    const reset = params.get('reset');
    if (oauthError) {
      setError(oauthError);
      window.history.replaceState(null, '', window.location.pathname);
    } else if (reset === 'success') {
      setNotice('Your password has been reset. Please sign in with your new password.');
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = authApi.getGoogleLoginUrl();
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Pass requireAdmin = true to enforce ADMIN role restriction
      await authApi.login({ email, password }, true);
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="w-full">
      <div className="bg-white/80 dark:bg-[#0a0a0c]/80 backdrop-blur-2xl border border-gray-200/80 dark:border-white/10 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
        
        {}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldLockIcon className="w-3.5 h-3.5" />
            Admin Portal Access
          </div>

          <Link href="/" className="inline-block mb-4 transition-transform hover:scale-105">
            <img 
              src="https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/Phoenix%20White.png" 
              alt="Phoenix Infotainment Logo" 
              className="h-16 md:h-20 w-auto object-contain hidden dark:block"
            />
            <img 
              src="https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/Phoenix%20Black.png" 
              alt="Phoenix Infotainment Logo" 
              className="h-16 md:h-20 w-auto object-contain block dark:hidden"
            />
          </Link>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-2">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Sign in with administrator credentials to manage Phoenix Infotainment
          </p>
        </div>

        {notice && !error && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
            <p className="font-medium">{notice}</p>
          </div>
        )}

        {}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-start gap-3 animate-shake">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <div className="flex-1">
              <p className="font-semibold text-xs uppercase tracking-wider mb-0.5">Authentication Failed</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Admin Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <MailIcon className="w-5 h-5" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-900 dark:text-white placeholder:text-gray-400 text-sm"
                placeholder="admin@phoenixinfotainment.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <Link href="/forgot-password" className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <LockIcon className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-3.5 bg-gray-50/50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-900 dark:text-white placeholder:text-gray-400 text-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="relative w-full py-3.5 mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group"
          >
            <div className="relative flex items-center justify-center gap-2">
              {isLoading ? (
                <><LoaderIcon className="w-5 h-5 animate-spin" /><span>Verifying Admin Access...</span></>
              ) : (
                <span>Sign In to Admin Dashboard</span>
              )}
            </div>
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-[#121212] text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="mt-6 w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            <GoogleIcon className="w-5 h-5" />
            Sign in with Google
          </button>
        </div>

        {}

        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          Role-Based Access Control Enabled &bull; Secure Connection
        </div>
      </div>
    </div>
  );
}
