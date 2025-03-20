import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export const FormField = ({
  label,
  error,
  children,
  className = "",
}: FormFieldProps) => {
  return (
    <div className={`mb-4 fade-in slide-up ${className}`}>
      <label className="block text-gray-300 text-sm font-medium mb-2">
        {label}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};
