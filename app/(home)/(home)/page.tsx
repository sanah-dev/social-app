import TweetAdd from '@/components/tweet-add';
import TweetList from '@/components/tweet-list';
import db from '@/lib/db';
import { Prisma } from '@prisma/client';
import { getInitialTweets } from './actions';

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Tweets() {
  const initialTweets = await getInitialTweets();
  return (
    <>
      {/* <div className='title-box'>
        <h1 className='text-2xl'>
          <span className='text-rose'>거래하기</span>
        </h1>
        <h2 className='text-lg'>지금 제일 관심있어하는 굿즈!</h2>
        <p>24시간 동안 하트가 많이 눌린 순서로 노출됩니다.</p>
      </div> */}

      <TweetList initialTweets={initialTweets} />
      <TweetAdd />
    </>
  );
}
