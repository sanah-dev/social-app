import { formatToDateTime } from '@/lib/utils';
import { RiBookmarkLine, RiChat1Line, RiHeart3Line } from '@remixicon/react';
import ButtonLike from './button-like';

export interface TweetProps {
  id: number;
  tweet: string;
  user: { username: string; avatar?: string };
  created_at: Date;
  likes: number;
  comments: number;
}

export default function TweetItem({
  tweet,
  id,
  user,
  created_at,
  likes,
  comments,
}: TweetProps) {
  return (
    <section className='flex flex-col'>
      <div className='flex items-center gap-2 p-4'>
        <img
          src={user.avatar}
          alt={user.username}
          width={28}
          height={28}
          className='rounded-full overflow-hidden border border-zinc-300'
        />
        <div className='flex flex-col'>
          <span className='text-sm'>{user.username}</span>
          <time className='text-xs text-zinc-400'>
            {formatToDateTime(created_at.toString())}
          </time>
        </div>
      </div>

      <div className='px-4 break-words'>{tweet}</div>

      <div className='flex items-center justify-between gap-4 mt-4 px-4 py-3 border-t border-t-zinc-100'>
        <span className='flex items-center justify-center gap-4'>
          <span className='flex items-center gap-1'>
            <ButtonLike isLiked={false} likeCount={likes} tweetId={id} />
          </span>
          <span className='flex items-center gap-1'>
            <RiChat1Line className='size-5 text-zinc-400' />
            <span className='text-xs text-zinc-400'>{comments}</span>
          </span>
        </span>
      </div>
    </section>
  );
}
