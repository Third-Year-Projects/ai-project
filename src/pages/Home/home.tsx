import { useState} from 'react';
import { products } from '../../data/products';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import ProductCard from '../../components/ProductCard/ProductCard';
import Hero from '../../components/Hero/Hero';
import ChatBot from '../../components/ChatBot/ChatBot';

export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  const handlePriceChange = (min: number, max: number) => {
    setFilteredProducts(products.filter(product => 
      product.price >= min && product.price <= max
    ));
  };

  const handleCategorySelect = (category: string) => {
    setFilteredProducts(products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    ));
  };

  const handleRatingFilter = (rating: number) => {
    setFilteredProducts(products.filter(product => 
      product.rating >= rating
    ));
  };

  const handleSortChange = (sort: string) => {
    const sorted = [...filteredProducts];
    switch (sort) {
      case 'price_asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating_desc':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Assuming we'll add a date field later
        break;
    }
    setFilteredProducts(sorted);
  };

  const handleAvailabilityChange = (inStock: boolean) => {
    if (inStock) {
      setFilteredProducts(products.filter(product => product.stock > 0));
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <div>
      {/* Remove TestChat component */}
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h1>
        
        <div className="flex gap-8">
          {/* Filter Panel */}
          <div className="flex-none">
            <FilterPanel
              onPriceChange={handlePriceChange}
              onCategorySelect={handleCategorySelect}
              onRatingFilter={handleRatingFilter}
              onSortChange={handleSortChange}
              onAvailabilityChange={handleAvailabilityChange}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ChatBot />
    </div>
  );
}