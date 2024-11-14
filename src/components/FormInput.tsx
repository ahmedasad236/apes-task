import { InputHTMLAttributes, forwardRef } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

// Use forwardRef to forward the ref from react-hook-form to the input
const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, ...inputProps }, ref) => {
    return (
      <div>
        {label && (
          <label
            htmlFor={inputProps.id}
            className="block text-sm font-medium"
          >
            {label}
          </label>
        )}
        <input
          {...inputProps}
          ref={ref} // pass down the ref
          className={`w-full border p-2 rounded-md focus:outline-none focus:ring-2 ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
