"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

export function AuthCheck({ children, requiredAdmin = false }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const userToken = getCookie('auth-token');
      const adminSession = getCookie('session');

      if (requiredAdmin) {
        if (!adminSession) {
          router.push('/admin');
        }
      } else {
        if (!userToken) {
          router.push('/signin');
        }
      }
    };

    checkAuth();
  }, [router, requiredAdmin]);

  return children;
}