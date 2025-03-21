import React, { useState } from "react";
import { useNavigate } from "react-router";
import FormLayout from "../components/FormLayout";
import FormInput from "../components/FormInput";
import PageTransition from "../components/PageTransition";
import { useCustomerForm } from "../hooks/useCustomerForm";

const CustomerContactDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useCustomerForm();

  const [email, setEmail] = useState(formData.email || "");
  const [phone, setPhone] = useState(formData.phone || "");
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  const validateEmail = (email: string): boolean => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validate = (): boolean => {
    const newErrors = {
      email: "",
      phone: "",
    };

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.phone;
  };

  const handleNext = () => {
    if (validate()) {
      updateFormData({ email, phone });
      navigate("/customer-address");
    }
  };

  const handlePrev = () => {
    updateFormData({ email, phone });
    navigate("/customer-proof-of-identity");
  };

  return (
    <PageTransition>
      <FormLayout
        title="Contact Details"
        subtitle="Please provide your contact information so we can reach you."
        onNext={handleNext}
        onPrev={handlePrev}
        currentStep={3}
        totalSteps={5}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <FormInput
              label="Email Address"
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
              autoFocus
            />

            <FormInput
              label="Phone Number"
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
              required
            />
          </div>

          <div className="p-4 bg-gray-700/30 rounded-lg">
            <h3 className="font-medium mb-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Contact Preferences
            </h3>
            <p className="text-sm text-gray-400">
              We'll use your email for account notifications and important
              updates. Your phone number may be used for verification purposes
              or urgent communications.
            </p>
          </div>
        </div>
      </FormLayout>
    </PageTransition>
  );
};

export default CustomerContactDetailsPage;
