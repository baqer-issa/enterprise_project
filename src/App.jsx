import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { OrderProvider } from './OrderContext';
import Purchase from './components/Purchase';
import PaymentEntry from './components/PaymentEntry';
import ShippingEntry from './components/ShippingEntry';
import ViewOrder from './components/ViewOrder';
import Confirmation from './components/Confirmation';

function App() {
  return (
    <OrderProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/purchase" />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/purchase/paymentEntry" element={<PaymentEntry />} />
          <Route path="/purchase/shippingEntry" element={<ShippingEntry />} />
          <Route path="/purchase/viewOrder" element={<ViewOrder />} />
          <Route path="/purchase/viewConfirmation" element={<Confirmation />} />
        </Routes>
      </Router>
    </OrderProvider>
  );
}

export default App;