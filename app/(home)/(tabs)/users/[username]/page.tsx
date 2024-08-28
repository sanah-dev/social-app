import { logOut } from '@/app/(auth)/action';
import MyTweetList from '@/components/tweets/tweet-list';
import { RiAtLine, RiEditFill, RiGithubFill } from '@remixicon/react';
import Link from 'next/link';
import { getInitialMyTweets, getUserProfile } from './action';
import { Prisma } from '@prisma/client';
import UserAvatar from '@/components/common/avatar';
import NotFoundPage from '@/app/not-found';

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialMyTweets>;

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserProfile(params.username);
  if (!user) {
    return NotFoundPage;
  }

  const initialTweets = await getInitialMyTweets(user?.id!);

  return (
    <>
      <div className='flex items-start justify-between p-4 border-b border-b-zinc-200'>
        <div className='relative flex gap-4 w-full'>
          <UserAvatar
            width={60}
            height={60}
            src={user.avatar}
            alt={user.username}
            className='min-w-[60px] w-[60px] min-h-[60px] h-[60px]'
          />
          <Link
            href={`/users/${user?.username}/edit`}
            className='absolute top-10 left-10 p-1 bg-white border rounded-full text-xs'
          >
            <RiEditFill size={14} />
          </Link>

          <div className='flex flex-col gap-1 w-full'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center text-sm tracking-tight'>
                <i className='text-zinc-500'>
                  {user.email ? (
                    <RiAtLine size={14} />
                  ) : (
                    <RiGithubFill size={14} />
                  )}
                </i>
                <span className='font-semibold'>{user?.username}</span>
              </div>

              <button
                className='h-4 px-1 border border-zinc-500 rounded-full text-xs opacity-50'
                onClick={logOut}
              >
                로그아웃
              </button>
            </div>

            {user.bio && <p className='text-sm text-zinc-800'>{user.bio}</p>}
          </div>
        </div>
      </div>

      {/* <ul className='grid grid-cols-3 w-full p-3 border-b border-b-zinc-200'>
        <li className='flex flex-col text-center'>
          <span className='text-base font-semibold'>999</span>
          <span className='text-xs'>Tweets</span>
        </li>
        <li className='flex flex-col text-center'>
          <span className='text-base font-semibold'>999</span>
          <span className='text-xs'>Likes</span>
        </li>
        <li className='flex flex-col text-center'>
          <span className='text-base font-semibold'>999</span>
          <span className='text-xs'>Saved</span>
        </li>
      </ul> */}

      <MyTweetList initialTweets={initialTweets} />
    </>
  );
}
