import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
      <p className="text-text-secondary mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <a className="px-6 py-3 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors">
          Go back home
        </a>
      </Link>
    </div>
  );
}