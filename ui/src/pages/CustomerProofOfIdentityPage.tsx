import React, { useState } from "react";
import { useNavigate } from "react-router";
import FormLayout from "../components/FormLayout";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import Button from "../components/Button";
import PageTransition from "../components/PageTransition";
import { useCustomerForm } from "../hooks/useCustomerForm";
import { CustomerProofOfId } from "../types/customer";

const idTypeOptions = [
  { value: "Passport", label: "Passport" },
  { value: "Driver's License", label: "Driver's License" },
  { value: "National ID", label: "National ID" },
  { value: "Aadhar Card", label: "Aadhar Card" },
  { value: "PAN Card", label: "PAN Card" },
];

const CustomerProofOfIdentityPage: React.FC = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useCustomerForm();

  const [proofOfIds, setProofOfIds] = useState<CustomerProofOfId[]>(
    formData.customerProofOfIds?.length
      ? [...formData.customerProofOfIds]
      : [{ type: "", value: "", startDate: "", endDate: "" }]
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    proofOfIds.forEach((id, index) => {
      if (!id.type) {
        newErrors[`type_${index}`] = "ID type is required";
      }

      if (!id.value) {
        newErrors[`value_${index}`] = "ID value is required";
      }

      if (!id.startDate) {
        newErrors[`startDate_${index}`] = "Issue date is required";
      }

      if (!id.endDate) {
        newErrors[`endDate_${index}`] = "Expiry date is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      updateFormData({ customerProofOfIds: proofOfIds });
      navigate("/customer-contact");
    }
  };

  const handlePrev = () => {
    updateFormData({ customerProofOfIds: proofOfIds });
    navigate("/customer-name");
  };

  const handleIdChange = (
    index: number,
    field: keyof CustomerProofOfId,
    value: string
  ) => {
    const updatedIds = [...proofOfIds];
    updatedIds[index] = { ...updatedIds[index], [field]: value };
    setProofOfIds(updatedIds);
  };

  const addIdDocument = () => {
    setProofOfIds([
      ...proofOfIds,
      { type: "", value: "", startDate: "", endDate: "" },
    ]);
  };

  const removeIdDocument = (index: number) => {
    if (proofOfIds.length === 1) return;
    const updatedIds = proofOfIds.filter((_, i) => i !== index);
    setProofOfIds(updatedIds);
  };

  return (
    <PageTransition>
      <FormLayout
        title="Proof of Identity"
        subtitle="Please provide details of your identification documents."
        onNext={handleNext}
        onPrev={handlePrev}
        currentStep={2}
        totalSteps={5}
      >
        <div className="space-y-8">
          {proofOfIds.map((id, index) => (
            <div key={index} className="p-4 border border-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">ID Document {index + 1}</h3>
                {proofOfIds.length > 1 && (
                  <button
                    onClick={() => removeIdDocument(index)}
                    className="text-red-400 hover:text-red-300 text-sm flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormSelect
                  label="ID Type"
                  id={`idType_${index}`}
                  options={idTypeOptions}
                  value={id.type}
                  onChange={(e) =>
                    handleIdChange(index, "type", e.target.value)
                  }
                  error={errors[`type_${index}`]}
                  required
                />

                <FormInput
                  label="ID Number"
                  id={`idValue_${index}`}
                  placeholder="Enter ID number"
                  value={id.value}
                  onChange={(e) =>
                    handleIdChange(index, "value", e.target.value)
                  }
                  error={errors[`value_${index}`]}
                  required
                />

                <FormInput
                  label="Issue Date"
                  id={`startDate_${index}`}
                  type="date"
                  value={id.startDate}
                  onChange={(e) =>
                    handleIdChange(index, "startDate", e.target.value)
                  }
                  error={errors[`startDate_${index}`]}
                  required
                />

                <FormInput
                  label="Expiry Date"
                  id={`endDate_${index}`}
                  type="date"
                  value={id.endDate}
                  onChange={(e) =>
                    handleIdChange(index, "endDate", e.target.value)
                  }
                  error={errors[`endDate_${index}`]}
                  required
                />
              </div>
            </div>
          ))}

          <Button
            variant="secondary"
            className="w-full flex items-center justify-center"
            onClick={addIdDocument}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Another ID Document
          </Button>

          <div className="p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
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
              Security Information
            </h3>
            <p className="text-sm text-gray-400">
              Your identification documents are securely stored and encrypted.
              We comply with all relevant data protection regulations regarding
              personal identification information.
            </p>
          </div>
        </div>
      </FormLayout>
    </PageTransition>
  );
};

export default CustomerProofOfIdentityPage;
