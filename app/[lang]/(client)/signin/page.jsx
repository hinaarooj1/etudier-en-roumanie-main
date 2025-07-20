// app/signin/page.js
"use client"
import { useEffect } from 'react';
import { SignInForm } from '@/components/auth/SignInForm';
import Link from 'next/link';

import { useTheme } from "next-themes"; 
export default function SignInPage() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className={`w-full max-w-md p-8 space-y-8   rounded-lg shadow-md  ${theme === 'light' ?  'bg-white':'border' }`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sign in to your account</h1>
          <p className="mt-2  ">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}