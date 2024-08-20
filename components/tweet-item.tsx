import { formatToTimeAgo } from '@/lib/utils';
import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/outline';

interface TweetProps {
  tweet: string;
  id: number;
  user: { username: string };
  created_at: Date;
}

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export default function TweetItem({ tweet, id, user, created_at }: TweetProps) {
  const truncatedTweet = truncateText(tweet, 118);

  return (
    <Link
      href={`/tweets/${id}`}
      className='flex flex-col p-4 bg-light rounded-xl *:text-dark bg-card shadow-card'
    >
      <div className='flex justify-between'>
        <span>@{user.username}</span>
        <small>{formatToTimeAgo(created_at.toString())}</small>
      </div>

      <p className='line-clamp-3'>{truncatedTweet}</p>

      <div className='flex items-center gap-2'>
        <HeartIcon className='ml-1 size-4' />
        <span>0 likes</span>
      </div>
    </Link>
  );
}
