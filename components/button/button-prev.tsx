'use client';

import { RiArrowLeftSLine } from '@remixicon/react';

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export default function ButtonPrev({
  children = <RiArrowLeftSLine size={30} />,
  className,
}: ButtonProps) {
  const handleClick = () => {
    window.history.back();
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-start ${className}`}
    >
      {children}
    </button>
  );
}
