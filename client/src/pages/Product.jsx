import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

export default function Product() {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const params = useParams()
    useEffect(() => { // fetch product data
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/product/get/${params.productId}`);
                const data = await response.json();
                if(data.success === false){
                    setError(true)
                    setLoading(false)
                    return;
                }
                setProduct(data);
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }
        fetchProduct();
}, [params.productId]); // dependency array to prevent infinite loop of fetching data
  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {product && !loading && !error && (
        <div>
          <Swiper navigation>
            {product.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </main>
  )
}
