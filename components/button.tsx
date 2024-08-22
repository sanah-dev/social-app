'use client';

import { useFormStatus } from 'react-dom';
import { RiLoader2Line } from '@remixicon/react';

interface ButtonProps {
  children: any;
  className?: string;
}

export default function Button({ children, className }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={`w-full h-12 mt-3 bg-rose disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed ${className}`}
    >
      {pending ? <RiLoader2Line className='size-6 animate-spin' /> : children}
    </button>
  );
}
