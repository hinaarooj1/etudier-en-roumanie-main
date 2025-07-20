// app/signup/page.js
"use client"
import { SignUpForm } from '@/components/auth/SignUpForm';
import { useTheme } from "next-themes";
import Link from 'next/link';

export default function SignUpPage() {

  const { theme, setTheme } = useTheme();
  return (
    <div className={`min-h-screen mb-4 flex items-center justify-center `}>
      <div className={`w-full max-w-md p-8 space-y-8   rounded-lg shadow-md  ${theme === 'light' ? 'bg-white':'border' }`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="mt-2  ">
            Already have an account?{' '}
            <Link href="/signin" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
        <SignUpForm />
      </div>
        
    </div>
  );
}