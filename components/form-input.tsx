import { ReactNode } from 'react';

interface IFormInputProps {
  type: string;
  placeholder: string;
  required?: boolean;
  errors?: string[];
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
}: IFormInputProps) {
  const hasError = errors && errors.length > 0;

  return (
    <>
      <label className='relative flex items-center gap-4 my-1 mt-3'>
        {icon}
        <input
          name={name}
          type={type}
          className={`grow bg-[#2d3f53] h-14 pl-10 focus:ring-2 focus:ring-[#7695b8] ${
            hasError ? 'outline outline-2 outline-red-500' : ''
          }`}
          placeholder={placeholder}
          required={required}
        />
      </label>
      {errors &&
        errors.map((error, index) => (
          <span
            key={index}
            className='text-red-500 font-medium text-left text-xs leading-5'
          >
            * {error}
          </span>
        ))}
    </>
  );
}
