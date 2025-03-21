import { useState } from "react";
import { CustomerData } from "../types/customer";

export const useCustomerForm = () => {
  const [formData, setFormData] = useState<CustomerData>({
    customerIdentifications: [
      { type: 1, item: "Passport" },
      { type: 2, item: "Driver's License" },
    ],
    customerProofOfIds: [],
  });

  const [currentStep, setCurrentStep] = useState(0);

  const updateFormData = (newData: Partial<CustomerData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const submitForm = async () => {
    try {
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

  return {
    formData,
    updateFormData,
    currentStep,
    nextStep,
    prevStep,
    submitForm,
  };
};
