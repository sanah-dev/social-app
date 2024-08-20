import { ReactNode } from 'react';

interface FormInputProps {
  type: string;
  placeholder: string;
  required?: boolean;
  errors: string[];
  name: string;
  icon?: ReactNode;
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors,
  name,
  icon,
}: FormInputProps) {
  const hasError = errors && errors.length > 0;

  return (
    <>
      <label className='form-label'>
        {icon}
        <input
          name={name}
          type={type}
          className={`form-input ${
            hasError ? 'outline outline-2 outline-red-500' : ''
          }`}
          placeholder={placeholder}
          required={required}
        />
      </label>
    </>
  );
}
