import { useState, useEffect } from 'react';
import { products } from '../data/products';

export default function useRandomProducts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  return {
    products,
    loading,
    error,
    refreshProducts: () => {
      // Implement refresh logic if needed
    }
  };
}