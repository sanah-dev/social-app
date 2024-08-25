'use client';

import { useEffect, useRef, useState } from 'react';
import { getTweetMore } from '@/app/(home)/(home)/actions';
import { InitialTweets } from '@/app/(home)/(home)/page';
import TweetItem from './tweet-item';
import Link from 'next/link';
import { formatToMaxLength } from '@/lib/utils';
import { RiArrowUpLine, RiLoader2Line } from '@remixicon/react';

// TODO: 중복된 데이터가 들어오면 안되는데 왜 들어오는거지 🤔
//! 중복된 id 제거
const removeDuplicateTweets = (tweets: any[]) => {
  const seenIds = new Set();
  return tweets.filter((tweet) => {
    if (seenIds.has(tweet.id)) {
      // 중복된 id 제거
      return false;
    } else {
      // 새로운 id 추가
      seenIds.add(tweet.id);
      return true;
    }
  });
};

export default function TweetList({
  initialTweets,
}: {
  initialTweets: InitialTweets;
}) {
  const [tweets, setTweets] = useState(removeDuplicateTweets(initialTweets));
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPage, setLastPage] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadMoreTweets = async () => {
    // 로딩중 또는 마지막 페이지라면 중단
    if (isLoading || lastPage) return;

    setIsLoading(true);
    const newTweets = await getTweetMore(page + 1);
    if (newTweets.length !== 0) {
      // 새로운 트윗과 기존 트윗을 합친 후 중복 제거
      const filteredTweets = removeDuplicateTweets([...tweets, ...newTweets]);

      setPage((prev) => prev + 1);
      setTweets(filteredTweets);
    } else {
      // 트윗이 없으면
      setLastPage(true);
    }
    setIsLoading(false);
  };

  const handleScroll = () => {
    // 로딩중 또는 마지막 페이지라면 중단
    if (isLoading || lastPage) return;

    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const clientHeight = containerRef.current.clientHeight;
      const scrollHeight = containerRef.current.scrollHeight;

      // 스크롤이 컴포넌트 끝에 가까워지면 데이터 로드
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        loadMoreTweets();
      }

      // 스크롤 top 버튼 노출
      if (scrollTop > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    }
  };

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('scroll', handleScroll);

      return () => {
        currentContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isLoading, lastPage]);

  //? 데이터 확인용
  // useEffect(() => {
  //   console.log('Tweets:', tweets);
  // }, [tweets]);

  return (
    <div ref={containerRef} className='overflow-y-auto h-full'>
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

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className='absolute right-5 bottom-4 p-[10px] text-zinc-400 bg-zinc-50 border border-zinc-400 rounded-lg'
          aria-label='Scroll to top'
        >
          <RiArrowUpLine size={20} />
        </button>
      )}

      {isLoading && (
        <span className='flex items-start justify-center h-8 bg-zinc-200 text-center'>
          <RiLoader2Line size={24} className='animate-spin' />
        </span>
      )}
    </div>
  );
}
