import { getUser, logOut } from '@/app/(auth)/action';
import db from '@/lib/db';
import getSession from '@/lib/session';
import Link from 'next/link';

async function getUserProfile() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id!,
    },
    select: {
      username: true,
      // avatar: true,
    },
  });
  return user;
}

export default async function Profile() {
  const user = await getUser();

  return (
    <>
      <div className='flex items-center gap-2 p-4'>
        <span className='size-7 min-w-[28px] bg-zinc-300 rounded-full' />
        <div className='flex flex-col'>
          <span className='text-sm'>
            <span className='text-base text-rose'>{user?.username}</span>
            <span className='text-zinc-700'>님</span>{' '}
          </span>
        </div>
        <Link href={`/users/${user?.id}/edit`}>프로필 수정</Link>
      </div>

      <ul>
        <li></li>
        <li>
          <button onClick={logOut}>로그아웃하기</button>
        </li>
      </ul>
    </>
  );
}
