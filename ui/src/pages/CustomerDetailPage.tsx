import React from "react";
import { useNavigate } from "react-router";
import FormLayout from "../components/FormLayout";
import PageTransition from "../components/PageTransition";

const CustomerDetailPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/customer-name");
  };

  return (
    <PageTransition>
      <FormLayout
        title="Customer Information"
        subtitle="Please fill out all the required information across the next few screens."
        onNext={handleNext}
        currentStep={0}
        totalSteps={5}
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">What we'll collect</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-gray-700/30 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="font-medium">Personal Details</h3>
              </div>
              <p className="text-sm text-gray-400">
                Name and basic information
              </p>
            </div>

            <div className="card bg-gray-700/30 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-purple-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2a1 1 0 011-1h8a1 1 0 011 1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="font-medium">Identification</h3>
              </div>
              <p className="text-sm text-gray-400">
                Proof of identity documents
              </p>
            </div>

            <div className="card bg-gray-700/30 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <h3 className="font-medium">Contact Details</h3>
              </div>
              <p className="text-sm text-gray-400">
                Email and phone contact information
              </p>
            </div>

            <div className="card bg-gray-700/30 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="font-medium">Address</h3>
              </div>
              <p className="text-sm text-gray-400">
                Residential or business address details
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
            <p className="text-sm">
              <span className="font-semibold">Note:</span> All information
              provided will be securely stored and processed according to our
              privacy policy.
            </p>
          </div>
        </div>
      </FormLayout>
    </PageTransition>
  );
};

export default CustomerDetailPage;
