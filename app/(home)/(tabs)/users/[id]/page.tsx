import { getUser, logOut } from '@/app/(auth)/action';
import MyTweetList from '@/components/tweets/tweet-list';
import { RiEditFill } from '@remixicon/react';
import Link from 'next/link';
import { getInitialMyTweets } from './action';
import { Prisma } from '@prisma/client';
import UserAvatar from '@/components/common/avatar';
import NotFoundPage from '@/app/not-found';

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialMyTweets>;

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
            src={user.avatar}
            alt={user.username}
          />
        </Link>
        <span className='text-base'>{user?.username}</span>
        <p className='text-sm text-zinc-600'>안녕하세요 👋</p>
        {user.bio && <p className='text-sm text-zinc-600'>{user.bio}</p>}

        <button
          className='absolute right-5 flex items-center gap-1 text-zinc-400 text-xs border p-2'
          onClick={logOut}
        >
          로그아웃
        </button>
      </div>

      <MyTweetList initialTweets={initialTweets} />
    </>
  );
}
