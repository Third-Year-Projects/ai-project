import { useRouteError, Link } from 'react-router-dom';

export default function ErrorBoundary() {
  const error = useRouteError() as any;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {error.status === 404 ? "Product Not Found" : "Oops! Something went wrong"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {error.status === 404 
              ? "The product you're looking for doesn't exist or has been removed."
              : "We're sorry, but there was an error processing your request."}
          </p>
        </div>
        <div className="mt-4">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#468847] hover:bg-[#3a7139]"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}