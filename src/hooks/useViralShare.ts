'use client';

import { useCallback, useState } from 'react';

interface ShareData {
  title: string;
  text: string;
  url: string;
}

interface UseViralShareReturn {
  share: (data: ShareData) => Promise<void>;
  isSharing: boolean;
  hasShared: boolean;
  isSupported: boolean;
}

/**
 * Invisible Viral Sharing Hook
 * Utilizes the native navigator.share() Web Share API for seamless 1-click sharing.
 * Includes a fallback to copy the link to the clipboard if the Web Share API is unsupported.
 */
export function useViralShare(): UseViralShareReturn {
  const [isSharing, setIsSharing] = useState(false);
  const [hasShared, setHasShared] = useState(false);

  // Check if native share is supported by the browser
  const isSupported = typeof window !== 'undefined' && !!navigator.share;

  const share = useCallback(
    async (data: ShareData) => {
      setIsSharing(true);
      setHasShared(false);

      try {
        if (isSupported) {
          // Trigger native share dialog (WhatsApp, Instagram, etc.)
          await navigator.share(data);
          setHasShared(true);
        } else {
          // Fallback: Copy to clipboard
          await navigator.clipboard.writeText(data.url);
          // Optional: You could trigger a toast notification here
          console.log('Copied to clipboard as fallback!');
          setHasShared(true);
        }
      } catch (error) {
        // Handle AbortError (user closed share sheet without sharing) gracefully
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      } finally {
        setIsSharing(false);
        // Reset hasShared state after 3 seconds
        setTimeout(() => setHasShared(false), 3000);
      }
    },
    [isSupported]
  );

  return { share, isSharing, hasShared, isSupported };
}
