import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductItem from '../components/ProductItem';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    category: 'all',
    conditions: [], 
    brand: 'all',
    sort_order: 'createdAt_desc',
  });

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [useSemanticSearch, setUseSemanticSearch] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const categoryFromUrl = urlParams.get('category');
    const conditionsFromUrl = urlParams.get('conditions');
    const brandFromUrl = urlParams.get('brand');
    const sortFromUrl = urlParams.get('sort_order');

    if (
      searchTermFromUrl ||
      categoryFromUrl ||
      conditionsFromUrl ||
      brandFromUrl ||
      sortFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        category: categoryFromUrl || 'all',
        conditions: conditionsFromUrl ? conditionsFromUrl.split(',') : [],
        brand: brandFromUrl || 'all',
        sort_order: sortFromUrl || 'createdAt_desc',
      });
    }


    const fetchProducts = async () => {
      setLoading(true);
      setShowMore(false);
      
      try {
        let res, data;
        
        // Use semantic search if enabled and there's a search term
        if (useSemanticSearch && searchTermFromUrl && searchTermFromUrl.trim() !== '') {
          res = await fetch(`/api/product/semantic-search?q=${encodeURIComponent(searchTermFromUrl)}&limit=20`);
          data = await res.json();
          if (Array.isArray(data)) {
            setProducts(data);
            setShowMore(false);
          }
        } else {
          // Use regular keyword search
          const searchQuery = urlParams.toString();
          res = await fetch(`/api/product/get?${searchQuery}`);
          data = await res.json();
          if (data.products) {
            setShowMore(data.hasMore);
            setProducts(data.products);
          }
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [location.search, useSemanticSearch]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (e.target.id === 'category' || e.target.id === 'brand') {
      setSidebardata({ ...sidebardata, [e.target.id]: e.target.value });
    }

    if (['New', 'Lightly Used', 'Used'].includes(e.target.id)) {
      const updatedConditions = [...sidebardata.conditions];
      if (e.target.checked) {
        if (!updatedConditions.includes(e.target.id)) {
          updatedConditions.push(e.target.id);
        }
      } else {
        const index = updatedConditions.indexOf(e.target.id);
        if (index > -1) {
          updatedConditions.splice(index, 1);
        }
      }
      setSidebardata({ ...sidebardata, conditions: updatedConditions });
    }

    if (e.target.id === 'sort_order') {
      setSidebardata({ ...sidebardata, sort_order: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('category', sidebardata.category);
    if (sidebardata.conditions.length > 0) {
      urlParams.set('conditions', sidebardata.conditions.join(','));
    }
    urlParams.set('brand', sidebardata.brand);
    urlParams.set('sort_order', sidebardata.sort_order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfProducts = products.length;
    const startIndex = numberOfProducts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();

    try {
      const res = await fetch(`/api/product/get?${searchQuery}`);
      const data = await res.json();
      if (data.products) {
        setShowMore(data.hasMore);
        setProducts([...products, ...data.products]);
      }
    } catch (error) {
      console.error('Error fetching more products:', error);
    }
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search products...'
              className='border rounded-lg p-3 w-full'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className='flex items-center gap-2 bg-blue-50 p-3 rounded-lg'>
            <input
              type='checkbox'
              id='semanticSearch'
              checked={useSemanticSearch}
              onChange={(e) => setUseSemanticSearch(e.target.checked)}
              className='w-5 h-5'
            />
            <label htmlFor='semanticSearch' className='text-sm'>
              <span className='font-semibold'>🧠 Smart Search</span>
              <span className='text-gray-600 block text-xs'>Search by meaning (e.g., "bridal makeup" finds elegant wedding products)</span>
            </label>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Category:</label>
            <select
              id='category'
              value={sidebardata.category}
              onChange={handleChange}
              className='border rounded-lg p-3 w-full'
            >
              <option value="all">All Categories</option>
              <option value="Makeup">Makeup</option>
              <option value="Skincare">Skincare</option>
              <option value="Haircare">Haircare</option>
              <option value="Body Care">Body Care</option>
              <option value="Fragrances">Fragrances</option>
              <option value="Tools & Accessories">Tools & Accessories</option>
            </select>
          </div>

          <div className='flex flex-col'>
            <label className='font-semibold'>Condition:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='New'
                checked={sidebardata.conditions.includes('New')}
                onChange={handleChange}
                className='w-5'
              />
              <span>New</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='Lightly Used'
                checked={sidebardata.conditions.includes('Lightly Used')}
                onChange={handleChange}
                className='w-5'
              />
              <span>Lightly Used</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='Used'
                checked={sidebardata.conditions.includes('Used')}
                onChange={handleChange}
                className='w-5'
              />
              <span>Used</span>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Brand:</label>
            <select
              id='brand'
              value={sidebardata.brand}
              onChange={handleChange}
              className='border rounded-lg p-3 w-full'
            >
              <option value="all">All Brands</option>
              <option value="Maybelline">Maybelline</option>
              <option value="MAC">MAC</option>
              <option value="NYX">NYX</option>
              <option value="Yves Saint Laurent">Yves Saint Laurent</option>
              <option value="Rhode">Rhode</option>
              <option value="Fenty Beauty">Fenty Beauty</option>
              <option value="Estee Lauder">Estée Lauder</option>
              <option value="Dior">Dior</option>
              <option value="Urban Decay">Urban Decay</option>
              <option value="Huda Beauty">Huda Beauty</option>
              <option value="Tarte">Tarte</option>
              <option value="Charlotte Tilbury">Charlotte Tilbury</option>
              <option value="Rare Beauty">Rare Beauty</option>
            </select>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
              id='sort_order'
              value={sidebardata.sort_order}
              onChange={handleChange}
              className='border rounded-lg p-3 w-full'
            >
              <option value="createdAt_desc">Latest</option>
              <option value="resalePrice_desc">Price high to low</option>
              <option value="resalePrice_asc">Price low to high</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <button className='bg-burg-600 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Search results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && products.length === 0 && (
            <p className='text-xl text-slate-700'>No products found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
            products &&
            products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}

          {showMore && (
            <button
              onClick={handleShowMore}
              className='text-burg-600 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}