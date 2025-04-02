import { useState, useEffect, useCallback } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { products } from '../../data/products';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const isServicesPage = location.pathname === '/services';
  const placeholder = isServicesPage ? "Search for services..." : "Search for products...";

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      onSearch(term);
      setIsSearching(false);
    }, 500),
    [onSearch]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    if (searchTerm.trim()) {
      const searchPath = isServicesPage ? '/services/search' : '/search';
      navigate(`${searchPath}?q=${encodeURIComponent(searchTerm.trim())}`);
      
      // You can add service search logic here when the services data is available
      if (!isServicesPage) {
        const results = products.filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      onSearch(searchTerm);
      setIsSearching(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsSearching(true);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    setIsSearching(false);
    onSearch('');
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className="flex h-10 place-self-center rounded-lg w-1/3 items-center bg-gray-50 shadow-sm hover:shadow transition-shadow duration-200"
    >
      <div className="flex items-center px-3">
        <MagnifyingGlassIcon className={`size-4 ${isSearching ? 'text-[#468847]' : 'text-gray-400'}`} />
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="flex-1 p-2 text-sm bg-transparent focus:outline-none placeholder-gray-400"
      />
      
      {searchTerm && (
        <button 
          type="button"
          onClick={handleClear}
          className="p-2 hover:text-[#468847] transition-colors duration-200"
        >
          <XMarkIcon className="size-4" />
        </button>
      )}
      
      <button 
        type="submit"
        className={`px-4 py-2 rounded-r-lg transition-colors duration-200
          ${searchTerm ? 'bg-[#468847] text-white hover:bg-[#3a7139]' : 'text-gray-400'}`}
      >
        Search
      </button>
    </form>
  );
}