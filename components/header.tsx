'use client';

import { getUser } from '@/app/(auth)/action';
import ButtonPrev from './button-prev';
import React, { useEffect, useState } from 'react';
import { getTweetDetails } from '@/app/(home)/(home)/actions';
import { usePathname } from 'next/navigation';
import { basePathItems, IHeaderPath } from '@/lib/basePath';
import { RiCloseLine } from '@remixicon/react';

export default function Header() {
  const pathname = usePathname();
  const [pathItems, setPathItems] = useState<IHeaderPath[]>([]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getUser();
        let tweet = null;

        if (user?.id) {
          tweet = await getTweetDetails(user.id);
        }

        // url 업데이트
        const updatedPathItems = basePathItems.map((item) => {
          let updateHref = item.href;

          if (item.label === '게시글') {
            updateHref = `/tweets/${tweet?.id}`;
          } else if (item.label === '프로필') {
            updateHref = `/users/${user?.id}`;
          } else if (item.label === '프로필 수정') {
            updateHref = `/users/${user?.id}/edit`;
          }

          return { ...item, href: updateHref };
        });

        setPathItems(updatedPathItems);
      } catch (error) {
        console.error('사용자가 없습니다.', error);
      }
    }

    fetchUser();
  }, []);

  const updatedIcon = basePathItems
    .filter((item) => item.label === '추가')
    .map((item) => <RiCloseLine key={item.href} size={30} />);

  return (
    <div className='relative flex items-center justify-center min-h-14 px-3 bg-zinc-100'>
      {pathItems.map((item, idx) => (
        <React.Fragment key={idx}>
          {pathname === item.href && item.prev && (
            <ButtonPrev className='absolute top-3 left-3 text-dark'>
              {updatedIcon.length > 0 && updatedIcon[0]}
            </ButtonPrev>
          )}

          {pathname === item.href ? (
            <span className='text-base'>{item.label}</span>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
}
