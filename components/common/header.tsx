'use client';

import { usePathname } from 'next/navigation';
import { getHeaderRoutePaths, ROUTE_PATHS } from '@/lib/basePath';
import { RiCloseLargeLine } from '@remixicon/react';
import ButtonPrev from '../button/button-prev';

const shouldShowPrevButton = (pathname: string): boolean => {
  return (
    (pathname.startsWith('/tweets/') && pathname.split('/').length === 3) || // /tweets/:id
    pathname === ROUTE_PATHS.TWEET_ADD ||
    (pathname.includes('/users/') && pathname.endsWith('/edit')) // /users/:username/edit
  );
};

export default function Header() {
  const pathname = usePathname();
  const showPrevButton = shouldShowPrevButton(pathname);

  return (
    <>
      <header className='flex items-center gap-3 min-h-14 h-14 p-4 border-b'>
        {showPrevButton ? (
          <ButtonPrev>
            <RiCloseLargeLine className='size-5' />
          </ButtonPrev>
        ) : null}
        <h1 className='font-mon text-xl'>{getHeaderRoutePaths(pathname)}</h1>
      </header>
    </>
  );
}
