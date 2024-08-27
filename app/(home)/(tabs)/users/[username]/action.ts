import db from '@/lib/db';
import getSession from '@/lib/session';

export async function getUserProfile(username: string) {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
}

export async function getInitialMyTweets(userId: number) {
  const tweets = await db.tweet.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      tweet: true,
      views: true,
      created_at: true,
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
    take: 5,
    orderBy: {
      created_at: 'desc',
    },
  });
  return tweets;
}
