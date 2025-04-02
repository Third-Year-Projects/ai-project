import { useState, useEffect } from 'react';
import useRandomProducts from '../hooks/useRandomProducts';
import ProductCard from './ProductCard/ProductCard';
import SearchBar from './SearchBar/SearchBar';
import type { Product } from '../types/';

export default function ProductGrid() {
  const { products, loading } = useRandomProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.seller.name.toLowerCase().includes(searchLower) ||
      product.traceability.farmName.toLowerCase().includes(searchLower) ||
      product.traceability.location.toLowerCase().includes(searchLower)
    );
    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-[#468847] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}