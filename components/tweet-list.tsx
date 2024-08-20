'use client';
import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { getTweets } from '@/app/(home)/(home)/actions';
import { InitialTweets } from '@/app/(home)/(home)/page';
import TweetItem from './tweet-item';

export default function TweetList({
  initialTweets,
}: {
  initialTweets: InitialTweets;
}) {
  const [tweets, setTweets] = useState(initialTweets);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPage, setLastPage] = useState(false);

  useEffect(() => {
    const fetchTweets = async () => {
      setIsLoading(true);
      try {
        const newTweets = await getTweets(page);
        if (newTweets.length === 0) {
          setLastPage(true);
        } else {
          setTweets(newTweets);
          setLastPage(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (page > 0) {
      fetchTweets();
    }
  }, [page]);

  const handlePrev = async () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = async () => {
    if (!lastPage) {
      setPage((prev) => prev + 1);
    }
  };

  const defaultStyle = 'flex items-center text-xs';
  const unableStyle = `flex items-center text-xs opacity-25 cursor-no-drop`;

  return (
    <>
      <ul className='flex flex-col gap-4'>
        {tweets.map((tweet) => (
          <TweetItem key={tweet.id} {...tweet} />
        ))}
      </ul>

      <div className='flex items-center justify-between my-6 text-[#ecf0f1c5]'>
        <button
          onClick={handlePrev}
          disabled={page === 1 || isLoading}
          className={page === 1 ? unableStyle : defaultStyle}
        >
          <ChevronLeftIcon className='size-7' />
          이전
        </button>

        <span className='flex items-center justify-center size-6 bg-[#ecf0f112] text-light rounded-md'>
          {page + 1}
        </span>

        <button
          onClick={handleNext}
          disabled={lastPage || isLoading}
          className={lastPage ? unableStyle : defaultStyle}
        >
          다음
          <ChevronRightIcon className='size-7' />
        </button>
      </div>
    </>
  );
}
