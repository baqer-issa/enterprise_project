import React, { createContext, useState, useEffect } from 'react';

export const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  // Initialize cart from localStorage if present, else empty array
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('retro_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error('Failed to parse cart from storage:', e);
      return [];
    }
  });

  const [orderInfo, setOrderInfo] = useState({
    shippingInfo: {},
    paymentInfo: {},
    confirmationId: null,
  });

  // Sync cart changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('retro_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to storage:', e);
    }
  }, [cart]);

  // Add item or increment quantity
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove single item completely
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // Completely wipe cart (called upon returning home after confirmation)
  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem('retro_cart');
    } catch (e) {
      console.error('Failed to remove cart from storage:', e);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        clearCart,
        orderInfo,
        setOrderInfo,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}