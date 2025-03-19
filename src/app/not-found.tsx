import Link from "next/link";

export default function page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-8">
        <h1 className="text-9xl font-bold text-white">404</h1>
        <h2 className="text-4xl font-semibold">Page Not Found</h2>
        <p className="text-xl text-gray-400 max-w-md mx-auto">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
