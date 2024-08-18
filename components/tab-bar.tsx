'use client';

import {
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
  VideoCameraIcon as SolidVideoCameraIcon,
  UserIcon as SolidUserIcon,
} from '@heroicons/react/24/solid';
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
  VideoCameraIcon as OutlineVideoCameraIcon,
  UserIcon as OutlineUserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className='w-full grid grid-cols-5 bg-rose  *:text-white text-xs'>
      <Link
        href='/home'
        className='flex flex-col items-center justify-end gap-px py-3'
      >
        {pathname === '/home' ? (
          <SolidHomeIcon className='w-7 h-7' />
        ) : (
          <OutlineHomeIcon className='w-7 h-7' />
        )}
        <span>홈</span>
      </Link>
      <Link
        href='/life'
        className='flex flex-col items-center justify-end gap-px py-3'
      >
        {pathname === '/life' ? (
          <SolidNewspaperIcon className='w-7 h-7' />
        ) : (
          <OutlineNewspaperIcon className='w-7 h-7' />
        )}
        <span>동네생활</span>
      </Link>
      <Link
        href='/chat'
        className='flex flex-col items-center justify-end gap-px py-3'
      >
        {pathname === '/chat' ? (
          <SolidChatIcon className='w-7 h-7' />
        ) : (
          <OutlineChatIcon className='w-7 h-7' />
        )}
        <span>채팅</span>
      </Link>
      <Link
        href='/live'
        className='flex flex-col items-center justify-end gap-px py-3'
      >
        {pathname === '/live' ? (
          <SolidVideoCameraIcon className='w-7 h-7' />
        ) : (
          <OutlineVideoCameraIcon className='w-7 h-7' />
        )}
        <span>쇼핑</span>
      </Link>
      <Link
        href='/profile'
        className='flex flex-col items-center justify-end gap-px py-3'
      >
        {pathname === '/profile' ? (
          <SolidUserIcon className='w-7 h-7' />
        ) : (
          <OutlineUserIcon className='w-7 h-7' />
        )}
        <span>나의 당근</span>
      </Link>
    </div>
  );
}
