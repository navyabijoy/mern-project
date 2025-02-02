import { Link } from 'react-router-dom';

export default function ProductItem({ product }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.imageUrls[0]}
          alt={product.name}
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {product.name}
          </p>
          <div className="flex items-center gap-1">
            <p className="text-burg-600 font-bold">
              {product.brand}
            </p>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold">
            ${product.resalePrice}
          </p>
          <div className="font-bold text-xs">
            <p className="mt-1 font-medium capitalize">{product.condition}</p>
          </div>
          <div className="font-bold text-xs">
            <p className="mt-1 font-medium">{product.category}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}