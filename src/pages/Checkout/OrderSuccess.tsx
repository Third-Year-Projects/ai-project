import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <CheckCircleIcon className="mx-auto h-16 w-16 text-[#468847]" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Your order is successfully placed
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Thank you for your purchase. Your order has been confirmed and will be processed shortly.
        </p>
        <div className="mt-5 space-x-4">
          <Link
            to="/orders"
            className="inline-flex items-center px-4 py-2 border border-[#468847] text-sm font-medium rounded-md text-[#468847] hover:bg-[#468847] hover:text-white transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            to={`/orders/${orderId}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#468847] hover:bg-[#3a7139] transition-colors"
          >
            View Order
          </Link>
        </div>
      </div>
    </div>
  );
}