// hooks/useAuthStatus.js
'use client';
import { useEffect, useState } from 'react';

export function useAuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check client-side cookie
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('auth-token='))
          ?.split('=')[1];
        
        if (token) {
          setIsLoggedIn(true);
          return;
        }

        // Fallback to API check
        const res = await fetch('/api/auth/status');
        const { isLoggedIn } = await res.json();
        setIsLoggedIn(isLoggedIn);
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    checkAuth();
  }, []);

  return isLoggedIn;
}