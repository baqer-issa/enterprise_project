import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ShippingEntry = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
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
    navigate('/purchase/viewOrder', { state: { order: order } });
  };

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Shipping Details</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" required onChange={handleChange} value={order.name} />
        <br />
        
        <label>Address Line 1:</label>
        <input type="text" name="addressLine1" required onChange={handleChange} value={order.addressLine1} />
        <br />
        
        <label>Address Line 2:</label>
        <input type="text" name="addressLine2" onChange={handleChange} value={order.addressLine2} />
        <br />
        
        <label>City:</label>
        <input type="text" name="city" required onChange={handleChange} value={order.city} />
        <br />
        
        <label>State:</label>
        <input type="text" name="state" required onChange={handleChange} value={order.state} />
        <br />
        
        <label>Zip:</label>
        <input type="text" name="zip" required onChange={handleChange} value={order.zip} />
        <br />
        
        <button type="submit" className="button">Review Order</button>
      </form>
    </div>
  );
};

export default ShippingEntry;