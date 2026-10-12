import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OrderContext } from '../OrderContext';

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
        // Reset context state for a fresh order
        setCart([]);
        setPaymentInfo({});
        setShippingInfo({});
        navigate('/purchase');
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', textAlign: 'left' }}>
            {/* Success Header */}
            <div style={{
                textAlign: 'center',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                border: '1px solid #28a745',
                borderRadius: '8px',
                padding: '24px',
                marginBottom: '24px'
            }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    lineHeight: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    fontSize: '32px',
                    margin: '0 auto 12px auto'
                }}>
                    ✓
                </div>
                <h1 style={{ margin: '0 0 8px 0', color: '#1e7e34', fontSize: '32px' }}>
                    Order Confirmed!
                </h1>
                <p style={{ margin: 0, fontSize: '16px', color: '#333' }}>
                    Thank you for your purchase. We have received your order and are processing it.
                </p>
            </div>

            {/* Order Details Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px',
                backgroundColor: 'var(--code-bg, #f8f9fa)',
                padding: '16px 20px',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid #e0e0e0'
            }}>
                <div>
                    <strong>Order Number:</strong> <span style={{ fontFamily: 'monospace', fontSize: '16px' }}>{orderNumber}</span>
                </div>
                <div>
                    <strong>Order Date:</strong> <span>{orderDate}</span>
                </div>
                <div>
                    <strong>Total Amount:</strong> <span style={{ fontSize: '18px', fontWeight: 'bold' }}>${Number(total).toFixed(2)}</span>
                </div>
            </div>

            {/* Purchased Items List */}
            <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Items Ordered</h2>
                {items.length === 0 ? (
                    <p style={{ color: '#666' }}>No items recorded for this order.</p>
                ) : (
                    <div style={{ display: 'grid', gap: '12px', marginTop: '15px' }}>
                        {items.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderBottom: '1px solid #f0f0f0',
                                    paddingBottom: '10px'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                                        />
                                    )}
                                    <div>
                                        <strong>{item.name}</strong>
                                        <p style={{ color: '#666', fontSize: '14px', marginTop: '2px' }}>
                                            Quantity: {item.quantity} × ${Number(item.price).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                            </div>
                        ))}
                    </div>
                )}
                <div style={{ textAlign: 'right', marginTop: '16px' }}>
                    <h3 style={{ margin: 0 }}>Grand Total: ${Number(total).toFixed(2)}</h3>
                </div>
            </div>

            {/* Shipping & Payment Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '25px' }}>
                {/* Shipping Details */}
                <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '18px' }}>
                    <h3 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                        Shipping Address
                    </h3>
                    <div style={{ lineHeight: '1.6' }}>
                        <p><strong>Recipient:</strong> {shipping.name || 'N/A'}</p>
                        <p><strong>Address:</strong> {shipping.addressLine1 || 'N/A'}</p>
                        {shipping.addressLine2 && <p><strong>Line 2:</strong> {shipping.addressLine2}</p>}
                        <p><strong>City, State, Zip:</strong> {shipping.city ? `${shipping.city}, ${shipping.state} ${shipping.zip}` : 'N/A'}</p>
                    </div>
                </div>

                {/* Payment Details */}
                <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '18px' }}>
                    <h3 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                        Payment Details
                    </h3>
                    <div style={{ lineHeight: '1.6' }}>
                        <p><strong>Cardholder:</strong> {payment.card_holder_name || 'N/A'}</p>
                        <p><strong>Payment Method:</strong> {maskCardNumber(payment.credit_card_number)}</p>
                        <p><strong>Status:</strong> <span style={{ color: '#28a745', fontWeight: 'bold' }}>Paid</span></p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <button
                    type="button"
                    onClick={handlePrint}
                    style={{
                        padding: '10px 20px',
                        fontSize: '15px',
                        cursor: 'pointer',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        background: '#f8f9fa'
                    }}
                >
                    Print Receipt
                </button>

                <button
                    type="button"
                    onClick={handleContinueShopping}
                    style={{
                        padding: '12px 24px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#fff',
                        backgroundColor: '#0070f3',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}