'use client';

import { useOptimistic } from 'react';
import {
  likeTweet,
  unLikeTweet,
} from '@/app/(home)/(tabs)/tweets/[id]/actions';
import { RiHeart3Fill, RiHeart3Line } from '@remixicon/react';

interface LikeButtonProps {
  isLiked: boolean; // 현재 좋아요 상태
  likeCount: number; // 좋아요 수
  tweetId: number; // 트윗 ID
}

export default function ButtonLike({
  isLiked,
  likeCount,
  tweetId,
}: LikeButtonProps) {
  const [state, setState] = useOptimistic(
    { isLiked, likeCount },
    (previousState, payload) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    })
  );

  const onClick = async () => {
    setState(undefined);

    if (state.isLiked) {
      await unLikeTweet(tweetId);
    } else {
      await likeTweet(tweetId);
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
