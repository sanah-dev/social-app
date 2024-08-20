'use client';

import { HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';
import { useOptimistic } from 'react';
import { likeTweet, dislikeTweet } from '@/app/(home)/tweets/[id]/actions';

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function ButtonLike({
  isLiked,
  likeCount,
  tweetId,
}: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    })
  );
  const onClick = async () => {
    reducerFn(undefined);
    if (isLiked) {
      await dislikeTweet(tweetId);
    } else {
      await likeTweet(tweetId);
    }
  };
  return (
    <button
      onClick={onClick}
      // className={`flex items-center gap-2 ${state.isLiked ? 'text-dark' : ''}`}
    >
      {state.isLiked ? (
        <HeartIcon className='size-4 text-red-500' />
      ) : (
        <OutlineHeartIcon className='size-4 text-stone-400' />
      )}

      {/* {state.isLiked ? (
        <span>{state.likeCount}</span>
      ) : (
        <span>공감하기 ({state.likeCount})</span>
      )} */}
    </button>
  );
}
