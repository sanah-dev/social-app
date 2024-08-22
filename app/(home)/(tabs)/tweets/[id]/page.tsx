import { notFound } from 'next/navigation';
import { getTweetDetails } from '../../../(home)/actions';
import { getComments, getUser } from '@/app/(auth)/action';
import TweetItem from '@/components/tweet-item';
import CommentList from '@/components/comment-list';
import CommentAdd from '@/components/comment-add';

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
  const comments = await getComments(tweet.id);
  if (!comments) {
    return notFound();
  }

  return (
    <>
      <div className='detail-inner'>
        <TweetItem
          {...tweet}
          likes={tweet._count.likes}
          comments={tweet._count.comments}
        />
        <CommentList id={id} userId={user.id} comments={comments} />
      </div>

      <CommentAdd id={id} />
    </>
  );
}
