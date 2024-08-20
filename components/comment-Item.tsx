import { formatToTimeAgo } from '@/lib/utils';

export function CommentItem({
  id,
  user,
  created_at,
  payload,
  userId,
  commentDelete,
}: {
  id: number;
  user: { username: string; id: number };
  created_at: Date;
  payload: string;
  userId: number;
  commentDelete: (id: number) => void;
}) {
  return (
    <li
      key={id}
      className='border-b border-stone-300 py-2 last:border-none last:pb-6'
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <span>🙂</span>
          <span>{user.username}</span>
          <small>{formatToTimeAgo(created_at.toString())}</small>
        </div>

        {userId === user.id ? (
          <button
            onClick={() => commentDelete(id)}
            className='inline-flex items-center justify-center size-4'
          >
            ❎
          </button>
        ) : null}
      </div>

      <p>{payload}</p>
    </li>
  );
}
