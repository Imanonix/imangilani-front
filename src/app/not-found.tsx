// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-white text-center">
      <h1 className="text-9xl font-bold text-yellow-400">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-500 mt-2">The page you are looking for doesn't exist.</p>
      <Link href="/" className="mt-6 px-4 py-2 bg-yellow-400 text-white rounded-md">
        Go Back Home
      </Link>
    </main>
  )
}