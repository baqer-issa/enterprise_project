import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentEntry = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Safely initialize state with optional chaining and a fallback object
  const [order, setOrder] = useState(location.state?.order || {
    buyQuantity: [0, 0, 0, 0, 0],
    credit_card_number: '', 
    expir_date: '', 
    cvvCode: '', 
    card_holder_name: '',
    name: '', 
    addressLine1: '', 
    addressLine2: '', 
    city: '', 
    state: '', 
    zip: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/purchase/shippingEntry', { state: { order: order } });
  };

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Payment Information</h1>
      <form onSubmit={handleSubmit}>
        <label>Credit Card Number:</label>
        <input type="text" name="credit_card_number" required onChange={handleChange} value={order.credit_card_number} />
        <br />
        
        <label>Expiration Date:</label>
        <input type="text" name="expir_date" required onChange={handleChange} value={order.expir_date} />
        <br />
        
        <label>CVV Code:</label>
        <input type="text" name="cvvCode" required onChange={handleChange} value={order.cvvCode} />
        <br />
        
        <label>Card Holder Name:</label>
        <input type="text" name="card_holder_name" required onChange={handleChange} value={order.card_holder_name} />
        <br />
        
        <button type="submit" className="button">Next: Shipping</button>
      </form>
    </div>
  );
};

export default PaymentEntry;