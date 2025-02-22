import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {Link} from "react-router-dom";
import ProductItem from "../components/ProductItem";

export default function Home() {
  const [makeupProducts, setMakeupProducts] = useState([]);
  const [skincareProducts, setSkincareProducts] = useState([]);
  const [hairProducts, setHairProducts] = useState([]);
  const [bodyProducts, setBodyProducts] = useState([]);
  const [perfumeProducts, setPerfumeProducts] = useState([]);
  const [toolsProducts, setToolsProducts] = useState([]);
  console.log(makeupProducts)
  useEffect(() => {
    const fetchmakeupProducts = async () => {
      try{
        const res = await fetch('/api/product/get?category=Makeup&limit=4')
        const data = await res.json()
        setMakeupProducts(data.products)
        
        return fetchskinCareProducts()
      } catch(error){
        console.log(error)
      }
    }

    const fetchskinCareProducts = async () => {
      try{
        const res = await fetch('/api/product/get?category=Skincare&limit=4')
        const data = await res.json()
        setSkincareProducts(data.products)
        return fetchhairProducts()
      } catch(error){
        console.log(error)
      }
    }
    const fetchhairProducts = async () => {
      try{
        const res = await fetch('/api/product/get?category=Haircare&limit=4')
        const data = await res.json()
        setHairProducts(data.products)
        return fetchbodyProducts()
      } catch(error){
        console.log(error)
      }
      }
      const fetchbodyProducts = async () => {
        try{
          const res = await fetch('/api/product/get?category=Body Care&limit=4')
          const data = await res.json()
          setBodyProducts(data.products)
          return fetchperfumeProducts()
          } catch(error){
            console.log(error)
          }
      }
      const fetchperfumeProducts = async () => {
        try{
          const res = await fetch('/api/product/get?category=Fragrances&limit=4')
          const data = await res.json()
          setPerfumeProducts(data.products)
          return fetchToolsProducts()
        }
        catch(error){
          console.log(error)
        }
      }
      const fetchToolsProducts = async () => {
        try {
        const res = await fetch('/api/product/get?category=Tools & Accessories&limit=4')
        const data = await res.json()
        setToolsProducts(data.products)
        } catch(error){
          console.log(error)
        }
      };
      fetchmakeupProducts();
  },[])
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-3 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-burg-500 font-bold text-5xl">Luxury Looks at <span className="text-burgundy/55">Affordable</span><br/> Prices,
        Beauty That Fits Your Budget.</h1>
        <p className="text-burgundy/65 text-sm sm:text-sm font-medium">Discover premium products at unbeatable prices. Shop, save, and slay effortlessly!</p>
      <Link to={'/search'} className="text-slate-600 text-xs sm:text-sm font-bold hover:underline">
        Lets get started...
      </Link>
      
      </div>

      {/* swiper */}
      <Swiper spaceBetween={50} slidesPerView={3} autoplay={{"delay": 2500, "disableOnInteraction": false}} loop = {true} modules={[Navigation, Autoplay]}>
        <SwiperSlide>
          <img src="/home1.jpg" alt="" className="w-full h-[400px] sm:object-cover "/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/home4.jpg" alt="" className="w-full h-[400px] sm:object-cover"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/home2.jpg" alt="" className="w-full h-[400px] sm:object-cover"/>
        </SwiperSlide>
        
        <SwiperSlide>
          <img src="/home3.jpg" alt="" className="w-full h-[400px] sm:object-cover"/>
        </SwiperSlide>
        
      </Swiper>
      {/* products for category */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10"> 
        {makeupProducts && makeupProducts.length > 0 && (
          <div className="">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-slate-600">Recent Makeup Products</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={"/search?category=Makeup"}>View All</Link>
            </div>
            <div className="flex flex-wrap gap-4 mt-5">
              {makeupProducts.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
        {skincareProducts && skincareProducts.length > 0 && (
          <div className="">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-slate-600">Recent Skin Care Products</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={"search?category=Skincare"}>View All</Link>
            </div>
            <div className="flex flex-wrap gap-4 mt-5">
              {skincareProducts.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
        {hairProducts && hairProducts.length > 0 && (
          <div className="">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-slate-600">Recent Hair Care Products</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={"/search?category=Haircare"}>View All</Link>
            </div>
            <div className="flex flex-wrap gap-4 mt-5">
              {hairProducts.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
        {bodyProducts && bodyProducts.length > 0 && (
          <div className="">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-slate-600">Recent Body Care Products</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={"/search?category=Body Care"}>View All</Link>
            </div>
            <div className="flex flex-wrap gap-4 mt-5">
              {bodyProducts.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
        {perfumeProducts && perfumeProducts.length > 0 && (
          <div className="">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-slate-600">Recent Fragrance Products</h2>
              <Link className="text-sm text-blue-800 hover:underline" to="{/search?category=Fragrances}">View All</Link>
            </div>
            <div className="flex flex-wrap gap-4 mt-5">
              {perfumeProducts.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
        {toolsProducts && toolsProducts.length > 0 && (
          <div className="">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-slate-600">Recent Accessories</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={"/search?category=Tools & Accessories"}>View All</Link>
            </div>
            <div className="flex flex-wrap gap-4 mt-5">
              {toolsProducts.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}

