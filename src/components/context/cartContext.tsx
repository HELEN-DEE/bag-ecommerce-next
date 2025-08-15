'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Product = {
  id: string | number;
  title?: string;
  name?: string;
  price: string | number;
  [key: string]: any;
};

export type Order = {
  id: string;
  date: string;
  items: string[];
  products: Product[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
};

type CartContextType = {
  cartItems: string[];
  orders: Order[];
  toggleCart: (id: string) => void;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  placeOrder: (orderData: Omit<Order, 'id' | 'date' | 'items' | 'status'>) => Order;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load cart and orders from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cartItems');
      const savedOrders = localStorage.getItem('orderHistory');
      
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
        }
      }
      
      if (savedOrders) {
        try {
          setOrders(JSON.parse(savedOrders));
        } catch (error) {
          console.error('Error loading orders from localStorage:', error);
        }
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('orderHistory', JSON.stringify(orders));
    }
  }, [orders]);

  const toggleCart = (id: string) => {
    setCartItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addToCart = (id: string) => {
    setCartItems((prev) => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = (orderData: Omit<Order, 'id' | 'date' | 'items' | 'status'>): Order => {
    const newOrder: Order = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: [...cartItems],
      status: 'confirmed',
      ...orderData,
    };
    
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      orders, 
      toggleCart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      placeOrder 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};