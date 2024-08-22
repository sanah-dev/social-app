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
      <p className='text-lg'>좋은 하루 보내세요 ☘️</p>
      <div className='flex items-center gap-2 p-4'>
        <span className='size-7 min-w-[28px] bg-zinc-300 rounded-full' />
        <div className='flex flex-col'>
          <span className='text-sm'>
            <span className='text-base text-rose'>{user?.username}</span>
            <span className='text-zinc-700'>님</span>{' '}
          </span>
        </div>
      </div>

      <ul>
        <li>
          <Link href={`/users/${user?.id}/edit`}>프로필 편집</Link>
        </li>
        <li>
          <Link href={`/users/${user?.id}/tweets`}>작성한 트윗</Link>
        </li>
        <li>
          <Link href={`/users/${user?.id}/likes`}>좋아요 누른 트윗</Link>
        </li>
        <li>
          <button onClick={logOut}>로그아웃하기</button>
        </li>
      </ul>
    </>
  );
}
