import { Link } from 'react-router-dom';

export default function ProductItem({ product, disableFixedWidth = false }) {
  if (!product) return null;
  const truncateDescription = (text, wordLimit) => {
    if(!text) return 'No Description Available';
    const words = text.split(' ');
    return words.length > wordLimit? words.slice(0, wordLimit).join(' ') + '...': text;
  }
  return (
    <div className={`bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full ${disableFixedWidth ? '' : 'sm:w-[330px]'} border border-gray-200`}>
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative">
          <img
            src={product.imageUrls?.[0] }
            alt={product.name }
            className="h-[280px] w-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-2 right-2 bg-burg-600 text-white text-xs font-bold px-2 py-1 rounded-md">
            {product.condition || 'New'}
          </span>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <h3 className="truncate text-lg font-semibold text-gray-900">
            {product.name }
          </h3>
          <p className="text-sm text-gray-600">
            {truncateDescription(product.description,13)}
            </p>
          
          <div className="flex justify-between items-center">
            <p className="text-burg-600 font-bold">{product.brand}</p>
            <p className="text-gray-900 font-semibold text-lg">${product.resalePrice}</p>
          </div>

          <div className="flex justify-between items-center mt-2">
            <p className="text-xs font-medium text-gray-500">{product.category}</p>
            <Link
              to={`/product/${product._id}`}
              className="bg-burg-600 text-white text-sm font-semibold px-3 py-1 rounded-md hover:bg-burg-700 transition"
            >
              View Details
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
}
