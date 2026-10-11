import React, { createContext, useState } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [paymentInfo, setPaymentInfo] = useState({});
    const [shippingInfo, setShippingInfo] = useState({});

    return (
        <OrderContext.Provider value={{
            cart, setCart,
            paymentInfo, setPaymentInfo,
            shippingInfo, setShippingInfo
        }}>
            {children}
        </OrderContext.Provider>
    );
};