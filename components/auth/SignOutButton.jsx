// components/auth/SignOutButton.js
'use client';
import { useRouter } from 'next/navigation';

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await fetch('/api/auth/signout', { method: 'POST' });
    router.refresh();
    router.push('/signin');
  };

  return (
    <button
      onClick={handleSignOut}
      className="border px-4 py-2 rounded hover:bg-gray-100"
    >
      Sign Out
    </button>
  );
}