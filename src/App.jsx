import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OrderProvider } from './OrderContext';
import Home from './components/Home';
import Purchase from './components/Purchase';
import PaymentEntry from './components/PaymentEntry';
import ShippingEntry from './components/ShippingEntry';
import ViewOrder from './components/ViewOrder';
import Confirmation from './components/Confirmation';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <OrderProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/purchase/paymentEntry" element={<PaymentEntry />} />
          <Route path="/purchase/shippingEntry" element={<ShippingEntry />} />
          <Route path="/purchase/viewOrder" element={<ViewOrder />} />
          <Route path="/purchase/confirmation" element={<Confirmation />} />          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </OrderProvider>
  );
}

export default App;