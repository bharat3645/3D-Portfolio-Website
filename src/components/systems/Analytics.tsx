'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // This is a privacy-respecting analytics placeholder.
    // In production, this would initialize a tool like Plausible or Fathom
    // which doesn't use cookies and respects user privacy.
    
    if (process.env.NODE_ENV === 'production') {
      // Example: window.plausible('pageview')
      console.log(`[Analytics] Page view: ${pathname}`);
    }
  }, [pathname, searchParams]);

  return null;
}
