import { formatToMaxLength, formatToTimeAgo } from '@/lib/utils';
import Link from 'next/link';

export interface TweetProps {
  tweet: string;
  id: number;
  user: { username: string };
  created_at: Date;
}

export default function TweetItem({ tweet, id, user, created_at }: TweetProps) {
  return (
    <li className='p-2 bg-light border-2 rounded-xl overflow-hidden hover:border-rose'>
      <Link href={`/tweets/${id}`} className='flex flex-col *:text-dark'>
        <div className='flex justify-between p-1 border-b border-stone-300'>
          <div className='flex items-center gap-2'>
            <span>🙂</span>
            <span>{user.username}</span>
          </div>
          <small>{formatToTimeAgo(created_at.toString())}</small>
        </div>

        <p className='p-3 px-1'>{formatToMaxLength(tweet, 100)}</p>

        <div className='flex items-center gap-2 p-1 border-t border-stone-300'>
          <span>💬 0</span> <span>❤️ 0</span>
        </div>
      </Link>
    </li>
  );
}
