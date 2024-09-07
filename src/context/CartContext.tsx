import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product } from './ProductContext';

interface CartContextProps {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  removeItemFromCart: (product: Product) => void;
}

// Create the CartContext with a default value of undefined
const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State to store cart items, initialized with data from localStorage or an empty array
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  // useEffect hook to store cart items in localStorage whenever the cartItems state changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to add a product to the cart
  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      // Check if the product already exists in the cart
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        // If the product exists, increase its quantity
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }

      else {
        // If the product doesn't exist, add it to the cart with a quantity of 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to decrease the quantity of a product in the cart
  const removeFromCart = (product: Product) => {
    setCartItems((prevItems) =>
      prevItems
        .map(item =>
          item.id === product.id && item.quantity! > 1
            ? { ...item, quantity: item.quantity! - 1 }
            : item
        )
        // Filter out any products that have a quantity of 0 after decrementing
        .filter(item => item.quantity! > 0)
    );
  };

  // Function to remove a product from the cart entirely
  const removeItemFromCart = (product: Product) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== product.id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
