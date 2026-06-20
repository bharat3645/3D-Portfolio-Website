// app/template.tsx
'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // IMPORTANT: opacity-only. A lingering `filter`/`transform` on this page-root
  // wrapper creates a containing block for position:fixed descendants, which
  // pins the custom cursor / scroll-progress / DotNav to the page so they
  // scroll away after the hero. Opacity does NOT establish a containing block.
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
