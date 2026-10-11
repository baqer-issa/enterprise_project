import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../OrderContext';

// Hardcoded catalog of 5 items
const catalog = [
    { id: 1, name: "Wireless Headphones", price: 99.99, image: "https://via.placeholder.com/150?text=Headphones" },
    { id: 2, name: "Mechanical Keyboard", price: 129.99, image: "https://via.placeholder.com/150?text=Keyboard" },
    { id: 3, name: "Gaming Mouse", price: 59.99, image: "https://via.placeholder.com/150?text=Mouse" },
    { id: 4, name: "USB-C Hub", price: 34.99, image: "https://via.placeholder.com/150?text=USB+Hub" },
    { id: 5, name: "Laptop Stand", price: 45.00, image: "https://via.placeholder.com/150?text=Stand" }
];

export default function Purchase() {
    const { setCart } = useContext(OrderContext);
    const navigate = useNavigate();
    const [quantities, setQuantities] = useState({});

    const handleQuantityChange = (id, value) => {
        setQuantities({
            ...quantities,
            [id]: parseInt(value) || 0
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedItems = catalog.map(item => ({
            ...item,
            quantity: quantities[item.id] || 0
        })).filter(item => item.quantity > 0);

        if (selectedItems.length === 0) {
            alert("Please select at least one item to purchase.");
            return;
        }

        setCart(selectedItems);
        navigate('/purchase/paymentEntry');
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1>Product Catalog</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gap: '20px' }}>
                    {catalog.map(product => (
                        <div key={product.id} style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '10px' }}>
                            <img src={product.image} alt={product.name} style={{ width: '100px', height: '100px', marginRight: '20px' }} />
                            <div style={{ flexGrow: 1 }}>
                                <h3>{product.name}</h3>
                                <p>${product.price.toFixed(2)}</p>
                            </div>
                            <div>
                                <label style={{ marginRight: '10px' }}>Quantity:</label>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    value={quantities[product.id] || ''}
                                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                    style={{ width: '60px' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                    Proceed to Checkout
                </button>
            </form>
        </div>
    );
}