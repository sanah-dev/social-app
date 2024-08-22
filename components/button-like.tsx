'use client';

import { useOptimistic } from 'react';
import {
  likeTweet,
  dislikeTweet,
} from '@/app/(home)/(tabs)/tweets/[id]/actions';
import { RiHeart3Fill, RiHeart3Line } from '@remixicon/react';

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

interface LikeState {
  isLiked: boolean;
  likeCount: number;
}

export default function ButtonLike({
  isLiked,
  likeCount,
  tweetId,
}: LikeButtonProps) {
  const [state, setState] = useOptimistic(
    { isLiked, likeCount },
    (prevState) => ({
      isLiked: !prevState.isLiked,
      likeCount: prevState.isLiked
        ? prevState.likeCount - 1
        : prevState.likeCount + 1,
    })
  );

  const onClick = async () => {
    // Optimistic UI 업데이트
    setState(undefined);

    try {
      if (state.isLiked) {
        await dislikeTweet(tweetId);
      } else {
        await likeTweet(tweetId);
      }
    } catch (error) {
      setState((prevState: LikeState) => ({
        ...prevState,
        isLiked: prevState.isLiked,
        likeCount: prevState.likeCount,
      }));
      console.error('Failed to update like status:', error);
    }
  };

  return (
    <button onClick={onClick} className='flex items-center gap-1'>
      {state.isLiked ? (
        <RiHeart3Fill className='size-5 text-rose' />
      ) : (
        <RiHeart3Line className='size-5 text-stone-400' />
      )}

      <span className='text-zinc-400'>{state.likeCount}</span>
    </button>
  );
}
