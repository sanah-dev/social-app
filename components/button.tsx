'use client';

import { useFormStatus } from 'react-dom';

interface ButtonProps {
  children: string;
  className?: string;
}

export default function Button({ children, className }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={`w-full h-12 mt-3 bg-rose disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed ${className}`}
    >
      {pending ? '로딩 중' : children}
    </button>
  );
}
