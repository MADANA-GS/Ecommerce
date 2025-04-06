import React, { useContext } from "react";
import { AppState } from "../../Context/AppState";
import { Link } from "react-router-dom";

const ShowProduct = () => {
  const { products, loading } = useContext(AppState);

  // Create array for skeleton loading placeholders
  const skeletons = Array.from({ length: 8 });

  return (
    <div className="bg-black min-h-[calc(100vh-4rem)] w-full py-6 px-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {loading
        ? skeletons.map((_, idx) => (
            <div
              key={idx}
              className="bg-zinc-900 rounded-xl shadow-md animate-pulse duration-100 mx-auto w-full max-w-xs flex flex-col"
            >
              <div className="h-52 w-full bg-zinc-800 rounded-t-xl" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-700 rounded w-full" />
                <div className="h-3 bg-gray-700 rounded w-5/6" />
                <div className="h-8 bg-blue-800 rounded mt-4" />
              </div>
            </div>
          ))
        : products.map((product) => (
            <div
              key={product._id}
              className="bg-zinc-900 text-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 mx-auto w-full max-w-xs flex flex-col"
            >
              <div className="h-52 w-full overflow-hidden rounded-t-xl bg-zinc-800 flex items-center justify-center">
                <img
                  src={product.images}
                  alt={product.title}
                  className="h-full w-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-base font-semibold mb-1 truncate">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-sm text-blue-400 font-semibold mt-2">
                    ₹ {product.price}
                  </p>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <Link 
                    to={`/product/${product._id}`}
                    className="mt-4 w-1/2 py-2 bg-blue-600 text-sm text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 text-center  [text-decoration:none]"
                  >
                    View Product
                  </Link>
                  <button className="mt-4 w-1/2 py-2 bg-yellow-600 text-sm font-medium rounded-md hover:bg-yellow-700 transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default ShowProduct;