'use client';

import { useFormState } from 'react-dom';
import { useState, ChangeEvent, FormEvent } from 'react';
import Button from './button';
import { createTweet } from '@/app/(home)/(home)/actions';

export default function TweetAdd() {
  const [state, dispatch] = useFormState(createTweet, null);
  const [tweetText, setTweetText] = useState('');
  const [textLength, setTextLength] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setTweetText(newText);
    setTextLength(newText.length);
  };

  return (
    <>
      <form action={dispatch} className='flex flex-col'>
        <label className='relative'>
          <textarea
            className='resize-none w-full h-[100px] p-3 rounded-xl text-dark'
            name='tweet_add'
            placeholder='자유롭게 작성 해보세요.'
            value={tweetText}
            onChange={handleChange}
          ></textarea>

          <span className='absolute top-[70px] right-3 text-neutral-400'>
            {textLength <= 500 ? (
              `${textLength}/500`
            ) : (
              <>
                <span className='text-red-500'>{textLength}</span>/500
              </>
            )}
          </span>
        </label>

        {state?.error && (
          <span className='text-red-500 font-medium text-left text-xs leading-5'>
            * <span className='text-red-500'>{state.error}</span>
          </span>
        )}

        <Button className='rounded-xl'>생성하기</Button>
      </form>
    </>
  );
}
