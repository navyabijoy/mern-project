import React from 'react';
import { Upload } from "lucide-react";

export default function CreateProduct() {
  return (
    <main className="p-4 md:p-6 max-w-5xl mx-auto">
      {/* <div className="bg-white shadow-md rounded-lg"> */}
        <div className="p-6 border-gray-200">
          <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800">
            Create a Product
          </h1>
        </div>
        
        <div className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter product name"
                    className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-burg-500 focus:border-burg-500"
                    maxLength="62"
                    minLength="10"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    id="description"
                    placeholder="Enter product description"
                    className="w-full rounded-lg border border-gray-300 p-3 h-32 focus:outline-none focus:ring-2 focus:ring-burg-500 focus:border-burg-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <select 
                    id="brand"
                    className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-burg-500 focus:border-burg-500"
                    required
                  >
                    <option value="" disabled>Select a Brand</option>
                    <option value="Maybelline">Maybelline</option>
                    <option value="MAC">MAC</option>
                    <option value="NYX">NYX</option>
                    <option value="Fenty Beauty">Fenty Beauty</option>
                    <option value="Estee Lauder">Estée Lauder</option>
                    <option value="Dior">Dior</option>
                    <option value="Urban Decay">Urban Decay</option>
                    <option value="Huda Beauty">Huda Beauty</option>
                    <option value="Tarte">Tarte</option>
                    <option value="Charlotte Tilbury">Charlotte Tilbury</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    id="category"
                    className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-burg-500 focus:border-burg-500"
                    required
                  >
                    <option value="" disabled>Select a Category</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Skincare">Skincare</option>
                    <option value="Haircare">Haircare</option>
                    <option value="Body Care">Body Care</option>
                    <option value="Fragrances">Fragrances</option>
                    <option value="Tools & Accessories">Tools & Accessories</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                    <select
                      id="condition"
                      className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-burg-500 focus:border-burg-500"
                      required
                    >
                      <option value="new">New</option>
                      <option value="lightlyUsed">Lightly Used</option>
                      <option value="used">Used</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="swatchTimes" className="block text-sm font-medium text-gray-700 mb-1">Swatch Times</label>
                    <input
                      type="number"
                      id="swatchTimes"
                      min="0"
                      max="5"
                      className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-burg-500 focus:border-burg-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-1">Original Price ($)</label>
                    <input
                      type="number"
                      id="originalPrice"
                      min="1"
                      className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-burg-500 focus:border-burg-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="resalePrice" className="block text-sm font-medium text-gray-700 mb-1">Resale Price ($)</label>
                    <input
                      type="number"
                      id="resalePrice"
                      min="1"
                      className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-burg-500 focus:border-burg-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="checkbox"
                    id="isAuthentic"
                    className="w-5 h-5 rounded border-gray-300 text-burg-600 focus:ring-burg-500"
                  />
                  <label htmlFor="isAuthentic" className="text-sm font-medium text-gray-700">Is Authentic</label>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Images
                    <span className="text-sm text-gray-500 ml-2">(First image will be the cover, max 6)</span>
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <input
                        type="file"
                        id="images"
                        accept="image/*"
                        multiple
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-burg-50 file:text-burg-700 hover:file:bg-burg-100"
                      />
                    </div>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-burg-50 text-burg-700 rounded-lg hover:bg-burg-100 transition-colors"
                    >
                      <Upload size={20} />
                      <span>Upload</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-burg-600 text-white rounded-lg hover:bg-burg-700 transition-colors focus:outline-none focus:ring-2 focus:ring-burg-500 focus:ring-offset-2"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
    </main>
  );
}