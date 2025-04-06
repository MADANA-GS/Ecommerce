import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppState = createContext();
const fetchProducts = (setProducts) => {
  const data = axios
    .get(`${import.meta.env.VITE_API}/api/products/all`)
    .then(({ data: { products } }) => {
      if (products) {
        setProducts(products);
        console.log(products);
        
        
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const AppStateProvider = ({ children }) => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetchProducts(setProducts);
    setLoading(false)
  }, []);


  return <AppState.Provider value={{products ,setLoading ,loading}}>{children}</AppState.Provider>;
};
