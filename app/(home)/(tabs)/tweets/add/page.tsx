'use client';

import { useFormState } from 'react-dom';
import { useState, ChangeEvent, useRef, useEffect } from 'react';
import { createTweet } from '@/app/(home)/(tabs)/tweets/add/actions';

export default function TweetAddPage() {
  const [state, dispatch] = useFormState(createTweet, null);
  const [tweetText, setTweetText] = useState('');
  const [textLength, setTextLength] = useState(0);
  const [textEntry, setTextEntry] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;

    setTweetText(newText);
    setTextLength(newText.length);

    if (textarea.current) {
      textarea.current.style.height = 'auto';
      textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    }

    if (newText.length >= 5 && newText.length < 1001) {
      setTextEntry(false);
    } else {
      setTextEntry(true);
    }

    if (newText.length > 1000) {
      setErrorMessage('* 최대 1000자까지 작성 가능합니다.');
    } else {
      setErrorMessage('');
    }
  };

  return (
    <>
      <form action={dispatch} className='relative flex flex-col h-full'>
        <label className='flex flex-col items-end'>
          <textarea
            ref={textarea}
            className='resize-none w-full p-4 text-dark overflow-visible'
            name='tweet_add'
            placeholder='5글자 이상 입력해주세요. 연락처 등 개인정보가 포함된 글은 작성하지 않게 참고해주세요.'
            value={tweetText}
            rows={1}
            onChange={handleChange}
          ></textarea>

          <span className='flex justify-between w-full px-4 pb-7 text-neutral-400'>
            {textLength > 1000 ? (
              <>
                <span className='text-red-500 font-medium text-left text-xs leading-5'>
                  <span className='text-red-500'>{errorMessage}</span>
                </span>
                <span>
                  <span className='text-red-500'>{textLength}</span>/1000
                </span>
              </>
            ) : (
              <>
                <span></span>
                <span>
                  <span className='text-zinc-600'>{textLength}</span>/1000
                </span>
              </>
            )}
          </span>
        </label>

        <button
          disabled={textEntry}
          // TODO: 구조 수정 필요 임시조치
          // className='absolute top-[-42px] right-4 p-1 disabled:opacity-50'
          className='fixed top-[42px] right-16 disabled:opacity-50 bg-zinc-100'
        >
          등록
        </button>
      </form>
    </>
  );
}
