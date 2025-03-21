import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import CustomerNamePage from "./pages/CustomerNamePage";
import CustomerProofOfIdentityPage from "./pages/CustomerProofOfIdentityPage";
import CustomerContactDetailsPage from "./pages/CustomerContactDetailsPage";
import CustomerAddressPage from "./pages/CustomerAddressPage";
import SubmitSuccessPage from "./pages/SubmitSuccessPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/customer-detail" element={<CustomerDetailPage />} />
        <Route path="/customer-name" element={<CustomerNamePage />} />
        <Route
          path="/customer-proof-of-identity"
          element={<CustomerProofOfIdentityPage />}
        />
        <Route
          path="/customer-contact"
          element={<CustomerContactDetailsPage />}
        />
        <Route path="/customer-address" element={<CustomerAddressPage />} />
        <Route path="/success" element={<SubmitSuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
