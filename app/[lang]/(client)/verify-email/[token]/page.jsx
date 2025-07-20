// app/verify-email/page.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { use } from 'react';
export default function VerifyEmailPage({ params }) {
  const { token } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('Verifying your email...');
  const [error, setError] = useState(null);

  useEffect(() => {



    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/auth/verify?token=${token}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Verification failed');
        }

        setMessage('Email verified successfully! Redirecting...');
        router.push('/signin')
        return
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setError('No verification token provided');
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center  min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}