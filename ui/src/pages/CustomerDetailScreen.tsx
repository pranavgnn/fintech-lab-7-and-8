import { useState } from "react";
import { useNavigate } from "react-router";
import { useCustomer } from "../context/CustomerContext";
import { FormField } from "../components/FormField";
import { Button } from "../components/Button";
import { CustomerIdentification } from "../types/customer";

const CustomerDetailScreen = () => {
  const navigate = useNavigate();
  const { customerData, updateIdentifications } = useCustomer();

  const [identifications, setIdentifications] = useState<
    CustomerIdentification[]
  >(
    customerData.customerIdentifications?.length
      ? customerData.customerIdentifications
      : [
          {
            type: 1,
            item: "",
          },
        ]
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    identifications.forEach((id, index) => {
      if (!id.item)
        newErrors[`item_${index}`] = "Identification item is required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    index: number,
    field: keyof CustomerIdentification,
    value: any
  ) => {
    const updatedIds = [...identifications];
    updatedIds[index] = {
      ...updatedIds[index],
      [field]: field === "type" ? parseInt(value) : value,
    };
    setIdentifications(updatedIds);
  };

  const handleAddIdentification = () => {
    setIdentifications([
      ...identifications,
      {
        type: identifications.length + 1,
        item: "",
      },
    ]);
  };

  const handleRemoveIdentification = (index: number) => {
    if (identifications.length > 1) {
      const updatedIds = identifications.filter((_, i) => i !== index);
      // Update the type numbers to be sequential
      const reindexedIds = updatedIds.map((id, i) => ({
        ...id,
        type: i + 1,
      }));
      setIdentifications(reindexedIds);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      updateIdentifications(identifications);
      navigate("/confirmation");
    }
  };

  return (
    <div className="card max-w-lg mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6">Additional Identification</h2>

      <form onSubmit={handleSubmit}>
        {identifications.map((id, index) => (
          <div
            key={index}
            className="mb-6 p-4 border border-gray-200 rounded-md"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Identification #{index + 1}</h3>
              {identifications.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  className="text-red-500 py-1 px-2"
                  onClick={() => handleRemoveIdentification(index)}
                >
                  Remove
                </Button>
              )}
            </div>

            <FormField
              label="Identification Item *"
              error={errors[`item_${index}`]}
            >
              <input
                type="text"
                className="form-control"
                value={id.item}
                onChange={(e) =>
                  handleInputChange(index, "item", e.target.value)
                }
                placeholder="Passport, Driver's License, etc."
              />
            </FormField>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full mb-4"
          onClick={handleAddIdentification}
        >
          + Add Another Identification
        </Button>

        <div className="flex justify-between mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/customer-proof-identity")}
          >
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
};

export default CustomerDetailScreen;
