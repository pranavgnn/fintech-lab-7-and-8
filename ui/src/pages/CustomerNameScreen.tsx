import { useState } from "react";
import { useNavigate } from "react-router";
import { useCustomer } from "../context/CustomerContext";
import { FormField } from "../components/FormField";
import { Button } from "../components/Button";

const CustomerNameScreen = () => {
  const navigate = useNavigate();
  const { customerData, updateName } = useCustomer();

  const [firstName, setFirstName] = useState(
    customerData.name?.firstName || ""
  );
  const [lastName, setLastName] = useState(customerData.name?.lastName || "");
  const [middleName, setMiddleName] = useState(
    customerData.name?.middleName || ""
  );
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
  });

  const validateForm = () => {
    const newErrors = {
      firstName: firstName ? "" : "First name is required",
      lastName: lastName ? "" : "Last name is required",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      updateName({ firstName, lastName, middleName });
      navigate("/customer-contact");
    }
  };

  return (
    <div className="card max-w-lg mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6">Customer Name</h2>

      <form onSubmit={handleSubmit}>
        <FormField label="First Name *" error={errors.firstName}>
          <input
            type="text"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormField>

        <FormField label="Middle Name (Optional)">
          <input
            type="text"
            className="form-control"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </FormField>

        <FormField label="Last Name *" error={errors.lastName}>
          <input
            type="text"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormField>

        <div className="flex justify-between mt-6">
          <Button type="button" variant="outline" onClick={() => navigate("/")}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
};

export default CustomerNameScreen;
