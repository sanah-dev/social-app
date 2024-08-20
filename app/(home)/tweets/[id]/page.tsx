import db from '@/lib/db';
import { notFound } from 'next/navigation';
import { HeartIcon } from '@heroicons/react/24/outline';
import { formatToTimeAgo } from '@/lib/utils';
import ButtonPrev from '@/components/button-prev';
import { getTweetDetails } from '../../(home)/actions';

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const tweet = await getTweetDetails(id);
  if (!tweet) {
    return notFound();
  }

  return (
    <>
      <div className='title-box'>
        <div className='flex items-center'>
          <ButtonPrev>뒤로가기</ButtonPrev>
        </div>
      </div>

      <div className='flex flex-col justify-between min-h-72 p-4 bg-light rounded-xl *:text-dark bg-card shadow-card'>
        <div>
          <div className='flex justify-between'>
            <p>@{tweet.user.username}</p>
            <p className=''>{formatToTimeAgo(tweet.created_at.toString())}</p>
          </div>
          <p className=''>{tweet.tweet}</p>
        </div>
        <div className='flex items-center gap-2'>
          <HeartIcon className='ml-1 size-4' />
          {tweet.likes.length} likes
        </div>
      </div>
    </>
  );
}
