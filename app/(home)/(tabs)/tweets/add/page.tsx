'use client';

import { useFormState } from 'react-dom';
import { useState, ChangeEvent } from 'react';
import { createTweet } from '@/app/(home)/(tabs)/tweets/add/actions';

export default function TweetAddPage() {
  const [state, dispatch] = useFormState(createTweet, null);
  const [tweetText, setTweetText] = useState('');
  const [textLength, setTextLength] = useState(0);
  const [textEntry, setTextEntry] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setTweetText(newText);
    setTextLength(newText.length);

    if (newText.length >= 5 && newText.length < 1001) {
      setTextEntry(false);
    } else {
      setTextEntry(true);
    }
  };

  return (
    <>
      <form action={dispatch} className='relative flex flex-col'>
        <label className='relative h-full'>
          <textarea
            className='resize-none w-full h-full p-4 text-dark'
            name='tweet_add'
            placeholder='최소 5자 이상 입력해주세요. 연락처 등 개인정보가 포함된 글은 작성하지 않게 참고해주세요.'
            value={tweetText}
            onChange={handleChange}
          ></textarea>

          <span className='absolute top-[70px] right-3 text-neutral-400'>
            {textLength <= 1000 ? (
              `${textLength}/1000`
            ) : (
              <>
                <span className='text-red-500'>{textLength}</span>/1000
              </>
            )}
          </span>
        </label>

        {state?.error && (
          <span className='text-red-500 font-medium text-left text-xs leading-5'>
            * <span className='text-red-500'>{state.error}</span>
          </span>
        )}

        <button
          disabled={textEntry}
          // TODO: 구조 수정 필요
          // className='absolute top-[-42px] right-4 p-1 disabled:opacity-50'
          className='fixed top-[42px] right-16 disabled:opacity-50'
        >
          등록
        </button>
      </form>
    </>
  );
}
