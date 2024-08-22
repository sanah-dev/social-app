import { InputHTMLAttributes, ReactNode } from 'react';

interface IFormInputProps {
  type: string;
  placeholder: string;
  required?: boolean;
  errors?: string[];
  name: string;
  icon?: ReactNode;
}

export default function Input({
  name,
  type,
  placeholder,
  required,
  icon,
  errors = [],
  ...rest
}: IFormInputProps & InputHTMLAttributes<HTMLInputElement>) {
  const hasError = errors && errors.length > 0;

  return (
    <>
      <label className='relative flex items-center gap-4 my-1 mt-3'>
        {icon}
        <input
          name={name}
          type={type}
          className={`grow bg-zinc-400 h-12 pl-10 focus:ring-2 focus:ring-rose ${
            hasError ? 'outline outline-2 outline-red-500' : ''
          }`}
          placeholder={placeholder}
          required={required}
          {...rest}
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
