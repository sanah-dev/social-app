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
      className={`flex items-center justify-center h-12 text-white bg-rose rounded-md transition hover:bg-rose_hover disabled:bg-rose_hover disabled:cursor-not-allowed ${className}`}
    >
      {pending ? <RiLoader2Line className='size-6 animate-spin' /> : children}
    </button>
  );
}
