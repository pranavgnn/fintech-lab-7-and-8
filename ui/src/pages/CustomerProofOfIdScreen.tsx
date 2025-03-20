import { useState } from "react";
import { useNavigate } from "react-router";
import { useCustomer } from "../context/CustomerContext";
import { FormField } from "../components/FormField";
import { Button } from "../components/Button";
import { CustomerProofOfId } from "../types/customer";

const CustomerProofOfIdentityScreen = () => {
  const navigate = useNavigate();
  const { customerData, updateProofOfIds } = useCustomer();

  const [proofOfIds, setProofOfIds] = useState<CustomerProofOfId[]>(
    customerData.customerProofOfIds?.length
      ? customerData.customerProofOfIds
      : [
          {
            type: "",
            value: "",
            startDate: "",
            endDate: "",
          },
        ]
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    proofOfIds.forEach((proof, index) => {
      if (!proof.type) newErrors[`type_${index}`] = "ID type is required";
      if (!proof.value) newErrors[`value_${index}`] = "ID number is required";
      if (!proof.startDate)
        newErrors[`startDate_${index}`] = "Start date is required";
      if (!proof.endDate)
        newErrors[`endDate_${index}`] = "End date is required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    index: number,
    field: keyof CustomerProofOfId,
    value: string
  ) => {
    const updatedProofs = [...proofOfIds];
    updatedProofs[index] = { ...updatedProofs[index], [field]: value };
    setProofOfIds(updatedProofs);
  };

  const handleAddProof = () => {
    setProofOfIds([
      ...proofOfIds,
      {
        type: "",
        value: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const handleRemoveProof = (index: number) => {
    if (proofOfIds.length > 1) {
      const updatedProofs = proofOfIds.filter((_, i) => i !== index);
      setProofOfIds(updatedProofs);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      updateProofOfIds(proofOfIds);
      navigate("/customer-details");
    }
  };

  return (
    <div className="card max-w-lg mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6">Proof of Identity</h2>

      <form onSubmit={handleSubmit}>
        {proofOfIds.map((proof, index) => (
          <div
            key={index}
            className="mb-6 p-4 border border-gray-200 rounded-md"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">ID #{index + 1}</h3>
              {proofOfIds.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  className="text-red-500 py-1 px-2"
                  onClick={() => handleRemoveProof(index)}
                >
                  Remove
                </Button>
              )}
            </div>

            <FormField label="ID Type *" error={errors[`type_${index}`]}>
              <input
                type="text"
                className="form-control"
                value={proof.type}
                onChange={(e) =>
                  handleInputChange(index, "type", e.target.value)
                }
                placeholder="Passport, Driver's License, etc."
              />
            </FormField>

            <FormField label="ID Number *" error={errors[`value_${index}`]}>
              <input
                type="text"
                className="form-control"
                value={proof.value}
                onChange={(e) =>
                  handleInputChange(index, "value", e.target.value)
                }
                placeholder="ID Number"
              />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Issue Date *"
                error={errors[`startDate_${index}`]}
              >
                <input
                  type="date"
                  className="form-control"
                  value={proof.startDate}
                  onChange={(e) =>
                    handleInputChange(index, "startDate", e.target.value)
                  }
                />
              </FormField>

              <FormField
                label="Expiry Date *"
                error={errors[`endDate_${index}`]}
              >
                <input
                  type="date"
                  className="form-control"
                  value={proof.endDate}
                  onChange={(e) =>
                    handleInputChange(index, "endDate", e.target.value)
                  }
                />
              </FormField>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full mb-4"
          onClick={handleAddProof}
        >
          + Add Another ID
        </Button>

        <div className="flex justify-between mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/customer-address")}
          >
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
};

export default CustomerProofOfIdentityScreen;
