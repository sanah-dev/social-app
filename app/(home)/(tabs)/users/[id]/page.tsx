import { getUser, logOut } from '@/app/(auth)/action';
import MyTweetList from '@/components/tweet-list';
import { RiEditFill, RiLogoutBoxRLine } from '@remixicon/react';
import Link from 'next/link';
import { getInitialMyTweets } from './action';
import { Prisma } from '@prisma/client';

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialMyTweets>;

export default async function UserPage() {
  const user = await getUser();
  const initialTweets = await getInitialMyTweets(user?.id!);

  return (
    <>
      <div className='flex flex-col items-center gap-2 p-4 border-b border-b-zinc-200'>
        <Link href={`/users/${user?.id}/edit`} className='relative'>
          <RiEditFill size={20} className='absolute bottom-0 right-0' />
          <img
            src={user?.avatar!}
            alt={user?.username}
            width={60}
            height={60}
            className='rounded-full overflow-hidden'
          />
        </Link>
        {/* <span className='size-7 min-w-[28px] bg-zinc-300 rounded-full' /> */}
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
