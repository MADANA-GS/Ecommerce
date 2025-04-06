import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppState } from "../../Context/AppState";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { loading, setLoading } = useContext(AppState);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setError(null);
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API}/api/products/${id}`
        );
        
        if (data.product) {
          setProduct(data.product);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err.message);
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, setLoading]);

  // Product skeleton loading component
  const ProductSkeleton = () => (
    <div className="container mx-auto px-4 py-8 animate-pulse bg-gray-900">
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Image skeleton */}
          <div className="md:w-1/2 bg-gray-800 p-8">
            <div className="w-full h-80 bg-gray-700 rounded"></div>
          </div>
          
          {/* Details skeleton */}
          <div className="md:w-1/2 p-8">
            <div className="h-4 bg-gray-700 rounded w-1/4 mb-6"></div>
            <div className="h-8 bg-gray-700 rounded w-3/4 mb-6"></div>
            <div className="h-6 bg-gray-700 rounded w-1/4 mb-8"></div>
            
            <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-8"></div>
            
            <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-8"></div>
            
            <div className="h-10 bg-gray-700 rounded w-1/2 mt-8"></div>
          </div>
        </div>
      </div>
    </div>
  );

  // Error component
  const ErrorDisplay = ({ message }) => (
    <div className="container mx-auto px-4 py-16 bg-gray-900">
      <div className="bg-red-900 border border-red-800 rounded-lg p-8 text-center">
        <svg className="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h2 className="mt-4 text-xl font-semibold text-red-200">Error Loading Product</h2>
        <p className="mt-2 text-red-300">{message}</p>
      </div>
    </div>
  );

  if (loading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (!product) {
    return <ErrorDisplay message="Product not found" />;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="md:w-1/2 bg-gray-800 flex items-center justify-center p-6">
              {product.images ? (
                <img
                  src={product.images}
                  alt={product.title}
                  className="w-full h-auto max-h-96 object-contain"
                />
              ) : (
                <div className="w-full h-64 bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="flex flex-wrap items-center mb-4">
                <span className="px-3 py-1 bg-indigo-900 text-indigo-200 rounded-full text-xs font-semibold mr-2">
                  {product.category}
                </span>
                
                <div className="flex items-center mt-2 md:mt-0">  
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.ratings) ? "text-yellow-400" : "text-gray-600"}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-1 text-sm text-gray-400">({product.ratings})</span>
                </div>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-100">
                {product.title}
              </h1>
              
              <div className="mt-4 flex items-center">
                <p className="text-2xl font-bold text-purple-400">
                  ${product.price?.toFixed(2)}
                </p>
                
                <div className="ml-4 px-2 py-1 bg-gray-700 rounded text-sm">
                  {product.stock > 0 ? (
                    <span className="text-green-400 font-medium">In Stock ({product.stock})</span>
                  ) : (
                    <span className="text-red-400 font-medium">Out of Stock</span>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-200">Description</h2>
                <p className="mt-2 text-gray-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 transition duration-200">
                  Add to Cart
                </button>
                
                <button className="w-full bg-gray-700 text-gray-200 px-6 py-3 rounded-md font-medium hover:bg-gray-600 transition duration-200">
                  Add to Wishlist
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center text-sm text-gray-400">
                  <span>Added on {formatDate(product.createdAt)}</span>
                  <span className="mx-2">•</span>
                  <span>Last updated {formatDate(product.updatedAt)}</span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Product ID: {product._id}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;