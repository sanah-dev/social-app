'use client';

import { useFormStatus } from 'react-dom';

interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className='form-button'>
      {pending ? 'Loading...' : text}
    </button>
  );
}
