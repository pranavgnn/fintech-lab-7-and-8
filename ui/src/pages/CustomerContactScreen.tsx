import { useState } from "react";
import { useNavigate } from "react-router";
import { useCustomer } from "../context/CustomerContext";
import { FormField } from "../components/FormField";
import { Button } from "../components/Button";

const CustomerContactScreen = () => {
  const navigate = useNavigate();
  const { customerData, updateContact } = useCustomer();

  const [email, setEmail] = useState(customerData.contact?.email || "");
  const [phone, setPhone] = useState(customerData.contact?.phone || "");
  const [alternatePhone, setAlternatePhone] = useState(
    customerData.contact?.alternatePhone || ""
  );
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    const newErrors = {
      email: !email
        ? "Email is required"
        : !emailRegex.test(email)
        ? "Invalid email format"
        : "",
      phone: !phone
        ? "Phone number is required"
        : !phoneRegex.test(phone)
        ? "Phone should be 10 digits"
        : "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      updateContact({ email, phone, alternatePhone });
      navigate("/customer-address");
    }
  };

  return (
    <div className="card max-w-lg mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6">Contact Details</h2>

      <form onSubmit={handleSubmit}>
        <FormField label="Email *" error={errors.email}>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />
        </FormField>

        <FormField label="Phone Number *" error={errors.phone}>
          <input
            type="tel"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="1234567890"
          />
        </FormField>

        <FormField label="Alternate Phone (Optional)">
          <input
            type="tel"
            className="form-control"
            value={alternatePhone}
            onChange={(e) => setAlternatePhone(e.target.value)}
            placeholder="1234567890"
          />
        </FormField>

        <div className="flex justify-between mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/customer-name")}
          >
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
};

export default CustomerContactScreen;
