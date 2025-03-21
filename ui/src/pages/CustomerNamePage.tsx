import React, { useState } from "react";
import { useNavigate } from "react-router";
import FormLayout from "../components/FormLayout";
import FormInput from "../components/FormInput";
import PageTransition from "../components/PageTransition";
import { useCustomerForm } from "../hooks/useCustomerForm";

const CustomerNamePage: React.FC = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useCustomerForm();

  const [firstName, setFirstName] = useState(formData.firstName || "");
  const [lastName, setLastName] = useState(formData.lastName || "");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
  });

  const validate = (): boolean => {
    const newErrors = {
      firstName: "",
      lastName: "",
    };

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    setErrors(newErrors);
    return !newErrors.firstName && !newErrors.lastName;
  };

  const handleNext = () => {
    if (validate()) {
      updateFormData({ firstName, lastName });
      navigate("/customer-proof-of-identity");
    }
  };

  const handlePrev = () => {
    updateFormData({ firstName, lastName });
    navigate("/customer-detail");
  };

  return (
    <PageTransition>
      <FormLayout
        title="Customer Name"
        subtitle="Please enter your legal full name as it appears on your ID documents."
        onNext={handleNext}
        onPrev={handlePrev}
        currentStep={1}
        totalSteps={5}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="First Name"
              id="firstName"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={errors.firstName}
              required
              autoFocus
            />

            <FormInput
              label="Last Name"
              id="lastName"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={errors.lastName}
              required
            />
          </div>

          <div className="mt-4 p-4 bg-gray-700/30 rounded-lg">
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
              Why we need this information
            </h3>
            <p className="text-sm text-gray-400">
              Your name will be used for identification purposes and will appear
              on your customer profile. Please ensure it matches your official
              identification documents.
            </p>
          </div>
        </div>
      </FormLayout>
    </PageTransition>
  );
};

export default CustomerNamePage;
