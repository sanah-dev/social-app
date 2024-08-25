import { getUser } from '@/app/(auth)/action';
import { Prisma } from '@prisma/client';
import { getInitialMyLikesTweets } from './action';
import MyLikesTweetList from '@/components/tweets/tweet-list';
import NotFoundPage from '@/app/not-found';

export type InitialTweets = Prisma.PromiseReturnType<
  typeof getInitialMyLikesTweets
>;

export const metadata = {
  title: '',
};

export default async function MyLikesTweetsPage() {
  const user = await getUser();
  if (!user) {
    return NotFoundPage;
  }

  const initialTweets = await getInitialMyLikesTweets(user.id);

  return (
    <>
      <MyLikesTweetList initialTweets={initialTweets} />
    </>
  );
}
