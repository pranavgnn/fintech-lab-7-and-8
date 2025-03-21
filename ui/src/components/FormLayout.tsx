import React from "react";
import Button from "./Button";

interface FormLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
  isLastStep?: boolean;
  currentStep?: number;
  totalSteps?: number;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  subtitle,
  children,
  onNext,
  onPrev,
  isLastStep = false,
  currentStep = 0,
  totalSteps = 5,
}) => {
  return (
    <div className="page-container">
      <div className="w-full">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="text-sm text-gray-400">
              Step {currentStep + 1}/{totalSteps}
            </div>
          </div>
          {subtitle && <p className="text-gray-400">{subtitle}</p>}
        </div>

        <div className="w-full h-2 bg-gray-700 rounded-full mb-10">
          <div
            className="h-full bg-[hsl(var(--accent))] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>

        <div className="card fadeIn">{children}</div>

        <div className="flex justify-between mt-8">
          {onPrev && (
            <Button
              variant="secondary"
              onClick={onPrev}
              className="min-w-[120px]"
            >
              Previous
            </Button>
          )}
          {onNext && (
            <Button
              onClick={onNext}
              className={`min-w-[120px] ${!onPrev ? "ml-auto" : ""}`}
            >
              {isLastStep ? "Submit" : "Next"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
