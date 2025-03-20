import { BrowserRouter as Router, Routes, Route } from "react-router";
import { CustomerProvider } from "./context/CustomerContext";
import LandingPage from "./pages/LandingPage";
import CustomerNameScreen from "./pages/CustomerNameScreen";
import CustomerContactScreen from "./pages/CustomerContactScreen";
import CustomerAddressScreen from "./pages/CustomerAddressScreen";
import CustomerProofOfIdentityScreen from "./pages/CustomerProofOfIdScreen";
import CustomerDetailScreen from "./pages/CustomerDetailScreen";
import ConfirmationScreen from "./pages/ConfirmationScreen";
import "./theme.css";
import "./App.css";

function App() {
  return (
    <CustomerProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <div className="max-w-4xl mx-auto p-4">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/customer-name" element={<CustomerNameScreen />} />
              <Route
                path="/customer-contact"
                element={<CustomerContactScreen />}
              />
              <Route
                path="/customer-address"
                element={<CustomerAddressScreen />}
              />
              <Route
                path="/customer-proof-identity"
                element={<CustomerProofOfIdentityScreen />}
              />
              <Route
                path="/customer-details"
                element={<CustomerDetailScreen />}
              />
              <Route path="/confirmation" element={<ConfirmationScreen />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CustomerProvider>
  );
}

export default App;
