import { useState } from 'react';
import { ArrowPathIcon as RefreshIcon } from '@heroicons/react/24/outline';
import ProductCard from '../ProductCard/ProductCard';
import useRandomProducts from '../../hooks/useRandomProducts';
import type { Product } from '../../types/';

export default function FeaturedProducts() {
  const { products, loading, error, refreshProducts } = useRandomProducts();

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Featured Products</h2>
          <button 
            onClick={refreshProducts}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-[#468847] text-white rounded hover:bg-[#3a7139] disabled:opacity-50 transition-colors"
          >
            <RefreshIcon className="h-5 w-5" />
            Refresh
          </button>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-[#468847] border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={{
                  ...product,
                  images: product.image ? [product.image] : [],
                  seller: {
                      name: product.seller?.name || 'Unknown Seller',
                      rating: product.rating || 0,
                      profilePicture: '/default-profile.jpg',
                      id: '',
                      location: '',
                      contactNumber: ''
                  },
                  traceability: {
                    farmName: product.seller?.name || 'Unknown Farm',
                    location: product.traceability?.location || 'Unknown Location',
                    harvestDate: '',
                    farmingMethod: '',
                    carbonFootprint: '',
                    transportMethod: '',
                    distributionCenter: '',
                    soilType: '',
                    waterSource: '',
                    pesticides: '',
                    batchNumber: '',
                    packagingDate: '',
                    qualityCertification: ''
                  },
                  deliveryOptions: {
                    pickup: {
                      available: false
                    },
                    standardDelivery: {
                      cost: 10,
                      estimatedTime: '2-3 days'
                    },
                    expressDelivery: {
                      cost: 20,
                      estimatedTime: 'Same day'
                    }
                  },
                  ratings: {
                    average: product.rating || 0,
                    reviews: []
                  }
                }} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}