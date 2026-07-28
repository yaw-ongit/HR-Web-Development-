'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TrainingRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/talent/training/planning');
  }, [router]);

  return null;
}
