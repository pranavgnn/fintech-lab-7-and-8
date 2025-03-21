import React, { createContext, useState, useContext, ReactNode } from "react";
import { CustomerData } from "../types/customer";

interface CustomerFormContextType {
  formData: CustomerData;
  updateFormData: (newData: Partial<CustomerData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  submitForm: () => Promise<any>;
  resetForm: () => void;
}

const defaultFormData: CustomerData = {
  customerIdentifications: [
    { type: 1, item: "Passport" },
    { type: 2, item: "Driver's License" },
  ],
  customerProofOfIds: [],
};

const CustomerFormContext = createContext<CustomerFormContextType | undefined>(
  undefined
);

interface CustomerFormProviderProps {
  children: ReactNode;
}

export const CustomerFormProvider: React.FC<CustomerFormProviderProps> = ({
  children,
}) => {
  const [formData, setFormData] = useState<CustomerData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState(0);

  const updateFormData = (newData: Partial<CustomerData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setCurrentStep(0);
  };

  const submitForm = async () => {
    try {
      console.log("Submitting form data:", formData);
      const response = await fetch("/api/customer-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      return await response.json();
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };

  return (
    <CustomerFormContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        setCurrentStep,
        submitForm,
        resetForm,
      }}
    >
      {children}
    </CustomerFormContext.Provider>
  );
};

export const useCustomerForm = (): CustomerFormContextType => {
  const context = useContext(CustomerFormContext);
  if (context === undefined) {
    throw new Error(
      "useCustomerForm must be used within a CustomerFormProvider"
    );
  }
  return context;
};
