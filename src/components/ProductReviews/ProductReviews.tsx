import { StarIcon } from '@heroicons/react/24/outline';
import { Product } from '../../types/';

interface ProductReviewsProps {
  product: Product;
}

export default function ProductReviews({ product }: ProductReviewsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`h-5 w-5 ${
                i < Math.floor(product.ratings.average)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-lg font-medium">
          {product.ratings.average.toFixed(1)} out of 5
        </span>
      </div>

      <div className="divide-y divide-gray-200">
        {product.ratings.reviews.map((review, idx) => (
          <div key={idx} className="py-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-900">
                {review.user.name}
              </span>
            </div>
            <p className="mt-2 text-gray-600">{review.comment}</p>
            {review.image && (
              <div className="mt-4">
                <img
                  src={review.image}
                  alt="Review"
                  className="h-24 w-24 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}