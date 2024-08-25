'use client';

import TweetItem from '@/components/tweets/tweet-item';
import { useEffect, useState } from 'react';
import { InitialTweets } from '../../app/(home)/(home)/page';
import { formatToMaxLength } from '@/lib/utils';
import Link from 'next/link';

interface TweetListProps {
  initialTweets: InitialTweets;
  search?: string;
}

export default function TweetSearchList({
  initialTweets,
  search,
}: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);

  useEffect(() => {
    if (search) {
      setTweets(initialTweets);
    }
  }, [search]);
  return (
    <div className='flex flex-col gap-5 w-full'>
      <ul className='flex flex-col'>
        {tweets.map((tweet) => (
          <li key={tweet.id} className='border-b-8 border-b-zinc-200'>
            <Link href={`/tweets/${tweet.id}`}>
              <TweetItem
                id={tweet.id}
                tweet={formatToMaxLength(tweet.tweet, 170)}
                user={tweet.user}
                created_at={tweet.created_at}
                _count={{
                  likes: tweet._count.likes,
                  comments: tweet._count.comments,
                }}
              />
            </Link>
          </li>
        ))}
      </ul>
      {tweets.length === 0 && (
        <p className='text-rose-600 text-center font-semibold text-sm'>
          검색 결과가 없습니다.
        </p>
      )}
    </div>
  );
}
