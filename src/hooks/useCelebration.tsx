import confetti from 'canvas-confetti';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type CelebrationOptions = {
  mode?: 'onMount' | 'searchParams';
};

export const useCelebration = (options: CelebrationOptions = {}) => {
  const { mode = 'searchParams' } = options;
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // HANDLERS
  const celebrate = () => {
    const duration = 3000; // in milliseconds

    confetti({
      particleCount: 100,
      spread: 160,
    });

    // Clear confetti after a certain duration
    setTimeout(() => confetti.reset(), duration);
  };

  useEffect(() => {
    if (mode === 'onMount') {
    } else if (mode === 'searchParams' && params.get('celebrate')) {
      celebrate();
      router.replace(pathname);
    }
  }, [params, pathname, router]);
};
