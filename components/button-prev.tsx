'use client';

import { ChevronLeftIcon } from './icon';

interface ButtonProps {
  children?: string;
}

export default function ButtonPrev({ children }: ButtonProps) {
  const handleClick = () => {
    window.history.back();
  };

  return (
    <span className='opacity-70'>
      <button onClick={handleClick} className='flex items-center justify-start'>
        <ChevronLeftIcon width={24} height={24} />
        {children}
      </button>
    </span>
  );
}
