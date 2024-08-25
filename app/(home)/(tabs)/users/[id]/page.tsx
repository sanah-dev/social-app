import { getUser, logOut } from '@/app/(auth)/action';
import MyTweetList from '@/components/tweets/tweet-list';
import { RiEditFill, RiLogoutBoxRLine } from '@remixicon/react';
import Link from 'next/link';
import { getInitialMyTweets } from './action';
import { Prisma } from '@prisma/client';
import UserAvatar from '@/components/common/avatar';
import NotFoundPage from '@/app/not-found';

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialMyTweets>;

export const metadata = {
  title: '프로필',
};

export default async function UserPage() {
  const user = await getUser();
  if (!user) {
    return NotFoundPage;
  }

  const initialTweets = await getInitialMyTweets(user?.id!);

  return (
    <>
      <div className='flex flex-col items-center gap-2 p-4 border-b border-b-zinc-200'>
        <Link href={`/users/${user?.id}/edit`} className='relative'>
          <RiEditFill size={20} className='absolute bottom-0 right-0' />
          <UserAvatar
            width={60}
            height={60}
            avatar={user.avatar}
            username={user.username}
          />
        </Link>
        <span className='text-base'>{user?.username}</span>
        <button
          className='flex items-center gap-1 text-zinc-400 text-xs border p-2'
          onClick={logOut}
        >
          로그아웃
        </button>
      </div>

      <MyTweetList initialTweets={initialTweets} />
    </>
  );
}
