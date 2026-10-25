import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiShoppingBag, FiPlus, FiMinus, FiTrash2, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { LuGamepad2, LuTv, LuSparkles } from 'react-icons/lu';
import { OrderContext } from '../OrderContext';
import Navbar from './common/Navbar';
import Footer from './common/Footer';

const INVENTORY_API_URL = `${process.env.REACT_APP_AWS_API_URL}/inventory-management/inventory`;export default function Purchase() {
  const { cart, setCart } = useContext(OrderContext);
  const navigate = useNavigate();
  
  const [catalog, setCatalog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(INVENTORY_API_URL);
        setCatalog(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching inventory:', error);
        setApiError('Failed to connect to the inventory microservice.');
        setIsLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const [quantities, setQuantities] = useState(() => {
    const initial = {};
    if (cart && cart.length > 0) {
      cart.forEach((item) => {
        initial[item.id] = item.quantity;
      });
    }
    return initial;
  });

  useEffect(() => {
    const selectedItems = catalog
      .map((item) => ({ ...item, quantity: quantities[item.id] || 0 }))
      .filter((item) => item.quantity > 0);
    setCart(selectedItems);
  }, [quantities, catalog, setCart]);

  const handleQuantityChange = (id, value) => {
    const parsed = Math.max(0, parseInt(value, 10) || 0);
    setQuantities((prev) => ({ ...prev, [id]: parsed }));
  };

  const incrementQuantity = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrementQuantity = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) - 1) }));
  };

  const removeItem = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: 0 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedItems = catalog
      .map((item) => ({ ...item, quantity: quantities[item.id] || 0 }))
      .filter((item) => item.quantity > 0);

    if (selectedItems.length === 0) {
      alert('Please select at least one classic item to purchase.');
      return;
    }

    setCart(selectedItems);
    const buyQuantity = catalog.map((item) => quantities[item.id] || 0);
    navigate('/purchase/paymentEntry', {
      state: {
        order: {
          buyQuantity,
          items: selectedItems,
          credit_card_number: '',
          expir_date: '',
          cvvCode: '',
          card_holder_name: '',
          name: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          zip: '',
        },
      },
    });
  };

  const filteredCatalog = activeCategory === 'all' 
    ? catalog 
    : catalog.filter((item) => item.category === activeCategory);

  const selectedList = catalog
    .map((item) => ({ ...item, quantity: quantities[item.id] || 0 }))
    .filter((item) => item.quantity > 0);

  const totalItems = selectedList.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = selectedList.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#10131E] text-white flex flex-col font-sans selection:bg-[#C3F85C] selection:text-[#10131E]">
      <Navbar activePage="shop" />

      <main className="flex-grow">
        <section className="w-full bg-[#10131E] border-b border-white/5 pt-12 pb-10 sm:pt-16 sm:pb-12">
          <div className="max-w-[1296px] mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase font-mono mb-3">
                  <span className="text-[#A78BFA]">01 / </span>
                  <span className="text-[#7E8594]">THE VAULT CATALOG</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                  Shop Confirmed Classics.
                </h1>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1296px] mx-auto px-6 lg:px-8 py-12">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#151926] border-t-[#C3F85C] rounded-full animate-spin"></div>
              <p className="mt-4 text-[#949BA8] font-mono text-sm tracking-widest uppercase">Initializing Vault Database...</p>
            </div>
          ) : apiError ? (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center text-red-400">
              {apiError}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredCatalog.map((product) => {
                    const qty = quantities[product.id] || 0;
                    return (
                      <div key={product.id} className="bg-[#121622] border border-white/10 rounded-2xl overflow-hidden p-5 flex flex-col">
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="text-lg font-bold text-white tracking-tight">{product.name}</h3>
                          <span className="text-lg font-bold text-[#C3F85C] font-mono">${product.price?.toFixed(2) || product.price}</span>
                        </div>
                        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                          <span className="text-xs font-mono uppercase text-[#949BA8]">Quantity</span>
                          <div className="flex items-center gap-2">
                            <button type="button" onClick={() => decrementQuantity(product.id)} className="w-8 h-8 rounded-lg bg-[#1B2030] flex items-center justify-center text-white"><FiMinus /></button>
                            <input type="number" min="0" value={qty} onChange={(e) => handleQuantityChange(product.id, e.target.value)} className="w-14 h-8 bg-[#10131E] text-center text-white focus:outline-none" />
                            <button type="button" onClick={() => incrementQuantity(product.id)} className="w-8 h-8 rounded-lg bg-[#C3F85C] flex items-center justify-center text-[#10131E]"><FiPlus /></button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <aside className="lg:col-span-4 lg:sticky lg:top-24 bg-[#151926] border border-white/10 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <h2 className="text-lg font-bold text-white">Your Cart</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C3F85C] text-[#10131E] text-xs font-extrabold">{totalItems} items</span>
                </div>
                
                <div className="pt-4 border-t border-white/10 space-y-2 text-sm mt-6">
                  <div className="flex justify-between text-base font-bold text-white pt-2">
                    <span>Estimated Total</span>
                    <span className="font-mono text-xl text-[#C3F85C]">${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <button type="submit" disabled={selectedList.length === 0} className="mt-6 w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-[#C3F85C] text-[#10131E] flex justify-center items-center gap-2">
                  <span>Proceed to Payment</span>
                  <FiArrowRight />
                </button>
              </aside>
            </form>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}