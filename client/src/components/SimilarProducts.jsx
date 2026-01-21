import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductItem from './ProductItem';

export default function SimilarProducts({ productId }) {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/product/similar/${productId}?limit=4`);
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setSimilarProducts(data);
        }
      } catch (error) {
        console.error('Error fetching similar products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchSimilarProducts();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!similarProducts || similarProducts.length === 0) {
    return null;
  }

  return (
    <div className="pt-20 pb-12 px-6 bg-white border-t-2 border-gray-200 mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            You Might Also Like
            <span className="ml-2 text-sm font-normal text-gray-500">
              (AI-powered recommendations)
            </span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarProducts.map((product) => (
            <ProductItem key={product._id} product={product} disableFixedWidth={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
