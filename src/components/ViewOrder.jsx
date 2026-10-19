import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OrderContext } from '../OrderContext';
import Navbar from './common/Navbar';
import Footer from './common/Footer';

// Hardcoded catalog to fallback on if cart needs reconstruction from buyQuantity
const catalog = [
    { id: 1, name: "Wireless Headphones", price: 99.99, image: "https://via.placeholder.com/150?text=Headphones" },
    { id: 2, name: "Mechanical Keyboard", price: 129.99, image: "https://via.placeholder.com/150?text=Keyboard" },
    { id: 3, name: "Gaming Mouse", price: 59.99, image: "https://via.placeholder.com/150?text=Mouse" },
    { id: 4, name: "USB-C Hub", price: 34.99, image: "https://via.placeholder.com/150?text=USB+Hub" },
    { id: 5, name: "Laptop Stand", price: 45.00, image: "https://via.placeholder.com/150?text=Stand" }
];

export default function ViewOrder() {
    const location = useLocation();
    const navigate = useNavigate();
    const { cart, setCart, paymentInfo, shippingInfo, setPaymentInfo, setShippingInfo } = useContext(OrderContext);

    const order = location.state?.order || {};

    const getInitialItems = () => {
        if (cart && cart.length > 0) return cart;
        if (order.items && order.items.length > 0) return order.items;
        if (order.buyQuantity) {
            return catalog.map((item, idx) => ({
                ...item,
                quantity: order.buyQuantity[idx] || 0
            })).filter(item => item.quantity > 0);
        }
        return [];
    };

    const [items, setItems] = useState(getInitialItems);

    useEffect(() => {
        if (cart && cart.length > 0) {
            setItems(cart);
        }
    }, [cart]);

    const shippingDetails = {
        name: order.name || shippingInfo.name || '',
        addressLine1: order.addressLine1 || shippingInfo.addressLine1 || '',
        addressLine2: order.addressLine2 || shippingInfo.addressLine2 || '',
        city: order.city || shippingInfo.city || '',
        state: order.state || shippingInfo.state || '',
        zip: order.zip || shippingInfo.zip || ''
    };

    const paymentDetails = {
        card_holder_name: order.card_holder_name || paymentInfo.card_holder_name || '',
        credit_card_number: order.credit_card_number || paymentInfo.credit_card_number || '',
        expir_date: order.expir_date || paymentInfo.expir_date || '',
        cvvCode: order.cvvCode || paymentInfo.cvvCode || ''
    };

    const orderTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    const maskCardNumber = (num) => {
        if (!num) return 'Not provided';
        const cleaned = String(num).replace(/\s+/g, '');
        if (cleaned.length < 4) return cleaned;
        return `•••• •••• •••• ${cleaned.slice(-4)}`;
    };

    const handleIncrement = (id) => {
        const updated = items.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setItems(updated);
        setCart(updated);
    };

    const handleDecrement = (id) => {
        const target = items.find(item => item.id === id);
        if (!target) return;
        if (target.quantity <= 1) {
            handleCancelItem(id);
            return;
        }
        const updated = items.map(item =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
        setItems(updated);
        setCart(updated);
    };

    const handleQuantityChange = (id, rawValue) => {
        const parsed = parseInt(rawValue, 10);
        if (isNaN(parsed) || parsed <= 0) {
            return;
        }
        const updated = items.map(item =>
            item.id === id ? { ...item, quantity: parsed } : item
        );
        setItems(updated);
        setCart(updated);
    };

    const handleCancelItem = (id) => {
        const updated = items.filter(item => item.id !== id);
        setItems(updated);
        setCart(updated);
    };

    const handleConfirmOrder = () => {
        if (items.length === 0) {
            alert("Your cart is empty. Please add at least one product before placing an order.");
            navigate('/purchase');
            return;
        }

        const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);
        const orderDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        setPaymentInfo(paymentDetails);
        setShippingInfo(shippingDetails);
        setCart(items);

        const finalizedOrder = {
            ...order,
            ...shippingDetails,
            ...paymentDetails,
            orderNumber,
            orderDate,
            items,
            total: orderTotal
        };

        navigate('/purchase/viewConfirmation', {
            state: {
                order: finalizedOrder,
                orderNumber,
                orderDate,
                items,
                total: orderTotal,
                shipping: shippingDetails,
                payment: paymentDetails
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#10131E] text-white flex flex-col font-sans selection:bg-[#C3F85C] selection:text-[#10131E]">
            <Navbar activePage="cart" />

            <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8">Review Your Order</h1>

                {items.length === 0 ? (
                    <div className="text-center p-12 border border-dashed border-gray-600 rounded-lg bg-gray-900/50">
                        <p className="text-2xl mb-2 font-medium">Your order is empty</p>
                        <p className="text-gray-400 mb-6">All items have been removed or no items were selected.</p>
                        <button
                            onClick={() => navigate('/purchase')}
                            className="bg-[#C3F85C] text-[#10131E] font-bold px-6 py-3 rounded-md hover:bg-[#aee645] transition-colors"
                        >
                            Return to Catalog
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Items Section */}
                        <div className="border border-gray-700 bg-gray-800/40 rounded-xl p-6">
                            <h2 className="text-xl font-semibold border-b border-gray-700 pb-4 mb-4">Order Items</h2>

                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex flex-wrap items-center justify-between border-b border-gray-700/50 pb-4 gap-4">

                                        <div className="flex items-center gap-4 flex-1 min-w-[200px]">
                                            {item.image && (
                                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                            )}
                                            <div>
                                                <strong className="text-lg block">{item.name}</strong>
                                                <span className="text-gray-400 text-sm">${item.price.toFixed(2)} each</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 flex-wrap">
                                            <div className="flex items-center border border-gray-600 rounded-md overflow-hidden bg-gray-900">
                                                <button type="button" onClick={() => handleDecrement(item.id)} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white font-bold transition-colors">−</button>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                    className="w-12 text-center bg-transparent border-none focus:outline-none text-white appearance-none"
                                                />
                                                <button type="button" onClick={() => handleIncrement(item.id)} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white font-bold transition-colors">+</button>
                                            </div>

                                            <div className="w-20 text-right">
                                                <strong className="text-lg">${(item.price * item.quantity).toFixed(2)}</strong>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => handleCancelItem(item.id)}
                                                className="px-3 py-1 text-sm font-medium text-red-400 border border-red-400/50 rounded-md hover:bg-red-400 hover:text-white transition-colors"
                                            >
                                                Cancel Item
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-right mt-6 pt-4 border-t border-gray-700">
                                <h2 className="text-2xl font-bold text-[#C3F85C]">
                                    Total: ${orderTotal.toFixed(2)}
                                </h2>
                            </div>
                        </div>

                        {/* Shipping & Payment Summaries */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border border-gray-700 bg-gray-800/40 rounded-xl p-6">
                                <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
                                    <h3 className="text-lg font-semibold">Shipping Information</h3>
                                    <button
                                        type="button"
                                        onClick={() => navigate('/purchase/shippingEntry', { state: { order: { ...order, ...shippingDetails, ...paymentDetails, items } } })}
                                        className="text-sm text-[#C3F85C] hover:underline"
                                    >
                                        Edit
                                    </button>
                                </div>
                                <div className="text-gray-300 leading-relaxed space-y-1">
                                    <p><strong className="text-white">Name:</strong> {shippingDetails.name || 'Not provided'}</p>
                                    <p><strong className="text-white">Address:</strong> {shippingDetails.addressLine1 || 'Not provided'}</p>
                                    {shippingDetails.addressLine2 && <p><strong className="text-white">Line 2:</strong> {shippingDetails.addressLine2}</p>}
                                    <p><strong className="text-white">City, State, Zip:</strong> {shippingDetails.city ? `${shippingDetails.city}, ${shippingDetails.state} ${shippingDetails.zip}` : 'Not provided'}</p>
                                </div>
                            </div>

                            <div className="border border-gray-700 bg-gray-800/40 rounded-xl p-6">
                                <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
                                    <h3 className="text-lg font-semibold">Payment Information</h3>
                                    <button
                                        type="button"
                                        onClick={() => navigate('/purchase/paymentEntry', { state: { order: { ...order, ...shippingDetails, ...paymentDetails, items } } })}
                                        className="text-sm text-[#C3F85C] hover:underline"
                                    >
                                        Edit
                                    </button>
                                </div>
                                <div className="text-gray-300 leading-relaxed space-y-1">
                                    <p><strong className="text-white">Cardholder:</strong> {paymentDetails.card_holder_name || 'Not provided'}</p>
                                    <p><strong className="text-white">Card Number:</strong> {maskCardNumber(paymentDetails.credit_card_number)}</p>
                                    <p><strong className="text-white">Expiration:</strong> {paymentDetails.expir_date || 'Not provided'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/purchase/shippingEntry', { state: { order: { ...order, ...shippingDetails, ...paymentDetails, items } } })}
                                className="px-6 py-3 font-medium border border-gray-600 rounded-md hover:bg-gray-800 transition-colors"
                            >
                                Back to Shipping
                            </button>

                            <button
                                type="button"
                                onClick={handleConfirmOrder}
                                className="px-8 py-3 font-bold text-[#10131E] bg-[#C3F85C] rounded-md hover:bg-[#aee645] transition-colors"
                            >
                                Place Order (${orderTotal.toFixed(2)})
                            </button>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}