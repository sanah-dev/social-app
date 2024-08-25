'use client';

import { useOptimistic } from 'react';
import {
  saveTweet,
  unSaveTweet,
} from '@/app/(home)/(tabs)/tweets/[id]/actions';
import {
  RiBookmarkFill,
  RiBookmarkLine,
  RiHeart3Fill,
  RiHeart3Line,
} from '@remixicon/react';

interface ISaveButtonProps {
  isSaved: boolean;
  tweetId: number;
}

interface SaveState {
  isSaved: boolean;
}

export default function ButtonSave({ isSaved, tweetId }: ISaveButtonProps) {
  const [state, setState] = useOptimistic({ isSaved }, (prevState) => ({
    isSaved: !prevState.isSaved,
  }));

  const onClick = async () => {
    // Optimistic UI 업데이트
    setState(undefined);

    try {
      if (state.isSaved) {
        await unSaveTweet(tweetId);
      } else {
        await saveTweet(tweetId);
      }
    } catch (error) {
      setState((prevState: SaveState) => ({
        ...prevState,
        isSaved: prevState.isSaved,
        saveCount: prevState.isSaved,
      }));
      console.error('Failed to update save status:', error);
    }
  };

  return (
    <button onClick={onClick} className='flex items-center gap-1'>
      {state.isSaved ? (
        <RiBookmarkFill className='size-5 text-rose' />
      ) : (
        <RiBookmarkLine className='size-5 text-stone-400' />
      )}
    </button>
  );
}
