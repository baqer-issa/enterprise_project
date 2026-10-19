import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OrderContext } from '../OrderContext';
import Navbar from './common/Navbar';
import Footer from './common/Footer';

export default function Confirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const { cart, paymentInfo, shippingInfo, setCart, setPaymentInfo, setShippingInfo } = useContext(OrderContext);

    const state = location.state || {};
    const order = state.order || {};

    const orderNumber = state.orderNumber || order.orderNumber || ("ORD-" + Math.floor(100000 + Math.random() * 900000));
    const orderDate = state.orderDate || order.orderDate || new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const items = state.items || order.items || (cart && cart.length > 0 ? cart : []);

    const shipping = state.shipping || {
        name: order.name || shippingInfo.name || '',
        addressLine1: order.addressLine1 || shippingInfo.addressLine1 || '',
        addressLine2: order.addressLine2 || shippingInfo.addressLine2 || '',
        city: order.city || shippingInfo.city || '',
        state: order.state || shippingInfo.state || '',
        zip: order.zip || shippingInfo.zip || ''
    };

    const payment = state.payment || {
        card_holder_name: order.card_holder_name || paymentInfo.card_holder_name || '',
        credit_card_number: order.credit_card_number || paymentInfo.credit_card_number || '',
        expir_date: order.expir_date || paymentInfo.expir_date || ''
    };

    const total = state.total !== undefined
        ? state.total
        : (order.total !== undefined
            ? order.total
            : items.reduce((sum, item) => sum + item.price * item.quantity, 0));

    const maskCardNumber = (num) => {
        if (!num) return 'Not provided';
        const cleaned = String(num).replace(/\s+/g, '');
        if (cleaned.length < 4) return cleaned;
        return `•••• •••• •••• ${cleaned.slice(-4)}`;
    };

    const handleContinueShopping = () => {
        setCart([]);
        setPaymentInfo({});
        setShippingInfo({});
        navigate('/purchase');
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-[#10131E] text-white flex flex-col font-sans selection:bg-[#C3F85C] selection:text-[#10131E]">
            <Navbar />

            <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-8">
                {/* Success Header */}
                <div className="bg-green-900/20 border border-green-500/50 rounded-xl p-8 text-center mb-8">
                    <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                        ✓
                    </div>
                    <h1 className="text-3xl font-bold text-green-400 mb-2">
                        Order Confirmed!
                    </h1>
                    <p className="text-gray-300">
                        Thank you for your purchase. We have received your order and are processing it.
                    </p>
                </div>

                {/* Order Details Header */}
                <div className="flex flex-wrap justify-between items-center gap-4 bg-gray-800/60 border border-gray-700 rounded-xl p-6 mb-8">
                    <div>
                        <strong className="text-gray-400 mr-2">Order Number:</strong>
                        <span className="font-mono text-lg text-white">{orderNumber}</span>
                    </div>
                    <div>
                        <strong className="text-gray-400 mr-2">Order Date:</strong>
                        <span className="text-white">{orderDate}</span>
                    </div>
                    <div>
                        <strong className="text-gray-400 mr-2">Total Amount:</strong>
                        <span className="text-xl font-bold text-[#C3F85C]">${Number(total).toFixed(2)}</span>
                    </div>
                </div>

                {/* Purchased Items List */}
                <div className="border border-gray-700 bg-gray-800/40 rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-semibold border-b border-gray-700 pb-4">Items Ordered</h2>

                    {items.length === 0 ? (
                        <p className="text-gray-400 mt-4">No items recorded for this order.</p>
                    ) : (
                        <div className="space-y-4 mt-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center border-b border-gray-700/50 pb-4">
                                    <div className="flex items-center gap-4">
                                        {item.image && (
                                            <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-md" />
                                        )}
                                        <div>
                                            <strong className="text-lg block">{item.name}</strong>
                                            <p className="text-gray-400 text-sm mt-1">
                                                Quantity: {item.quantity} × ${Number(item.price).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                    <strong className="text-lg">${(item.price * item.quantity).toFixed(2)}</strong>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="text-right mt-6">
                        <h3 className="text-xl font-bold">Grand Total: ${Number(total).toFixed(2)}</h3>
                    </div>
                </div>

                {/* Shipping & Payment Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="border border-gray-700 bg-gray-800/40 rounded-xl p-6">
                        <h3 className="text-lg font-semibold border-b border-gray-700 pb-3 mb-4">Shipping Address</h3>
                        <div className="text-gray-300 leading-relaxed space-y-1">
                            <p><strong className="text-white">Recipient:</strong> {shipping.name || 'N/A'}</p>
                            <p><strong className="text-white">Address:</strong> {shipping.addressLine1 || 'N/A'}</p>
                            {shipping.addressLine2 && <p><strong className="text-white">Line 2:</strong> {shipping.addressLine2}</p>}
                            <p><strong className="text-white">City, State, Zip:</strong> {shipping.city ? `${shipping.city}, ${shipping.state} ${shipping.zip}` : 'N/A'}</p>
                        </div>
                    </div>

                    <div className="border border-gray-700 bg-gray-800/40 rounded-xl p-6">
                        <h3 className="text-lg font-semibold border-b border-gray-700 pb-3 mb-4">Payment Details</h3>
                        <div className="text-gray-300 leading-relaxed space-y-1">
                            <p><strong className="text-white">Cardholder:</strong> {payment.card_holder_name || 'N/A'}</p>
                            <p><strong className="text-white">Payment Method:</strong> {maskCardNumber(payment.credit_card_number)}</p>
                            <p><strong className="text-white">Status:</strong> <span className="text-green-400 font-semibold">Paid</span></p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-8">
                    <button
                        type="button"
                        onClick={handlePrint}
                        className="px-6 py-3 font-medium border border-gray-600 rounded-md hover:bg-gray-800 transition-colors"
                    >
                        Print Receipt
                    </button>

                    <button
                        type="button"
                        onClick={handleContinueShopping}
                        className="px-8 py-3 font-bold text-[#10131E] bg-[#C3F85C] rounded-md hover:bg-[#aee645] transition-colors"
                    >
                        Continue Shopping
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    );
}