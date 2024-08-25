import { formatToDateTime, formatToTimeAgo } from '@/lib/utils';
import { RiCloseFill } from '@remixicon/react';
import UserAvatar from '../common/avatar';
export function CommentItem({
  id,
  user,
  created_at,
  payload,
  userId,
  commentDelete,
}: {
  id: number;
  user: { username: string; id: number; avatar: string | null };
  created_at: Date;
  payload: string;
  userId: number;
  commentDelete: (id: number) => void;
}) {
  return (
    <li key={id} className='relative border-b border-zinc-100'>
      <div className='flex flex-1 gap-2 p-4'>
        <UserAvatar
          width={32}
          height={32}
          src={user.avatar ?? null}
          alt={user.username}
          className='size-8'
        />

        <div className='flex flex-col gap-1'>
          <span className='text-sm'>
            {user.username}
            {userId === user.id ? (
              <small className='pl-1 text-rose'>내 댓글</small>
            ) : null}
          </span>

          <p className=''>{payload}</p>

          <div className='flex items-center gap-4 mt-3 *:text-zinc-400 *:text-xs'>
            <span>{formatToDateTime(created_at.toString())}</span>
          </div>
        </div>
      </div>

      {userId === user.id ? (
        <button
          onClick={() => commentDelete(id)}
          className='absolute right-4 top-4 inline-flex items-center justify-center'
        >
          <RiCloseFill className='size-4 transition text-zinc-400 hover:text-zinc-700' />
        </button>
      ) : null}
    </li>
  );
}
