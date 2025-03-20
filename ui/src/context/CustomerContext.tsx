import { createContext, useContext, useState, ReactNode } from "react";
import {
  CustomerDetails,
  CustomerName,
  CustomerContact,
  CustomerAddress,
  CustomerIdentification,
  CustomerProofOfId,
} from "../types/customer";

interface CustomerContextType {
  customerData: Partial<CustomerDetails>;
  updateName: (name: CustomerName) => void;
  updateContact: (contact: CustomerContact) => void;
  updateAddress: (address: CustomerAddress) => void;
  updateIdentifications: (identifications: CustomerIdentification[]) => void;
  updateProofOfIds: (proofOfIds: CustomerProofOfId[]) => void;
  submitCustomerData: () => Promise<void>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const [customerData, setCustomerData] = useState<Partial<CustomerDetails>>({
    customerIdentifications: [],
    customerProofOfIds: [],
  });

  const updateName = (name: CustomerName) => {
    setCustomerData((prev) => ({ ...prev, name }));
  };

  const updateContact = (contact: CustomerContact) => {
    setCustomerData((prev) => ({ ...prev, contact }));
  };

  const updateAddress = (address: CustomerAddress) => {
    setCustomerData((prev) => ({ ...prev, address }));
  };

  const updateIdentifications = (
    customerIdentifications: CustomerIdentification[]
  ) => {
    setCustomerData((prev) => ({ ...prev, customerIdentifications }));
  };

  const updateProofOfIds = (customerProofOfIds: CustomerProofOfId[]) => {
    setCustomerData((prev) => ({ ...prev, customerProofOfIds }));
  };

  const submitCustomerData = async () => {
    try {
      const response = await fetch("/api/customer-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit customer data");
      }

      return await response.json();
    } catch (error) {
      console.error("Error submitting customer data:", error);
      throw error;
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        customerData,
        updateName,
        updateContact,
        updateAddress,
        updateIdentifications,
        updateProofOfIds,
        submitCustomerData,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
};
