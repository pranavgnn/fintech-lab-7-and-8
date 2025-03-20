import { useState } from "react";
import { useNavigate } from "react-router";
import { useCustomer } from "../context/CustomerContext";
import { FormField } from "../components/FormField";
import { Button } from "../components/Button";

const CustomerAddressScreen = () => {
  const navigate = useNavigate();
  const { customerData, updateAddress } = useCustomer();

  const [street, setStreet] = useState(customerData.address?.street || "");
  const [city, setCity] = useState(customerData.address?.city || "");
  const [state, setState] = useState(customerData.address?.state || "");
  const [zipCode, setZipCode] = useState(customerData.address?.zipCode || "");
  const [country, setCountry] = useState(customerData.address?.country || "");

  const [errors, setErrors] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const validateForm = () => {
    const newErrors = {
      street: street ? "" : "Street address is required",
      city: city ? "" : "City is required",
      state: state ? "" : "State is required",
      zipCode: zipCode ? "" : "Zip/Postal code is required",
      country: country ? "" : "Country is required",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      updateAddress({ street, city, state, zipCode, country });
      navigate("/customer-proof-identity");
    }
  };

  return (
    <div className="card max-w-lg mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6">Address Information</h2>

      <form onSubmit={handleSubmit}>
        <FormField label="Street Address *" error={errors.street}>
          <input
            type="text"
            className="form-control"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="123 Main St"
          />
        </FormField>

        <FormField label="City *" error={errors.city}>
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="New York"
          />
        </FormField>

        <FormField label="State/Province *" error={errors.state}>
          <input
            type="text"
            className="form-control"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="NY"
          />
        </FormField>

        <FormField label="Zip/Postal Code *" error={errors.zipCode}>
          <input
            type="text"
            className="form-control"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="10001"
          />
        </FormField>

        <FormField label="Country *" error={errors.country}>
          <input
            type="text"
            className="form-control"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="United States"
          />
        </FormField>

        <div className="flex justify-between mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/customer-contact")}
          >
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
};

export default CustomerAddressScreen;
