'use client';

import { RiArrowLeftSLine } from '@remixicon/react';

interface ButtonProps {
  children?: string;
  className?: string;
}

export default function ButtonPrev({ children, className }: ButtonProps) {
  const handleClick = () => {
    window.history.back();
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-start ${className}`}
    >
      <RiArrowLeftSLine size={30} />
      {children}
    </button>
  );
}
