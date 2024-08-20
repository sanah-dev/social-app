import { notFound } from 'next/navigation';
import { formatToTimeAgo } from '@/lib/utils';
import ButtonPrev from '@/components/button-prev';
import { getTweetDetails } from '../../(home)/actions';
import { getComments, getUser } from '@/app/(auth)/action';
import Comment from '@/components/comment';
import ButtonLike from '@/components/button-like';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/20/solid';

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
  const user = await getUser();
  if (!user) {
    return notFound();
  }

  const comments = await getComments(id);
  if (!comments) {
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
        <div className='min-h-[200px]'>
          <div className='flex justify-between mb-2 pb-2 border-b border-stone-300'>
            <div className='flex items-center gap-2'>
              <span>🙂</span>
              <span>{tweet.user.username}</span>
            </div>
            <small>{formatToTimeAgo(tweet.created_at.toString())}</small>
          </div>
          <p className='h-full max-h-[320px] overflow-y-auto'>{tweet.tweet}</p>
        </div>

        <div className='flex items-center gap-4 py-2 border-t border-stone-300'>
          <div className='flex items-center gap-2'>
            <ButtonLike
              isLiked={false}
              tweetId={tweet.id}
              likeCount={tweet.likes.length}
            />
            <small>{tweet.likes.length}</small>
          </div>
          <div className='flex items-center gap-2'>
            <span>
              <ChatBubbleOvalLeftEllipsisIcon className='size-5 text-stone-400' />
            </span>
            <small>{comments.length}</small>
          </div>
        </div>

        <Comment id={id} comments={comments} userId={user.id} />
      </div>
    </>
  );
}
