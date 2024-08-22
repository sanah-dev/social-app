'use client';

import { getUser } from '@/app/(auth)/action';
import ButtonPrev from './button-prev';
import React, { useEffect, useState } from 'react';
import { getTweetDetails } from '@/app/(home)/(home)/actions';
import { usePathname } from 'next/navigation';
import { basePathItems, IHeaderPath } from '@/lib/basePath';

export default function Header() {
  const pathname = usePathname();
  const [pathItems, setPathItems] = useState<IHeaderPath[]>([]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getUser();
        // const tweet = await getTweetDetails(user?.id!);
        let tweet;
        if (user?.id) {
          tweet = await getTweetDetails(user.id);
        } else {
          tweet = null;
        }

        // url 업데이트
        const updatedPathItems = basePathItems.map((item) => {
          let updatedHref = item.href;

          if (item.label === '게시글') {
            updatedHref = `/tweets/${tweet?.id}`;
          } else if (item.label === '프로필') {
            updatedHref = `/users/${user?.id}`;
          } else if (item.label === '프로필 편집') {
            updatedHref = `/users/${user?.id}/edit`;
          } else if (item.label === '내가 작성한 트윗') {
            updatedHref = `/users/${user?.id}/tweets`;
          } else if (item.label === '내가 좋아한 트윗') {
            updatedHref = `/users/${user?.id}/likes`;
          }

          return {
            ...item,
            href: updatedHref,
          };
        });

        setPathItems(updatedPathItems);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    }

    fetchUser();
  }, []);

  return (
    <div className='relative flex items-center justify-center min-h-14 px-3 bg-zinc-100'>
      {pathItems.map((item, idx) => (
        <React.Fragment key={idx}>
          {pathname === item.href ? (
            <span className='text-base'>{item.label}</span>
          ) : null}
          {pathname === item.href && item.prev && (
            <ButtonPrev className='absolute top-3 left-3 text-dark' />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
