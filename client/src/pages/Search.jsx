import React from 'react';

export default function Search() {

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Category:</label>
            <select className='border rounded-lg p-3 w-full'>
              <option value="">All Categories</option>
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
              <input type='checkbox' id='new' className='w-5' />
              <span>New</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='Lightly Used' className='w-5' />
              <span>Lightly Used</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='Used' className='w-5' />
              <span>Used</span>
            </div>
          </div>

          {/* Brand */}
          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Brand:</label>
            <select id='brand' className='border rounded-lg p-3 w-full'>

            <option value="Maybelline">Maybelline</option>
                  <option value="MAC">MAC</option>
                  <option value="NYX">NYX</option>
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

          {/* Price Range */}
          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Price Range:</label>
            <input
              type='number'
              id='minPrice'
              placeholder='Min price'
              className='border rounded-lg p-3 w-full'
            />
            <input
              type='number'
              id='maxPrice'
              placeholder='Max price'
              className='border rounded-lg p-3 w-full'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select id='sort_order' className='border rounded-lg p-3 w-full'>
              <option value="createdAt">Latest</option>
              <option value="resalePrice_desc">Price high to low</option>
              <option value="resalePrice_asc">Price low to high</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          <button className='bg-burg-600 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Apply Filters
          </button>
        </form>
      </div>

      
    </div>
  );
}