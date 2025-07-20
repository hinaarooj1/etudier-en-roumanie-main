// components/auth/SignInForm.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json(); 
      if (res.status === 401) {
        toast.error(data.error);
        setLoading(false);
        return;
      }
      if (res.status === 201 && data.success === true) {
        toast.success(data.error || 'Please verify your email first.');
        setEmail("")
        setPassword("")
        setLoading(false);
        return;
      }
      if (!res.ok) {
        throw new Error(data.error || 'Sign in failed');
      }
      router.push('/user/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mt-1"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mt-1"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}