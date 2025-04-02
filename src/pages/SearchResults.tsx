import { useSearchParams } from 'react-router-dom';
import useRandomProducts from '../hooks/useRandomProducts';


export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const { products, loading } = useRandomProducts();

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">
        Search Results for "{searchQuery}"
      </h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#468847]"></div>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            Found {filteredProducts.length} results
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.category}</p>
                <p className="text-[#468847] font-semibold">${product.price}</p>
              </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No products found</p>
              <p className="text-gray-500 mt-2">Try different search terms</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}