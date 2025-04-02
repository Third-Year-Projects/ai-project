import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchIcon() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="hover:opacity-80 transition-opacity"
      >
        <MagnifyingGlassIcon className="h-6 w-6 text-white" />
      </button>

      {isSearchOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-2">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#468847]"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch((e.target as HTMLInputElement).value);
              }
            }}
            autoFocus
          />
        </div>
      )}
    </div>
  );
}