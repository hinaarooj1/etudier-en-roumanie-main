import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-center dark:bg-black">
      <div className="max-w-lg  rounded-lg p-8">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          404 - Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn’t find the page you’re looking for. It might have
          been removed or moved to another location.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3   font-medium text-lg rounded-md shadow-sm transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
