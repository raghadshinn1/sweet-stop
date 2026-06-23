import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../api';
import { Product } from '../types';

export const useProducts = (category = '', search = '') => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params: any = {};
      if (category) params.category = category;
      if (search) params.search = search;

      const response = await getProducts(params);
      const productsData = response.data || [];

      const mapped = productsData.map((p: any) => ({
        _id: p.id,
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category,
        images: p.images || [],
        image: p.images?.[0],
        stock: p.stock || 0,
        ratings: p.ratings || 0,
        numReviews: p.num_reviews || 0,
        isFeatured: p.is_featured || false,
        isActive: p.is_active !== false
      }));

      setProducts(mapped);
    } catch (err: any) {
      console.error('Fetch products error:', err);
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [category, search]);  // ← dependencies صح

  useEffect(() => {
    fetchProducts();
  }, [category, search]); 

  return { products, loading, error };
};