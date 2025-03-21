import React, { useState } from "react";
import { useNavigate } from "react-router";
import FormLayout from "../components/FormLayout";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import PageTransition from "../components/PageTransition";
import { useCustomerForm } from "../hooks/useCustomerForm";

const countryOptions = [
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Australia", label: "Australia" },
  { value: "India", label: "India" },
  { value: "Germany", label: "Germany" },
  { value: "France", label: "France" },
  { value: "Japan", label: "Japan" },
  { value: "China", label: "China" },
  { value: "Brazil", label: "Brazil" },
];

const CustomerAddressPage: React.FC = () => {
  const navigate = useNavigate();
  const { formData, updateFormData, submitForm } = useCustomerForm();

  const [street, setStreet] = useState(formData.address?.street || "");
  const [city, setCity] = useState(formData.address?.city || "");
  const [state, setState] = useState(formData.address?.state || "");
  const [zipCode, setZipCode] = useState(formData.address?.zipCode || "");
  const [country, setCountry] = useState(formData.address?.country || "");
  const [_, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const validate = (): boolean => {
    const newErrors = {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    };

    if (!street.trim()) {
      newErrors.street = "Street address is required";
    }

    if (!city.trim()) {
      newErrors.city = "City is required";
    }

    if (!state.trim()) {
      newErrors.state = "State/Province is required";
    }

    if (!zipCode.trim()) {
      newErrors.zipCode = "Postal/ZIP code is required";
    }

    if (!country) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors);
    return (
      !newErrors.street &&
      !newErrors.city &&
      !newErrors.state &&
      !newErrors.zipCode &&
      !newErrors.country
    );
  };

  const handleNext = async () => {
    if (validate()) {
      const address = { street, city, state, zipCode, country };
      updateFormData({ address });

      setIsSubmitting(true);
      try {
        await submitForm();
        navigate("/success");
      } catch (error) {
        console.error("Error submitting form:", error);
        setIsSubmitting(false);
        // Show error message to user
      }
    }
  };

  const handlePrev = () => {
    const address = { street, city, state, zipCode, country };
    updateFormData({ address });
    navigate("/customer-contact");
  };

  return (
    <PageTransition>
      <FormLayout
        title="Address Information"
        subtitle="Please provide your current address details."
        onNext={handleNext}
        onPrev={handlePrev}
        isLastStep={true}
        currentStep={4}
        totalSteps={5}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <FormInput
              label="Street Address"
              id="street"
              placeholder="123 Main Street, Apt 4B"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              error={errors.street}
              required
              autoFocus
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="City"
                id="city"
                placeholder="New York"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                error={errors.city}
                required
              />

              <FormInput
                label="State/Province"
                id="state"
                placeholder="NY"
                value={state}
                onChange={(e) => setState(e.target.value)}
                error={errors.state}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Postal/ZIP Code"
                id="zipCode"
                placeholder="10001"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                error={errors.zipCode}
                required
              />

              <FormSelect
                label="Country"
                id="country"
                options={countryOptions}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                error={errors.country}
                required
              />
            </div>
          </div>

          <div className="p-4 bg-green-900/20 border border-green-800/30 rounded-lg">
            <h3 className="font-medium mb-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
              Final Step
            </h3>
            <p className="text-sm text-gray-400">
              This is the last step before submitting your information. Please
              make sure all details are correct before proceeding.
            </p>
          </div>
        </div>
      </FormLayout>
    </PageTransition>
  );
};

export default CustomerAddressPage;
