import { useState } from "react";
import { useNavigate } from "react-router";
import { useCustomer } from "../context/CustomerContext";
import { Button } from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";

const ConfirmationScreen = () => {
  const navigate = useNavigate();
  const { customerData, submitCustomerData } = useCustomer();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      await submitCustomerData();
      setSuccess(true);
    } catch (err) {
      setError("Failed to submit customer data. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="card max-w-lg mx-auto my-8 text-center fade-in">
        <div className="text-green-400 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-300">
          Registration Successful!
        </h2>
        <p className="mb-8 text-gray-300">
          Your information has been securely submitted and processed.
        </p>
        <Button onClick={() => navigate("/")} className="w-full">
          Return Home
        </Button>
      </div>
    );
  }

  return (
    <div className="card max-w-lg mx-auto my-8 fade-in">
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
        Review & Confirm
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-900/50 text-red-300 rounded-md border border-red-700">
          {error}
        </div>
      )}

      <div className="space-y-6 staggered">
        <div className="border-b border-gray-700 pb-4 slide-up fade-in">
          <h3 className="font-semibold mb-2 text-purple-300">
            Personal Information
          </h3>
          <p>
            <span className="text-gray-400">Name:</span>{" "}
            {customerData.name?.firstName}{" "}
            {customerData.name?.middleName
              ? customerData.name.middleName + " "
              : ""}
            {customerData.name?.lastName}
          </p>
        </div>

        <div className="border-b border-gray-700 pb-4 slide-up fade-in">
          <h3 className="font-semibold mb-2 text-purple-300">
            Contact Information
          </h3>
          <p>
            <span className="text-gray-400">Email:</span>{" "}
            {customerData.contact?.email}
          </p>
          <p>
            <span className="text-gray-400">Phone:</span>{" "}
            {customerData.contact?.phone}
          </p>
          {customerData.contact?.alternatePhone && (
            <p>
              <span className="text-gray-400">Alternate Phone:</span>{" "}
              {customerData.contact.alternatePhone}
            </p>
          )}
        </div>

        <div className="border-b border-gray-700 pb-4 slide-up fade-in">
          <h3 className="font-semibold mb-2 text-purple-300">Address</h3>
          <p>{customerData.address?.street}</p>
          <p>
            {customerData.address?.city}, {customerData.address?.state}{" "}
            {customerData.address?.zipCode}
          </p>
          <p>{customerData.address?.country}</p>
        </div>

        <div className="border-b border-gray-700 pb-4 slide-up fade-in">
          <h3 className="font-semibold mb-2 text-purple-300">
            Proof of Identity
          </h3>
          {customerData.customerProofOfIds?.map((proof, index) => (
            <div key={index} className="mb-2">
              <p>
                <span className="text-gray-400">{proof.type}:</span>{" "}
                {proof.value}
              </p>
              <p>
                <span className="text-gray-400">Valid:</span>{" "}
                {new Date(proof.startDate).toLocaleDateString()} to{" "}
                {new Date(proof.endDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        <div className="slide-up fade-in">
          <h3 className="font-semibold mb-2 text-purple-300">
            Additional Identification
          </h3>
          <ul className="list-disc pl-5 text-gray-300">
            {customerData.customerIdentifications?.map((id, index) => (
              <li key={index}>{id.item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/customer-details")}
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button onClick={handleSubmit} isLoading={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center">
              <LoadingSpinner size="sm" />
              <span className="ml-2">Processing...</span>
            </span>
          ) : (
            "Submit Registration"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
