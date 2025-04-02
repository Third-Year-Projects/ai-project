import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { Product, CartItem } from '../types';  // Update import to use existing types

interface CartContextType {
  cartItems: CartItem[];
  total: number;
  itemCount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

// Create the context with the proper type
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cartItems]);

  const itemCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const total = cartTotal; // For backwards compatibility

  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      // Create a new CartItem with all required properties
      const newCartItem: CartItem = {
        ...product,
        quantity,
        traceability: product.traceability,
        deliveryOptions: product.deliveryOptions,
        ratings: product.ratings,
        nutritionalValue: product.nutritionalValue,
        storageInstructions: product.storageInstructions,
        paymentOptions: product.paymentOptions,
        discounts: product.discounts
      };
      
      return [...prevItems, newCartItem];
    });

    toast.success(`${product.name} added to cart`, {
      style: {
        background: '#468847',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#468847',
      },
    });
  };

  const removeFromCart = (productId: number) => {
    const itemToRemove = cartItems.find(item => item.id === productId);
    setCartItems(cartItems.filter(item => item.id !== productId));
    
    if (itemToRemove) {
      toast.success(`${itemToRemove.name} removed from cart`, {
        style: {
          background: '#468847',
          color: '#fff',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#468847',
        },
      });
    }
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      total,
      itemCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};