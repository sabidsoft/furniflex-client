import React, { createContext, useState, useContext, useEffect } from 'react';
import productsData from '../data/products.json';

export interface Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  image: string;
  description: string;
  quantity?: number;
}

interface ProductContextProps {
  products: Product[];
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productList, setProductList] = useState<Product[]>([]);

  // useEffect to populate the productList state with data from products.json on component mount
  useEffect(() => {
    setProductList(productsData);
  }, []);

  return (
    <ProductContext.Provider value={{ products: productList }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the ProductContext
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProduct must be used within a ProductProvider');
  return context;
};
