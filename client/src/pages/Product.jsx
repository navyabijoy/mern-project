import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

export default function Product() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/product/get/${params.productId}`);
        const data = await response.json();
        
        if (data.success === false) {
          setError(true);
          return;
        }
        
        setProduct(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [params.productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4">
            <h1 className="text-3xl font-bold text-gray-900">Loading...</h1>
          </div>
        </header> */}
        <main className="flex justify-center items-center min-h-[calc(100vh-200px)]">
          <p className="text-2xl text-gray-600">Loading product details...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4">
            <h1 className="text-3xl font-bold text-gray-900">Error</h1>
          </div>
        </header> */}
        <main className="flex justify-center items-center min-h-[calc(100vh-200px)]">
          <p className="text-2xl text-red-600">Something went wrong!</p>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4">
            <h1 className="text-3xl font-bold text-gray-900">Product Not Found</h1>
          </div>
        </header> */}
        <main className="flex justify-center items-center min-h-[calc(100vh-200px)]">
          <p className="text-2xl text-gray-600">The requested product could not be found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Product Details</h1>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>Home</li>
            <li>/</li>
            <li>{product.category}</li>
            <li>/</li>
            <li className="text-burg-600">{product.name}</li>
          </ol>
        </nav>

        {/* Product Content */}
        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column - Image Gallery */}
            <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
              <Swiper navigation className="rounded-lg overflow-hidden">
                {product.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <div
                      className="h-[550px]"
                      style={{
                        background: `url(${url}) center no-repeat`,
                        backgroundSize: 'cover',
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Right Column - Product Info */}
            <div className="p-6">
              <div className="space-y-6">
                {/* Product Title Section */}
                <p className="text-sm place-items-baseline text-gray-500">ID: {params.productId}</p>

                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
                  <p className="text-lg text-gray-600">{product.brand}</p>
                </div>

                {/* Price Section */}
                <div className="flex justify-between items-center py-4">
                  <div>
                    <p className="text-sm text-gray-500">Original Price</p>
                    <p className="text-lg font-medium line-through">${product.originalPrice}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Resale Price</p>
                    <p className="text-3xl font-bold text-burg-600">${product.resalePrice}</p>
                  </div>
                </div>

                {/* Product Details Grid */}
                <div className="grid grid-cols-2 gap-6 py-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="mt-1 font-medium">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Condition</p>
                    <p className="mt-1 font-medium capitalize">{product.condition}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Times Swatched</p>
                    <p className="mt-1 font-medium">{product.swatchedTimes} times</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Authenticity</p>
                    <p className="mt-1 font-medium">{product.isAuthentic ? "Authentic" : "Not Verified"}</p>
                  </div>
                </div>

                {/* Description Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto py-4 px-4 text-center text-sm text-gray-500">
          Listed on {new Date().toLocaleDateString()}
        </div>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="bg-white shadow mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 text-center text-sm text-gray-500">
          Listed on {new Date().toLocaleDateString()}
        </div>
      </footer> */}
    </div>
  );
}