import { useContext } from 'react';
import { FiLock } from 'react-icons/fi';
import { OrderContext } from '../../OrderContext';

export default function CheckoutOrderSummary() {
  const { cart } = useContext(OrderContext) || { cart: [] };

  // Prototype default sample items if cart is not yet populated
  const defaultItems = [
    {
      id: 1,
      name: 'Super Mario World',
      price: 34.99,
      quantity: 2,
      image: '/images/snes-mario.png',
    },
    {
      id: 2,
      name: 'Nintendo 64',
      price: 119.99,
      quantity: 1,
      image: '/images/n64-console.png',
    },
  ];

  const items = cart && cart.length > 0 ? cart : defaultItems;

  const subtotal = items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const shipping = 6.95;
  const tax = Number((subtotal * 0.08).toFixed(2));
  const total = (subtotal + shipping + tax).toFixed(2);

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-sm flex flex-col">
      <h2 className="text-xl sm:text-2xl font-bold text-[#10131E] mb-6">
        Order summary
      </h2>

      {/* Items list */}
      <div className="space-y-4 mb-6">
        {items.map((item, idx) => (
          <div key={item.id || idx} className="flex items-center gap-3.5">
            <img
              src={item.image || '/images/snes-mario.png'}
              alt={item.name}
              className="w-12 h-12 rounded-lg object-cover bg-stone-100 border border-stone-200/60 shrink-0"
            />
            <div className="flex-grow min-w-0">
              <h3 className="text-sm font-bold text-[#10131E] truncate">
                {item.name}
              </h3>
              <p className="text-xs text-[#7E8594] mt-0.5">
                Qty {item.quantity || 1} · ${(item.price * (item.quantity || 1)).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Cost breakdown */}
      <div className="border-t border-stone-200/80 pt-5 space-y-3 text-sm">
        <div className="flex justify-between text-[#5D6475]">
          <span>Subtotal</span>
          <span className="font-medium text-[#10131E]">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[#5D6475]">
          <span>Standard shipping</span>
          <span className="font-medium text-[#10131E]">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[#5D6475]">
          <span>Estimated tax (8%)</span>
          <span className="font-medium text-[#10131E]">${tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-stone-200/80 mt-5 pt-5 flex items-baseline justify-between">
        <span className="text-sm text-[#10131E]">Total</span>
        <div className="text-right">
          <span className="text-3xl font-extrabold text-[#10131E] tracking-tight">
            ${total}
          </span>
          <span className="block text-[11px] font-medium text-[#7E8594] mt-0.5 uppercase">
            USD
          </span>
        </div>
      </div>

      {/* Security Footnote */}
      <div className="mt-8 pt-6 border-t border-stone-200/80 space-y-3">
        <div className="flex items-center gap-2 text-xs text-[#7E8594]">
          <FiLock className="w-3.5 h-3.5 shrink-0" />
          <span>Sample checkout · No payment is processed.</span>
        </div>
        <p className="text-xs text-[#7E8594] leading-relaxed">
          Standard delivery: 3–5 business days after dispatch. US addresses only.
        </p>
      </div>
    </div>
  );
}

