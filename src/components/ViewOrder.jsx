import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OrderContext } from '../OrderContext';

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

    // Determine initial items: check OrderContext first, then order.items, then order.buyQuantity fallback
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

    // Sync with OrderContext cart whenever it changes externally
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

    // Calculate live order total
    const orderTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    const maskCardNumber = (num) => {
        if (!num) return 'Not provided';
        const cleaned = String(num).replace(/\s+/g, '');
        if (cleaned.length < 4) return cleaned;
        return `•••• •••• •••• ${cleaned.slice(-4)}`;
    };

    // Quantity & Item editing handlers
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

        // Persist into context
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
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '20px', textAlign: 'left' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '25px' }}>Review Your Order</h1>

            {items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px 20px', border: '1px dashed #ccc', borderRadius: '8px' }}>
                    <p style={{ fontSize: '20px', marginBottom: '10px', fontWeight: '500' }}>Your order is empty</p>
                    <p style={{ color: '#666', marginBottom: '20px' }}>All items have been removed or no items were selected.</p>
                    <button
                        onClick={() => navigate('/purchase')}
                        style={{
                            padding: '12px 24px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            borderRadius: '6px',
                            backgroundColor: '#0070f3',
                            color: '#fff',
                            border: 'none',
                            fontWeight: 'bold'
                        }}
                    >
                        Return to Catalog
                    </button>
                </div>
            ) : (
                <div>
                    {/* Items Section */}
                    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                        <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Order Items</h2>

                        <div style={{ display: 'grid', gap: '15px', marginTop: '15px' }}>
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        borderBottom: '1px solid #f0f0f0',
                                        paddingBottom: '12px',
                                        flexWrap: 'wrap',
                                        gap: '15px'
                                    }}
                                >
                                    {/* Item Image and Title */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', minWidth: '220px', flex: '1 1 200px' }}>
                                        {item.image && (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                                            />
                                        )}
                                        <div>
                                            <strong style={{ fontSize: '16px', display: 'block' }}>{item.name}</strong>
                                            <span style={{ color: '#666', fontSize: '14px' }}>
                                                ${item.price.toFixed(2)} each
                                            </span>
                                        </div>
                                    </div>

                                    {/* Quantity Editing Controls & Actions */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                                        {/* Quantity Stepper */}
                                        <div style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            border: '1px solid #bbb',
                                            borderRadius: '6px',
                                            overflow: 'hidden'
                                        }}>
                                            <button
                                                type="button"
                                                onClick={() => handleDecrement(item.id)}
                                                title="Decrease quantity"
                                                style={{
                                                    padding: '6px 12px',
                                                    border: 'none',
                                                    background: '#f2f2f2',
                                                    cursor: 'pointer',
                                                    fontSize: '16px',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                −
                                            </button>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                style={{
                                                    width: '45px',
                                                    textAlign: 'center',
                                                    border: 'none',
                                                    padding: '6px 0',
                                                    fontSize: '15px',
                                                    outline: 'none'
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleIncrement(item.id)}
                                                title="Increase quantity"
                                                style={{
                                                    padding: '6px 12px',
                                                    border: 'none',
                                                    background: '#f2f2f2',
                                                    cursor: 'pointer',
                                                    fontSize: '16px',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Line Total */}
                                        <div style={{ minWidth: '80px', textAlign: 'right' }}>
                                            <strong style={{ fontSize: '16px' }}>
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </strong>
                                        </div>

                                        {/* Cancel Item Button */}
                                        <button
                                            type="button"
                                            onClick={() => handleCancelItem(item.id)}
                                            title="Cancel and remove this item from the order"
                                            style={{
                                                padding: '6px 12px',
                                                fontSize: '13px',
                                                color: '#dc3545',
                                                backgroundColor: '#fff',
                                                border: '1px solid #dc3545',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontWeight: '500'
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.backgroundColor = '#dc3545';
                                                e.currentTarget.style.color = '#fff';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.backgroundColor = '#fff';
                                                e.currentTarget.style.color = '#dc3545';
                                            }}
                                        >
                                            Cancel Item
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Subtotal & Total Display */}
                        <div style={{ textAlign: 'right', marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                            <h2 style={{ margin: 0, fontSize: '22px' }}>
                                Total: ${orderTotal.toFixed(2)}
                            </h2>
                        </div>
                    </div>

                    {/* Shipping & Payment Summaries */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '25px' }}>
                        {/* Shipping Details */}
                        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '18px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                                <h3 style={{ margin: 0 }}>Shipping Information</h3>
                                <button
                                    type="button"
                                    onClick={() => navigate('/purchase/shippingEntry', { state: { order: { ...order, ...shippingDetails, ...paymentDetails, items } } })}
                                    style={{ background: 'none', border: 'none', color: '#0066cc', cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                    Edit
                                </button>
                            </div>
                            <div style={{ marginTop: '12px', lineHeight: '1.6' }}>
                                <p><strong>Name:</strong> {shippingDetails.name || 'Not provided'}</p>
                                <p><strong>Address:</strong> {shippingDetails.addressLine1 || 'Not provided'}</p>
                                {shippingDetails.addressLine2 && <p><strong>Line 2:</strong> {shippingDetails.addressLine2}</p>}
                                <p><strong>City, State, Zip:</strong> {shippingDetails.city ? `${shippingDetails.city}, ${shippingDetails.state} ${shippingDetails.zip}` : 'Not provided'}</p>
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '18px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                                <h3 style={{ margin: 0 }}>Payment Information</h3>
                                <button
                                    type="button"
                                    onClick={() => navigate('/purchase/paymentEntry', { state: { order: { ...order, ...shippingDetails, ...paymentDetails, items } } })}
                                    style={{ background: 'none', border: 'none', color: '#0066cc', cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                    Edit
                                </button>
                            </div>
                            <div style={{ marginTop: '12px', lineHeight: '1.6' }}>
                                <p><strong>Cardholder:</strong> {paymentDetails.card_holder_name || 'Not provided'}</p>
                                <p><strong>Card Number:</strong> {maskCardNumber(paymentDetails.credit_card_number)}</p>
                                <p><strong>Expiration:</strong> {paymentDetails.expir_date || 'Not provided'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                        <button
                            type="button"
                            onClick={() => navigate('/purchase/shippingEntry', { state: { order: { ...order, ...shippingDetails, ...paymentDetails, items } } })}
                            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '6px' }}
                        >
                            Back to Shipping
                        </button>

                        <button
                            type="button"
                            onClick={handleConfirmOrder}
                            style={{
                                padding: '12px 28px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: '#fff',
                                backgroundColor: '#28a745',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer'
                            }}
                        >
                            Place Order (${orderTotal.toFixed(2)})
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}