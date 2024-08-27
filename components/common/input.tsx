import {
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  ReactNode,
} from 'react';

interface InputProps {
  text?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  name: string;
  errors?: string[];
  icon?: ReactNode;
  className?: string;
}

const _Input = (
  {
    text,
    type = 'text',
    placeholder,
    required,
    name,
    errors = [],
    icon,
    className,
    ...rest
  }: InputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const hasError = errors && errors.length > 0;
  return (
    <>
      <h3
        className={`mt-3 text-xs ${
          hasError ? 'text-zinc-500' : 'text-zinc-500'
        }`}
      >
        {text}
      </h3>

      <label className={`relative flex items-center gap-4 my-1 ${className}`}>
        {icon}
        <input
          ref={ref}
          name={name}
          type={type}
          className={`grow bg-white h-12 pl-10 rounded-md ring-1 ring-zinc-300 focus:ring-2 focus:ring-rose ${
            hasError ? 'outline outline-2 outline-red-500' : ''
          }`}
          placeholder={placeholder}
          required={required}
          {...rest}
        />
      </label>

      {errors.map((error, index) => (
        <span key={index} className='text-red-500 text-xs'>
          * {error}
        </span>
      ))}
    </>
  );
};

export default forwardRef(_Input);
