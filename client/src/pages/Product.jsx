import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import { Link } from "react-router-dom";
import Contact from "../components/Contact";
import SimilarProducts from "../components/SimilarProducts";
import { useSelector } from "react-redux";

export default function Product() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contact, setContact] = useState(null);
  const params = useParams();

  const { currentUser } = useSelector((state) => state.user);

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
        <main className="flex justify-center items-center min-h-[calc(100vh-200px)]">
          <p className="text-2xl text-gray-600">Loading product details...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="flex justify-center items-center min-h-[calc(100vh-200px)]">
          <p className="text-2xl text-red-600">Something went wrong!</p>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="flex justify-center items-center min-h-[calc(100vh-200px)]">
          <p className="text-2xl text-gray-600">The requested product could not be found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="text-burg-600"><li>Home</li></Link>
            <li>/</li>
            <li>{product.category}</li>
            <li>/</li>
            <li className="text-burg-600">{product.name}</li>
          </ol>
        </nav> */}

        <div >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={true}
                pagination={{ clickable: true }}
                spaceBetween={0}
                slidesPerView={1}
                className="rounded-lg product-swiper"
              >
                {product.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <img 
                      src={url} 
                      alt={product.name}
                      className="w-full h-[550px] object-cover rounded-lg"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <p className="text-xs text-gray-500">ID: {params.productId}</p>
                  <h2 className="text-2xl font-bold mt-3 text-gray-900">{product.name}</h2>
                  <p className="text-lg text-gray-600">{product.brand}</p>            
                </div>

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
                    <p className="mt-1 font-medium">{product.swatchedTimes || 0} times</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Authenticity</p>
                    <p className="mt-1 font-medium">{product.isAuthentic ? "Authentic" : "Not Verified"}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
                </div>

                {currentUser && currentUser.id != product.userRef && !contact && (
                  <div className="pt-6">
                    <button 
                      onClick={() => setContact(true)} 
                      className="w-full bg-burg-600 text-white py-3 px-6 rounded-lg uppercase font-medium shadow-sm hover:bg-burg-700 focus:outline-none focus:ring-2 focus:ring-burg-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                      Contact Seller
                    </button>
                  </div>
                )}
                {contact && <Contact product={product} />}
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto pt-4 pb-12 px-4 text-center text-sm text-gray-500">
            Listed on {new Date(product.createdAt).toLocaleDateString()}
          </div>
        </div>
        
        <SimilarProducts productId={params.productId} />
      </main>
    </div>
  );
}