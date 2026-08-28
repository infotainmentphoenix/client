'use client';

import { useViralShare } from '@/hooks/useViralShare';

export const ShareButton = ({ title, text, url }: { title: string, text: string, url: string }) => {
  const { share, isSharing, hasShared, isSupported } = useViralShare();

  return (
    <button
      onClick={() => share({ title, text, url })}
      disabled={isSharing}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
    >
      {isSharing ? 'Sharing...' : hasShared ? 'Shared!' : isSupported ? 'Share Article' : 'Copy Link'}
    </button>
  );
};
