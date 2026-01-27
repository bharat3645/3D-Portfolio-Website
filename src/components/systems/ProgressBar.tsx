'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Start loading on path change
    setLoading(true);
    setWidth(30);

    // Complete loading after a delay (simulating navigation end)
    const timer = setTimeout(() => {
      setWidth(100);
      setTimeout(() => {
        setLoading(false);
        setWidth(0);
      }, 500);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[9999] pointer-events-none">
      <div 
        className="h-full bg-accent-primary transition-all duration-500 ease-out shadow-[0_0_10px_#E61E32]"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
