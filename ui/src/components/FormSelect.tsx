import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  id,
  options,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-2 text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        className={`form-input ${
          error ? "border-red-500 focus:ring-red-500" : ""
        } ${className}`}
        {...props}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormSelect;
